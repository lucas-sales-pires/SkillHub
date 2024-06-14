import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment  } from './environments/environment';
import { firebaseConfig } from './firebase'
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular(),
    provideRouter(routes), 
    importProvidersFrom(
            HttpClientModule,
            IonicModule.forRoot(),
            provideFirebaseApp(() => initializeApp(firebaseConfig)),
            provideFirestore(() => getFirestore()),
            provideStorage(() => getStorage()),
                  )
  ],
});

