import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db
      .list('/categories')
      .snapshotChanges()
      .pipe(
        map(items => {
          // <== new way of chaining
          return items.map(a => {
            const name = a.payload.val()['name'];
            const key = a.payload.key;
            return { key, name }; // or {key, ...data} in case data is Obj
          });
        })
      );
  }
}
