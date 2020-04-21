const core = require('@actions/core');
const github = require('@actions/github');
const { spawnSync } = require('child_process');
const fs = require('fs');
const Git = require("nodegit");

try {
  const repo = core.getInput('repo')
  Git.Clone(`${repo}`, "./")
  const imageName = core.getInput('image_name');
  const dockerBuild = spawnSync('docker', ['build', '-t', `${imageName}`, '.'], { encoding : 'utf8' });
  console.log(dockerBuild.stdout);
  console.log(dockerBuild.stderr);
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