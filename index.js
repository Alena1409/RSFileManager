import { getUserName } from './get-user-name.js';
import { cwd } from 'process';
import { up } from './commands/up.js';
import { cd } from './commands/cd.js';
import { ls } from './commands/ls.js';
import { cat } from './commands/cat.js';
import { add } from './commands/add.js';
import { mkdir } from './commands/mkdir.js';
import { rn } from './commands/rn.js';
import { cp } from './commands/cp.js';
import { mv } from './commands/mv.js';
import { rm } from './commands/rm.js';
import { osInfo } from './commands/os.js';
import { compress } from './commands/compress.js';
import { decompress } from './commands/decompress.js';
import { hash } from './commands/hash.js';

function start() {
  const userName = getUserName();

  console.log(`Welcome to the File Manager, ${userName}!`);
  const path = cwd();
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
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await cd(args.join(' '));
      }
    } else if (cmd === 'ls') {
      await ls();
    } else if (cmd === 'cat') {
      if (args.length === 0) {
        console.log('Invalid input, filePath is not');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        cat(args.join(' '));
      }
    } else if (cmd === 'add') {
      if (args.length === 0) {
        console.log('Invalid input, fileName is not specified');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await add(args[0]);
      }
    } else if (cmd === 'mkdir') {
      if (args.length === 0) {
        console.log('Invalid input, dirName is not specified');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await mkdir(args[0]);
      }
    } else if (cmd === 'rn') {
      if (args.length !== 2) {
        console.log('Invalid input');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await rn(args[0], args[1]);
      }
    } else if (cmd === 'cp') {
      if (args.length !== 2) {
        console.log('Invalid input');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await cp(args[0], args[1]);
      }
    } else if (cmd === 'mv') {
      if (args.length !== 2) {
        console.log('Invalid input');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await mv(args[0], args[1]);
      }
    } else if (cmd === 'rm') {
      if (args.length === 0) {
        console.log('Invalid input');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await rm(args[0]);
      }
    } else if (cmd === 'os') {
      if (args.length === 0) {
        console.log('Invalid input');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await osInfo(args[0]);
      }
    } else if (cmd === 'compress') {
      if (args.length !== 2) {
        console.log('Invalid input');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await compress(args[0], args[1]);
      }
    } else if (cmd === 'decompress') {
      if (args.length !== 2) {
        console.log('Invalid input');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await decompress(args[0], args[1]);
      }
    } else if (cmd === 'hash') {
      if (args.length === 0) {
        console.log('Invalid input');
        console.log(`\nYou are currently in ${cwd()}`);
      } else {
        await hash(args[0]);
      }
    } else {
      console.log('Invalid input');
      console.log(`\nYou are currently in ${cwd()}`);
    }
  });

  process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager,  ${userName}, goodbye!`);
    process.exit();
  });
}

start();
