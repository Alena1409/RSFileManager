import { promises as fs } from 'fs';
import path from 'path';

export async function cd(targetPath) {
  try {
    const newPath = path.isAbsolute(targetPath)
      ? targetPath
      : path.join(process.cwd(), targetPath);

    const stats = await fs.stat(newPath);

    if (!stats.isDirectory()) {
      console.log(`\nOperation failed. It's not directory`);
      console.log(`\nYou are currently in ${process.cwd()}`);
      return;
    }

    process.chdir(newPath);

  } catch {
    console.log(`\nOperation failed`);
  } finally {
    console.log(`\nYou are currently in ${process.cwd()}`);
  }
}
