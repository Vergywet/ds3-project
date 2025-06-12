// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAc3lOFyUB4PQYW6SgMVyRldHb7pxoTIx0",
    authDomain: "ds3project-43ba4.firebaseapp.com",
    projectId: "ds3project-43ba4",
    storageBucket: "ds3project-43ba4.appspot.com", // ✅ fix the .app -> .com
    messagingSenderId: "769687785846",
    appId: "1:769687785846:web:c824398d64b2bbbf8baa57",
    measurementId: "G-7LKEQCNH96"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
