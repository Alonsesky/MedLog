import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Evolution } from 'src/app/shared/models/evolution.model';
import { UserRole } from 'src/app/shared/models/userRole.model';

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

  getByPatientId(patientId: string): Observable<Evolution[]> {

    const ref = collection(this.firestore, this.collectionName);

    const q = query(
      ref,
      where('patientId', '==', patientId)
    );

    return collectionData(q, { idField: 'id' }) as Observable<Evolution[]>;
  }

  async getPatientByEmail(email: string) {
    const normalizedEmail = email.trim();

    const ref = collection(this.firestore, 'users');

    const q = query(
      ref,
      where('email', '==', normalizedEmail)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error('Paciente no encontrado');
    }

    const patientDoc =
      snapshot.docs.find((item) => (item.data()['role'] as UserRole | undefined) === 'patient') ??
      snapshot.docs[0];

    const data = patientDoc.data();
    const uid = (data['uid'] as string | undefined) ?? patientDoc.id;

    if (!uid) {
      throw new Error('El paciente no tiene un uid valido');
    }

    if (data['role'] && data['role'] !== 'patient') {
      throw new Error('El correo ingresado no pertenece a un paciente');
    }

    return {
      uid,
      ...data
    };

  }
}
