// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

<<<<<<< HEAD
export const environment = {
  production: false
=======
import { NgxLoggerLevel } from 'ngx-logger';


export const environment = {
  production: false,
  logFilePath: './logs/front/frontend.log'
>>>>>>> df2a6f5967fa7af69cab542e13d3a28c60b52643
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
