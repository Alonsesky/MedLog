import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Evolution } from 'src/app/shared/models/evolution.model';

@Injectable({
  providedIn: 'root',
})
export class EvolutionService {
  private readonly collectionName = 'evolutions';

  constructor(private firestore: Firestore) {}

  async saveEvolution(data: Evolution) {
    const ref = collection(this.firestore, this.collectionName);
    return await addDoc(ref, data);
  }

  getByUserId(userId: string): Observable<Evolution[]> {

    const ref = collection(this.firestore, this.collectionName);

    const q = query(ref, where('userId', '==', userId));

    return collectionData(q, { idField: 'id' }) as Observable<Evolution[]>;
  }

  deleteById(id: string) {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(ref);
  }

  UpdateById(id: string, data: Partial<Evolution>) {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(ref, data);
  }

}
