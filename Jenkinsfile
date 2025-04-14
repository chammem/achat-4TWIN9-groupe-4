pipeline {
    agent any
    
    tools {
        maven 'M2_HOME'  // Assurez-vous que cet outil est configuré dans Jenkins > Global Tool Configuration
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
            }
        }
        
        // Ajoutez d'autres étapes comme Build, Test, etc.
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
    }
}
