def buildClosure = {
  def nodeHome = tool name: 'nodejs-8.6.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
  env.PATH = "${nodeHome}/bin:${env.PATH}"

  stage('Install')
  sh 'npm install'

  stage('Build')
  sh 'npm run build'
}

def buildParameterMap = [:]
buildParameterMap['appName'] = 'diva-svb-bo-frontend'
buildParameterMap['buildClosure'] = buildClosure
buildParameterMap['namespaces'] = ['nebm-dev']
buildParameterMap['namespacesWithApproval'] = []

buildAndDeployGeneric(buildParameterMap)

// vim: ft=groovy
