const core = require('@actions/core');
const github = require('@actions/github');
const { spawn, exec } = require('child_process');
const fs = require('fs');

try {
  const dockerfile = core.getInput('dockerfile');
  fs.writeFileSync("Dockerfile", `${dockerfile}`); 
  exec('cat Dockerfile', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      throw "Exec error for cat";
    }
  
    console.log(`Dockerfile output: ${stdout}`);
  });
  // const dockerUser = core.getInput('docker_user');
  // const dockerPassword = core.getInput('docker_password');
  // const docker = spawn(`docker login -u ${dockerUser} -p ${dockerPassword} quay.io`);
  // docker.on('exit', function (code, signal) {
  //   if (code !== 0) {
  //     throw "Docker login to Quay.io failed";
  //   }
  // });
  const imageName = core.getInput('image_name');
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