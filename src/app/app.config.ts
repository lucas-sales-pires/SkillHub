import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
            provideFirestore(() => getFirestore()),
                 )
        
    ],
};



// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { environment } from '../environments/environment';
// import { initializeApp } from 'firebase/app';

// import { routes } from './app.routes';

// export const config: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom([
//       AngularFireModule.initializeApp(environment.firebaseConfig),
//       AngularFireAuthModule,
//       AngularFireDatabaseModule,
//       AngularFireAuthModule,
//     ]),
//   ],
// };

// const app = initializeApp(environment.firebaseConfig);
