import { promises as fs } from 'fs';
import path from 'path';
import { cwd } from 'process';

export async function rn(filePath, newName) {
  const absoluteFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(cwd(), filePath);
  const newNamePath = path.join(cwd(), newName);

  try {
    await fs.rename(absoluteFilePath, newNamePath);
    console.log(`\nSuccessfully renamed to '${newName}'.`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`\nSource file not found: ${filePath}`);
    } else if (err.code === 'EEXIST') {
      console.log(`\nFile already exists: ${newNamePath}`);
    } else {
      console.log(`\nOperation failed.`);
    }
  } finally {
    console.log(`\nYou are currently in ${cwd()}`);
  }
}
