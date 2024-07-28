/**
 * NB: This file is for server-side Firebase Admin SDK configuration
 * It should not be used in the client-side code
 */

import "server-only";
import { initializeApp, cert, ServiceAccount, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth, UserRecord } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { getDatabase } from "firebase-admin/database";
import { cache } from 'react';
import { sendEmail } from './email-sender';
import { Role } from '@/types';


/**
 * Firebase Admin SDK configuration
 */

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID as string,
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID as string,
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY as string,
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL as string,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID as string,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI as string,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI as string,
  auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_CERT_URL as string,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_CERT_URL as string,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL as string,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY as string,
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID as string,
} as ServiceAccount;


/**
 * Initialize the Firebase Admin SDK
 */



const appName = "VAKS-APP-ADMIN";

export const app = getApps().find((it) => it.name === appName) || initializeApp
  (
    {
      credential: cert(serviceAccount),
      databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL as string,
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID as string,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
    },
    appName
  )

/**
 * Initialize the Firebase Admin SDK
 */

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);







/**
 * ALL FUNCTIONS BELOW CAN BE USED IN SERVER-SIDE CODE ONLY
 */



/**
 * Get a user from firebase auth by email
 * @param email String
 * @returns Promise<UserRecord>
 */
const getByEmail = cache(async (email: string): Promise<UserRecord> => {
  return await auth.getUserByEmail(email);
})

/**
 * Get a user from firebase auth by phone number
 * @param phoneNumber String
 * @returns Promise<UserRecord>
 */
const getByPhoneNumber = cache(async (phoneNumber: string): Promise<UserRecord> => {
  return await auth.getUserByPhoneNumber(phoneNumber);
})

/**
 * Get a user from firebase auth by uid
 * @param uid String
 * @returns Promise<UserRecord>
 */
const getByUid = cache(async (uid: string): Promise<UserRecord> => {
  return await auth.getUser(uid);
})



type UserInput = {
  email: string;
  phoneNumber?: string;
  password: string;
  role: Role;
  displayName: string;
}

/**
 * Create a user in firebase auth
 * @param data UserInput
 * @returns Promise<UserRecord>
 */
const create = cache(async (data: UserInput): Promise<UserRecord> => {
  const user = await auth.createUser(
    {
      email: data.email,
      phoneNumber: data?.phoneNumber || "",
      password: data.password,
      displayName: data.displayName,
      emailVerified: false, // Default to false for email verification
      disabled: false, // Default to false for account status (active)
    }
  );

  await auth.setCustomUserClaims(user.uid, { role: data.role });

  await generateEmailVerificationLink(data.email, data.displayName);

  return user;
})



type UserUpdateInput = {
  email: string;
  phoneNumber: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  disabled: boolean;
}

/**
 * Update a user in firebase auth
 * @param uid String
 * @param data UserUpdateInput
 * @returns Promise<UserRecord>
 */

const update = cache(async (uid: string, data: UserUpdateInput): Promise<UserRecord> => {
  const user = await auth.updateUser(uid, {
    email: data.email,
    phoneNumber: data.phoneNumber,
    displayName: data.displayName,
    photoURL: data.photoURL,
    emailVerified: data.emailVerified,
    disabled: data.disabled
  });
  return user;
})

/**
 * Delete a user from firebase auth
 * @param uid String
 * @returns Promise<void>
 */

const deleteById = cache(async (uid: string): Promise<void> => {
  await auth.deleteUser(uid);
})

/**
 * Get all users from firebase auth
 * @param size Number
 * @returns Promise<UserRecord[]>
 */

const getAll = cache(async (size: number): Promise<UserRecord[]> => {
  const listUsers = await auth.listUsers(
    size,

  );
  return listUsers.users;
})


/**
 * Generate a link to verefy a user's email
 * @param email String
 * @returns Promise<string>
 */
const generateEmailVerificationLink = async (email: string, name?:string|undefined): Promise<string> => {

  let username = name as string;
  if(!name || name === ""){
    const user = await getByEmail(email);
    username = (user.displayName || user.email) as string;
  }
  const link = await auth.generateEmailVerificationLink(email);
  await sendEmail(
    {
      email, 
      username, 
      link
    }, 
    "VERIFY_EMAIL"
  )
  return "Email verification link sent to user's email."
}



/**
 * Generate a link to reset a user's password
 * @param email String
 * @returns Promise<string>
 */

const generatePasswordResetLink = async (email: string): Promise<string> => {
  try {
    const user = await getByEmail(email);
    const name = (user.displayName || user.email) as string;
    const link = await auth.generatePasswordResetLink(email);
    await sendEmail({email, name, link}, "RESET_PASSWORD")
    return "Password reset link sent to user's email."
  } catch (e) {
    throw new Error("No user found with this email address: " + email + ". " +
      "Please check the email address and try again. If you continue to have issues, " +
      "please contact support."
    );
  }
}

/**
 * Generate a link to sign in with email link
 * @param email String
 * @returns Promise<string>
 */

const generateSignInWithEmailLink = async (email: string): Promise<string> => {
  const link = await auth.generateSignInWithEmailLink(email, {
    url: process.env.FIREBASE_AUTH_REDIRECT_URL as string,
    handleCodeInApp: true
  });
  return link;
}


const requiredVerifyEmail = async (email: string): Promise<void> => {
  const user = await getByEmail(email);
  if (!user.emailVerified) {
    await generateEmailVerificationLink(email);
    throw new Error("Please verify your email before signing in! Check your email for a verification link.",
      {
        cause: "EmailNotVerified",
      }
    )
  }
}

export const authUserApi = {
  getByEmail,
  getByPhoneNumber,
  getByUid,
  create,
  update,
  deleteById,
  getAll,
  generateEmailVerificationLink,
  generatePasswordResetLink,
  generateSignInWithEmailLink,
  requiredVerifyEmail
} as const;