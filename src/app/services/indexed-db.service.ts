import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  constructor() {
    this.connectToDB();
  }

  db;
  async connectToDB() {
    console.log('IN CONNECT TO DB FUNC')
    try {
      console.log('In try block')
      this.db = await openDB<MyDB>('pwaDB', 1, {
        upgrade(db) {
          db.createObjectStore('testing');
        },
      });
    }
    catch(err) {
      console.log(err);
    };
  }

  addData(data){
    console.log('adding Data to indexedDB => ', data)
    return this.db.put('testing', data, "pwaData")
  }

  addImage(image) {
    console.log('adding image to indexedDB => ', image);
    return this.db.put('testing', image, 'pwaImage')
  }

}

interface MyDB extends DBSchema {
  'testing': {
    key: string;
    value: object;
  };
}
