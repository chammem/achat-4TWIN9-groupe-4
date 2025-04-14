import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  logToConsole(message: string): void {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
  }

  logToFile(message: string): void {
    // Simulation — Angular ne peut pas écrire dans des fichiers en local,
    // mais tu peux envoyer ces logs à un backend.
    console.log(`[LOG-TO-FILE] ${new Date().toISOString()}: ${message}`);
  }
}
