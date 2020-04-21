const core = require('@actions/core');
const github = require('@actions/github');
const { spawn, exec, execSync } = require('child_process');
const fs = require('fs');
const Git = require("nodegit");

try {
  const repo = core.getInput('repo')
  Git.Clone(`${repo}`, "./")
  const imageName = core.getInput('image_name');
  const dockerBuild = spawn(`docker build -t ${imageName} .`);
  dockerBuild.on('exit', function (code, signal) {
    if (code !== 0) {
      throw "Docker build failed";
    }
  });
  dockerBuild.stdout.on('data', (data) => {
    console.log(`Docker build output:\n${data}`);
  });
  
  // const dockerUser = core.getInput('docker_user');
  // const dockerPassword = core.getInput('docker_password');
  // const docker = spawn(`docker login -u ${dockerUser} -p ${dockerPassword} quay.io`);
  // docker.on('exit', function (code, signal) {
  //   if (code !== 0) {
  //     throw "Docker login to Quay.io failed";
  //   }
  // });
  const imageVersion = core.getInput('image_version');
  const shaId = core.getInput('sha_id');
  console.log(`Inputs: ${imageName} ${imageVersion} ${shaId}`)
  core.setOutput("return-message", "output sent");
  
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}