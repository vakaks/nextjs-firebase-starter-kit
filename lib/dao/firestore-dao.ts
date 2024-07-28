import { firestore } from '@/lib/config/firebase-server';
import { DBCollectionType } from './db-collections';

/**
 * Firebase DAO class to interact with Firestore collections 
 * @class
 * @classdesc This class is used to interact with Firebase Firestore
 * @export
 * @implements {FirestoreDao}
 * @example
 * import { FirebaseDao } from '@/lib/actions/firebase/dao';
 * import { DbCollection } from '@/lib/config/DbCollection';
 * 
 * const firebaseDao = new FirebaseDao(DbCollection.USERS);
 * 
 * const users = await firebaseDao.findAll();
 * const user = await firebaseDao.findUserById('id');
 * 
 */
export class FirestoreDao {

  firestore: FirebaseFirestore.CollectionReference

  constructor(collectionName: DBCollectionType) {
    this.firestore = firestore.collection(collectionName);
  }


  /**
   * Find all documents in a collection
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const users = await firebaseDao.findAll();
   * 
   * users.docs.map((doc) => {
   *  return {
   *   id: doc.id,
   *  ...doc.data()
   * }
   */
  async findAll() {
    return await this.firestore.get();
  }


  /**
   * Find a document by id
   * @param {string} id
   * @returns Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findUserById('id');
   */
  async findById(id: string) {
    return await this.firestore.doc(id).get();
  }


  /**
   * Add a document to a collection
   * @param {any} data
   * @returns Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.add({ * });
   * */
  async add(data: any) {
    return await this.firestore.add(data);
  }

  async addWithId(id: string, data: any) {
    data.id = id;
    return await this.firestore.doc(id).set(data);
  }

  /**
   * Update a document in a collection
   * @param {string} id
   * @param {any} data
   * @returns Promise<void>
   * @example
   * await firebaseDao.update('id', { * });
   */
  async update(id:string, data: any) {
    return await this.firestore.doc(id).update(data)
  }


  /**
   * Delete a document from a collection
   * @param {string} id
   * @returns Promise<void>
   * @example
   * await firebaseDao.delete('id');
   */
  async delete(id: string) {
    return await this.firestore.doc(id).delete();
  }


  /**
   * Find a document by field
   * @param {string} field
   * @param {FirebaseFirestore.WhereFilterOp} operator
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhere('field', '==', 'value');
   */
  async findWhere(field: string, operator: FirebaseFirestore.WhereFilterOp, value: any) {
    return await this.firestore.where(field, operator, value).get();
  }


  /**
   * Find a document by field that contains a value in an array
   * @param {string} field
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereArrayContains('field', 'value');
   */
  async findWhereArrayContains(field: string, value: any) {
    return await this.firestore.where(field, 'array-contains', value).get();
  }


  /**
   * Find a document by field that contains any value in an array 
   * @param {string} field
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereArrayContainsAny('field', 'value');
   */
  async findWhereArrayContainsAny(field: string, value: any) {
    return await this.firestore.where(field, 'array-contains-any', value).get();
  }


  /**
   * Find a document by field that is in an array
   * @param {string} field
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereIn('field', 'value');
   */
  async findWhereIn(field: string, value: any) {
    return await this.firestore.where(field, 'in', value).get();
  }


  /**
   * Find a document by field that is not in an array
   * @param {string} field
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereNotIn('field', 'value');
   */
  async findWhereNotIn(field: string, value: any) {
    return await this.firestore.where(field, 'not-in', value).get();
  }


  /**
   * Find a document by field that is greater than a value
   * @param {string} field
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereGreaterThan('field', 'value');
   */
  async findWhereGreaterThan(field: string, value: any) {
    return await this.firestore.where(field, '>', value).get();
  }


  /**
   * Find a document by field that is greater than or equal to a value
   * @param {string} field
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereGreaterThanOrEqual('field', 'value');
   */
  async findWhereGreaterThanOrEqual(field: string, value: any) {
    return await this.firestore.where(field, '>=', value).get();
  }


  /**
   * Find a document by field that is less than a value
   * @param {string} field
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereLessThan('field', 'value');
   */
  async findWhereLessThan(field: string, value: any) {
    return await this.firestore.where(field, '<', value).get();
  }


  /**
   * Find a document by field that is less than or equal to a value
   * @param {string} field
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereLessThanOrEqual('field', 'value');
   */
  async findWhereLessThanOrEqual(field: string, value: any) {
    return await this.firestore.where(field, '<=', value).get();
  }


  /**
   * Find a document by field that is equal to a value
   * @param {string} field
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereEqualTo('field', 'value');
   */
  async findWhereEqualTo(field: string, value: any) {
    return await this.firestore.where(field, '==', value).get();
  }


  /**
   * Find a document by field that is not equal to a value
   * @param {string} field
   * @param {any} value
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereNotEqualTo('field', 'value');
   */
  async findWhereNotEqualTo(field: string, value: any) {
    return await this.firestore.where(field, '!=', value).get();
  }


  /**
   * Find a document by field that is null
   * @param {string} field
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereIsNull('field');
   */
  async findWhereIsNull(field: string) {
    return await this.firestore.where(field, '==', null).get();
  }


  /**
   * Find a document by field that is not null
   * @param {string} field
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const user = await firebaseDao.findWhereIsNotNull('field');
   */
  async findWhereIsNotNull(field: string) {
    return await this.firestore.where(field, '!=', null).get();
  }


  /**
   * Paginate a collection of documents in a collection by limit
   * @param {number} limit
   * @param {FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>} startAfter
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const users = await firebaseDao.paginate(10, startAfter);
   */
  async paginate(limit: number, startAfter: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>) {
    return await this.firestore.limit(limit).startAfter(startAfter).get();
  }


  /**
   * Find all documents in a collection and order by field
   * @param {string} field
   * @param {FirebaseFirestore.OrderByDirection} direction
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const users = await firebaseDao.orderBy('field', 'asc');
   */
  async orderBy(field: string, direction: FirebaseFirestore.OrderByDirection) {
    return await this.firestore.orderBy(field, direction).get();
  }


  /**
   * Find all documents in a collection with a limit
   * @param {number} limit
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const data = await firebaseDao.limit(10);
   * const users = data.docs.map((doc) => {
   * return {
   *  id: doc.id,
   *  ...doc.data()
   * }
   */
  async limit(limit: number) {
    return await this.firestore.limit(limit).get();
  }


  /**
   * Paginate a collection of documents in by size and page
   * @param {number} size
   * @param {number} page
   * @returns Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>
   * @example
   * const users = await firebaseDao.fetchPaginatedData(10, 2);
   * 
   */
  async fetchPaginatedData(size: number, page: number) {
    if (page < 1 || !page) {
      page = 1;
    }
    return await this.firestore.limit(size).offset(size * (page - 1)).get();
  }


  /**
   * Generate a unique id for a document
   * @returns Promise<string>
   * @example
   * const id = await firebaseDao.generateId();
   */
  async generateId() {
    return this.firestore.doc().id;
  }


  /**
   * Get the instance of the Firestore collection
   * @returns FirebaseFirestore.CollectionReference
   * @example
   * const firestore = firebaseDao.getinstance();
   * const users = await firestore.get();
   */
  getinstance() {
    return this.firestore;
  }

}