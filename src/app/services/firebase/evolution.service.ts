import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Evolution } from 'src/app/shared/models/evolution.model';

@Injectable({
  providedIn: 'root',
})
export class EvolutionService {

  constructor(private firestore: Firestore) {}

  async saveEvolution(data: Evolution) {
    const ref = collection(this.firestore, 'evolutions');
    return await addDoc(ref, data);
  }
}
