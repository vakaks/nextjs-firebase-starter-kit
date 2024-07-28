import { Reference } from 'firebase-admin/database';
import { database } from '../config/firebase-server';
import { DBCollectionType } from './db-collections';


/**
 * RealtimeDbDao
 * 
 * This class is a DAO for Firebase Realtime Database. 
 * It provides a reference to a collection in the database.
 * 
 * @param collectionName: DBCollection
 * 
 * @return Reference
 * 
 * @see DBCollection
 * 
 * @example
 * 
 * const dao = new RealtimeDbDao(DBCollection.USERS);
 * 
 * const data = await dao.get();
 * 
 */

export class RealtimeDbDao {

  db: Reference;

  constructor(collectionName: DBCollectionType) {
    this.db = database.ref(collectionName);
  }

  async get() {
    return (await this.db.get()).exists() ? (await this.db.get()).val() as any[] : [];
  }

  async set(data: any) {
    return this.db.set(data)
  }

  async update(data: any) {
    return this.db.update(data)
  }

  async remove() {
    return this.db.remove()
  }

  
}