import { getUserName } from './get-user-name.js';
import { up } from './commands/up.js';

function start() {
  const userName = getUserName();
  console.log(`Welcome to the File Manager, ${userName}!`);
  const path = process.cwd();
  console.log(`\nYou are currently in ${path}`);

  process.stdin.on('data', (input) => {
    const command = input.toString().trim();

    if (command === '.exit') {
      console.log(`\nThank you for using File Manager,  ${userName}, goodbye!`);
      process.exit();
    } else if (command === 'up') {
      up();
    }
  });

  process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager,  ${userName}, goodbye!`);
    process.exit();
  });
}

start();
