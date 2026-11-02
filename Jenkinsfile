pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22'
  }

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Install Playwright browser') {
      steps {
        sh 'npx playwright install --with-deps chromium'
      }
    }

    stage('Static checks') {
      steps {
        sh 'npm run typecheck'
        sh 'npm run lint'
      }
    }

    stage('Run tests') {
      steps {
        sh 'npm test'
      }
    }
  }

  post {
    always {
      junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
      archiveArtifacts allowEmptyArchive: true, artifacts: 'playwright-report/**, test-results/**'
    }
  }
}
