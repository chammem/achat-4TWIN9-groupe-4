package tn.esprit.rh.achat.controllers;

import org.springframework.web.bind.annotation.*;
import java.io.FileWriter;
import java.io.IOException;
@CrossOrigin("*")
@RestController
@RequestMapping("/logs")
public class LogController {
    private static final String LOG_FILE = "/logs/angular-logs.log"; // Fichier de logs

    @PostMapping
    public void log(@RequestBody LogEntry logEntry) {
        System.out.println("🔥 Log received from Angular: " + logEntry.getMessage());

        try (FileWriter writer = new FileWriter(LOG_FILE, true)) {
            writer.write("[" + logEntry.getLevel() + "] " + logEntry.getTimestamp() + " - " + logEntry.getMessage() + "\n");
            writer.flush(); // Assure que les logs sont écrits immédiatement
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // ✅ Static nested class = OK for Jackson
    public static class LogEntry {
        private String message;
        private String level;
        private String timestamp;

        public LogEntry() {} // Default constructor required for Jackson

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public String getLevel() { return level; }
        public void setLevel(String level) { this.level = level; }

        public String getTimestamp() { return timestamp; }
        public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    }
}
