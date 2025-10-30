import { promises as fs } from 'fs';
import path from 'path';
import { cwd } from 'process';

export async function mkdir(dirName) {
  const dirPath = path.join(cwd(), dirName);

  try {
    await fs.mkdir(dirPath, { recursive: false });
    console.log(`\nDirectory '${dirName}' successfully created!`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`\nDirectory already exists: ${dirName}`);
    }
    console.log(`\nOperation failed.`);
  } finally {
    console.log(`\nYou are currently in ${cwd()}`);
  }
}
