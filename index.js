const core = require('@actions/core');
const github = require('@actions/github');
const { spawnSync } = require('child_process');
const fs = require('fs');
const Git = require("nodegit");

try {
  // Clone repo
  const repo = core.getInput('repo')
  Git.Clone(`${repo}`, "./")
  
  // Docker build
  const imageName = core.getInput('image_name');
  const dockerBuild = spawnSync('docker', ['build', '-t', `${imageName}`, '.'], { encoding : 'utf8' });
  if (dockerBuild.stderr) {
    throw `Docker build failed:\n ${dockerBuild.stderr}`;
  }
  
  // Docker login
  const dockerUser = core.getInput('docker_user');
  const dockerPassword = core.getInput('docker_password');
  const dockerLogin = spawnSync('docker', ['login', '-u', `${dockerUser}`, '-p', `${dockerPassword}`, 'quay.io'], { encoding : 'utf8' });
  if (dockerLogin.stderr) {
    throw `Docker login to quay.io failed:\n ${dockerLogin.stderr}`;
  }
  
  // Docker tag
  const imageVersion = core.getInput('image_version');
  const shaId = core.getInput('sha_id');
  const dockerTag = spawnSync('docker', ['tag', `${imageName}`, `${imageName}:${imageVersion}-${shaId}`], { encoding : 'utf8' });
  if (dockerTag.stderr) {
    throw `Docker tag failed:\n ${dockerTag.stderr}`;
  }

  // Docker push
  const dockerPush = spawnSync('docker', ['push', `${imageName}:${imageVersion}-${shaId}`], { encoding : 'utf8' });
  if (dockerPush.stderr) {
    throw `Docker push failed:\n ${dockerPush.stderr}`;
  }

  core.setOutput("return", "Build + push complete");
  
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}