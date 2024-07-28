"use server"

import { FirestoreDao } from '../dao/firestore-dao'
import { RealtimeDbDao } from '../dao/realtimedb-dao'

export const getAllUsers = async () => {
  const firestoreDb = new FirestoreDao("users")
  return (await firestoreDb.findAll()).docs.map(doc => doc.data())
}

export const getAllUserFromRealtimeDb = async () => {
  const realtimeDb = new RealtimeDbDao("users")
  return await realtimeDb.get()
}