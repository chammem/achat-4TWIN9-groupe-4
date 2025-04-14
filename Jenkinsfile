pipeline {
    agent any
    tools {
        maven 'M2_HOME'
    }
    stages {
        stage('GIT') {
            steps {
                withCredentials([string(credentialsId: 'jenkinstoken', variable: 'TOKEN')]) {
                    git branch: 'aziz-4TWIN9-groupe-4',
                        url: 'https://github.com/chammem/achat-4TWIN9-groupe-4.git'
                }
            }
        }
    }
}
