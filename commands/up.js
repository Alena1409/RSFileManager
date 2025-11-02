import path from 'path';
import { cwd } from 'process';

export function up() {
  const currentPath = cwd();
  const newPath = path.dirname(currentPath);
  if (currentPath === newPath) {
    console.log(`\nYou are currently in ${cwd()}`);
    return;
  }

  process.chdir(newPath);
  console.log(`\nYou are currently in ${cwd()}`);
}
