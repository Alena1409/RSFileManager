import { promises as fs } from 'fs';
import path from 'path';
import { cwd } from 'process';

export async function add(fileName) {
  const filePath = path.join(cwd(), fileName);

  try {
    await fs.writeFile(filePath, '', { flag: 'wx' });
    console.log(`\nFile '${fileName}' successfully created!`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`\nOperation failed. File already exists: ${fileName}`);
    } else {
      console.log(`\nOperation failed.`);
    }
  } finally {
    console.log(`\nYou are currently in ${cwd()}`);
  }
}
