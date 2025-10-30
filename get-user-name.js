export function getUserName() {
  const args = process.argv.slice(2);
  const userArgs = args.find((arg) => arg.startsWith('--username='));

  if (!userArgs) {
    return 'Anonymous';
  }

  const name = userArgs.split('=')[1];
  return name || 'Anonymous';
}
