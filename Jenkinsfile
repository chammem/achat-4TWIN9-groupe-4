pipeline {
    agent any
    
    tools {
        maven 'M2_HOME'  // Assurez-vous que cette installation Maven est configurée dans Jenkins
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
                
                // Debug: Affiche le contenu du dossier backend
                sh 'ls -la backend'
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package'
                    // Si vous avez besoin de tests
                    // sh 'mvn test'
                }
            }
        }
        
        // Ajoutez d'autres étapes si nécessaire
        stage('Archive Artifacts') {
            steps {
                dir('backend') {
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }
    }
    
    post {
        always {
            // Nettoyage ou notifications
            echo 'Build completed - see reports for results'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
            // mail to: 'team@example.com', subject: 'Build Failed', body: 'Please check the build at ${BUILD_URL}'
        }
    }
}
