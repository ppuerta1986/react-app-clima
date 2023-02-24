pipeline {
    agent any
    tools {nodejs "NODEJS-14-18-1"}
    stages {
        stage("Build") {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/www/clima.lan"
                sh "sudo cp -r ${WORKSPACE}/build/ /var/www/clima.lan/"
            }
        }
    }
}
