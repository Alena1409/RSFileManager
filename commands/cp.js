import { createReadStream, createWriteStream } from 'fs';
import { promises as fs } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { cwd } from 'process';

export async function cp(filePath, newFilePath) {
  const absoluteFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(cwd(), filePath);

  const absoluteNewFilePath = path.isAbsolute(newFilePath)
    ? newFilePath
    : path.join(cwd(), newFilePath);

  const readStream = createReadStream(absoluteFilePath);
  const writeStream = createWriteStream(absoluteNewFilePath, { flags: 'wx' });

  try {
    await pipeline(readStream, writeStream);
    console.log(`\nSuccessfully copied '${filePath}' to '${newFilePath}'.`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      errorMessage = `\nSource file not found or destination path is invalid: '${filePath}'.`;
    } else if (err.code === 'EEXIST') {
      errorMessage = `\nTarget file already exists: '${newFilePath}'.`;
    }
    console.log(`\nOperation failed.`);
  } finally {
    console.log(`\nYou are currently in ${cwd()}`);
  }
}
