import path from 'path';

export function up() {
  const currentPath = process.cwd();
  const newPath = path.dirname(currentPath);
  if (currentPath === newPath) {
    console.log(`You are currently in ${process.cwd()}`);
    return;
  }

  process.chdir(newPath);
  console.log(`You are currently in ${process.cwd()}`);
}
