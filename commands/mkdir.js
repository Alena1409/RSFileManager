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
      console.log(`\nOperation failed. Directory already exists: ${dirName}`);
    } else {
      console.log(`\nOperation failed. Error: ${err.message}`);
    }
  } finally {
    console.log(`\nYou are currently in ${cwd()}`);
  }
}
