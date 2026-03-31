import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideFirestore,
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
} from '@angular/fire/firestore';
import {
  provideAuth,
  getAuth,
  initializeAuth,
  indexedDBLocalPersistence,
} from '@angular/fire/auth';

import { Capacitor } from '@capacitor/core';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),

    provideFirebaseApp(() => {
      const app = initializeApp(environment.firebase);

      if (Capacitor.isNativePlatform()) {
        initializeFirestore(app, {
          localCache: persistentLocalCache(),
        });
      }

      initializeAuth(app, {
        persistence: indexedDBLocalPersistence,
      });

      return app;
    }),

    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
});
