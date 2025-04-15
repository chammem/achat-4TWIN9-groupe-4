pipeline {
    agent any
    
    tools {
        maven 'M2_HOME'
        jdk 'jdk17' // Assurez-vous d'utiliser Java 17 si nécessaire
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
                
                // Vérification du POM avant le build
                sh '''
                    cd backend
                    if grep -q '<<<<<<<' pom.xml; then
                        echo "ERROR: pom.xml contains merge conflicts!"
                        exit 1
                    fi
                    xmllint --noout pom.xml || exit 1
                '''
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package'
                }
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                dir('backend') {
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                    junit 'target/surefire-reports/*.xml' // Archive les résultats des tests
                }
            }
        }
    }
    
    post {
        always {
            // Archive le POM pour inspection
            archiveArtifacts artifacts: 'backend/pom.xml', fingerprint: true
            
            // Nettoyage
            cleanWs()
        }
        failure {
            echo "Build failed! Check the POM file for merge conflicts."
            // mail to: 'team@example.com', subject: 'Build Failed', body: 'Please check the build at ${BUILD_URL}'
        }
    }
}
