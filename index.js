const core = require('@actions/core');
const github = require('@actions/github');
const { spawnSync } = require('child_process');
const fs = require('fs');
const Git = require("nodegit");

try {
  const ls = spawnSync("ls", ['-l]']);
  // console.log(`LS output is ${ls.stdout}`);
  core.setOutput("return", `${ls.stdout}`);
  // Clone repo
  // const repo = core.getInput('repo')
  // Git.Clone(`${repo}`, "./")
  
  // // Docker build
  // const imageName = core.getInput('image_name');
  // // const dockerBuild = spawnSync('docker', ['build', '-t', `${imageName}`, '.'], { encoding : 'utf8' });
  // // if (dockerBuild.stderr) {
  // //   throw `Docker build failed:\n ${dockerBuild.stderr}`;
  // // }
  // // console.log(`Docker build output:\n ${dockerBuild.stdout}`);
  
  // // Docker login
  // const dockerUser = core.getInput('docker_user');
  // const dockerPassword = core.getInput('docker_password');
  // const dockerLogin = spawnSync('docker', ['login', '--username', `${dockerUser}`, '--password-stdin', 'quay.io'], { encoding : 'utf8', input: `${dockerPassword}` });
  // console.log(`Docker exit code: ${dockerLogin.status}`)
  // console.log(`Docker login error:\n ${dockerLogin.stderr}`);
  // if (dockerLogin.stderr) {
  //   throw `Docker login to quay.io failed:\n ${dockerLogin.stderr}`;
  // }


  // // Docker tag
  // const imageVersion = core.getInput('image_version');
  // const shaId = core.getInput('sha_id');
  // const dockerTag = spawnSync('docker', ['tag', `${imageName}`, `${imageName}:${imageVersion}-${shaId}`], { encoding : 'utf8' });
  // if (dockerTag.stderr) {
  //   throw `Docker tag failed:\n ${dockerTag.stderr}`;
  // }
  // console.log(`Docker tag output:\n ${dockerTag.stdout}`);

  // // Docker push
  // const dockerPush = spawnSync('docker', ['push', `${imageName}:${imageVersion}-${shaId}`], { encoding : 'utf8' });
  // if (dockerPush.stderr) {
  //   throw `Docker push failed:\n ${dockerPush.stderr}`;
  // }
  // console.log(`Docker push output:\n ${dockerPush.stdout}`);

  // core.setOutput("return", "Build + push complete");
  
  // // Get the JSON webhook payload for the event that triggered the workflow
  // // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}