import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
import { cwd } from 'process';

export async function compress(filePath) {
  const outputFileName = filePath + '.br';
  const readStream = createReadStream(filePath);
  const brotliStream = createBrotliCompress();
  const writeStream = createWriteStream(outputFileName, { flags: 'wx' });

  try {
    await pipeline(readStream, brotliStream, writeStream);

    console.log(
      `\nSuccessfully compressed '${filePath}' to '${outputFileName}'.`
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`\nOperation failed. Source file not found: '${filePath}'.`);
    } else if (err.code === 'EEXIST') {
      console.log(
        `\nOperation failed. Target file already exists: '${outputFileName}'.`
      );
    } else {
      console.log(`\nOperation failed. Error: ${err.message}`);
    }
  } finally {
    console.log(`\nYou are currently in ${cwd()}`);
  }
}
