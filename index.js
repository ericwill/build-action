const core = require('@actions/core');
const github = require('@actions/github');
const { spawn } = require('child_process')

try {
  const child = spawn('pwd');
  child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
  });
  child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
  });
  // `who-to-greet` input defined in action metadata file
  const messagePassed = core.getInput('message');
  console.log(`Message passed was ${messagePassed}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("return-message", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}