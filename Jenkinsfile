pipeline {
    agent any
    
    tools {
        maven 'M2_HOME'  // Doit correspondre au nom de l'installation Maven dans Jenkins
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: 'aziz-4TWIN9-groupe-4']],
                    extensions: [],
                    userRemoteConfigs: [[
                        credentialsId: 'jenkinstoken',
                        url: 'https://github.com/chammem/achat-4TWIN9-groupe-4.git'
                    ]]
                ])
                
                // Debug: Afficher la structure des fichiers
                sh 'ls -la'
            }
        }
        
        stage('Build') {
            steps {
                // Si le pom.xml est dans un sous-dossier, spécifiez-le avec -f
                sh 'mvn -f pom.xml clean package'  // Ou 'mvn -f chemin/vers/pom.xml clean package'
            }
        }
    }
}
