import { promises as fs } from 'fs';
import path from 'path';

export async function add(fileName) {
  const filePath = path.join(process.cwd(), fileName);

  try {
    await fs.writeFile(filePath, '', { flag: 'wx' });
    console.log(`\nFile '${fileName}' successfully created!`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`\nFile already exists: ${fileName}`);
    }
    console.log(`\nOperation failed.`);
  } finally {
    console.log(`\nYou are currently in ${process.cwd()}`);
  }
}
