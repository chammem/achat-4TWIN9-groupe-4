pipeline {
    agent any
    
    tools {
        maven 'M2_HOME'
        jdk 'jdk17'
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
                
                // Vérification des conflits de fusion
                sh '''
                    cd backend
                    if grep -q '<<<<<<<' pom.xml; then
                        echo "ERROR: pom.xml contains merge conflicts!"
                        exit 1
                    fi
                    if grep -r '<<<<<<<' src/main/java; then
                        echo "ERROR: Java files contain merge conflicts!"
                        exit 1
                    fi
                    xmllint --noout pom.xml || exit 1
                '''
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh '''
                        java -version
                        # Validate Java syntax
                        find src/main/java -name "*.java" -exec javac -cp "target/classes" {} \\;
                        mvn clean package
                    '''
                }
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                dir('backend') {
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'backend/pom.xml', fingerprint: true
            cleanWs()
        }
        failure {
            echo "Build failed! Check the POM file and Java sources for issues."
            // mail to: 'team@example.com', subject: 'Build Failed', body: 'Please check the build at ${BUILD_URL}'
        }
    }
}
