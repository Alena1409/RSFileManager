import { getUserName } from './get-user-name.js';
import { up } from './commands/up.js';
import { cd } from './commands/cd.js';
import { ls } from './commands/ls.js';
import { cat } from './commands/cat.js';

function start() {
  const userName = getUserName();
  console.log(`Welcome to the File Manager, ${userName}!`);
  const path = process.cwd();
  console.log(`\nYou are currently in ${path}`);

  process.stdin.on('data', async (input) => {
    const command = input.toString().trim();
    const [cmd, ...args] = command.split(' ');

    if (cmd === '.exit') {
      console.log(`\nThank you for using File Manager,  ${userName}, goodbye!`);
      process.exit();
    } else if (cmd === 'up') {
      up();
    } else if (cmd === 'cd') {
      if (args.length === 0) {
        console.log('Invalid input, folderPath is not');
      } else {
        await cd(args.join(' '));
      }
    } else if (cmd === 'ls') {
      await ls();
    } else if (cmd === 'cat') {
      if (args.length === 0) {
        console.log('Invalid input, filePath is not');
      } else {
        cat(args.join(' '));
      }
    }
  });

  process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager,  ${userName}, goodbye!`);
    process.exit();
  });
}

start();
