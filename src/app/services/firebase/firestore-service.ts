import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc } from "firebase/firestore";
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {


  firestore: Firestore = inject(Firestore);


  async addUser() {
    try {
      const docRef = await addDoc(collection(this.firestore, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
