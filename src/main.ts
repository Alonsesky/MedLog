import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  browserPopupRedirectResolver,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  provideAuth,
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

      initializeAuth(
        app,
        Capacitor.isNativePlatform()
          ? {
              persistence: indexedDBLocalPersistence,
            }
          : {
              persistence: indexedDBLocalPersistence,
              popupRedirectResolver: browserPopupRedirectResolver,
            },
      );

      return app;
    }),

    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
});
