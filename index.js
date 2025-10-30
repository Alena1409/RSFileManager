import { getUserName } from './get-user-name.js';

function start() {
  const userName = getUserName();
  console.log(`Welcome to the File Manager, ${userName}!`);

  process.stdin.on('data', (input) => {
    const command = input.toString().trim();

    if (command === '.exit') {
      console.log(`\nThank you for using File Manager,  ${userName}, goodbye!`);
      process.exit();
    }
  });

  process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager,  ${userName}, goodbye!`);
    process.exit();
  });
}

start();
