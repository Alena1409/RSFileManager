import { promises as fs } from 'fs';
import path from 'path';
import { cwd } from 'process';

export async function rm(filePath) {
  const absoluteFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(cwd(), filePath);

  try {
    await fs.unlink(absoluteFilePath);

    console.log(`\nSuccessfully delete '${filePath}'.`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`\nOperation failed. File or directory not found: '${filePath}'.`);
    }
    console.log(`\nOperation failed.`);
  } finally {
    console.log(`\nYou are currently in ${cwd()}`);
  }
}