import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';
import path from 'path';
import { cwd } from 'process';

export async function hash(filePath) {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(cwd(), filePath);

  const readStream = createReadStream(absolutePath);
  const hashStream = createHash('sha256').setEncoding('hex');

  try {
    await pipeline(readStream, hashStream);
    const hashValue = hashStream.read();
    console.log(`\nHash (SHA-256) for '${filePath}':\n${hashValue}`);

  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`\nOperation failed. File not found: '${filePath}'.`);
    } else {
      console.log(`\nOperation failed. Error: ${err.message}`);
    }
  } finally {
    console.log(`\nYou are currently in ${cwd()}`);
  }
}