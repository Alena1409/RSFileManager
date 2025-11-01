import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
import { cwd } from 'process';
import path from 'path';

export async function decompress(filePath, destinationPath) {
  const absoluteSourcePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(cwd(), filePath);

  const absoluteDestinationPath = path.isAbsolute(destinationPath)
    ? destinationPath
    : path.join(cwd(), destinationPath);
    const readStream = createReadStream(absoluteSourcePath);
    const brotliStream = createBrotliDecompress();
    const writeStream = createWriteStream(absoluteDestinationPath, { flags: 'wx' });

  try {
    await pipeline(readStream, brotliStream, writeStream);

    console.log(
      `\nSuccessfully decompressed '${filePath}' to '${destinationPath}'.`
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`\nOperation failed. Source file not found: '${filePath}'.`);
    } else if (err.code === 'EEXIST') {
      console.log(
        `\nOperation failed. Target file already exists: '${destinationPath}'.`
      );
    } else {
      console.log(`\nOperation failed. Error: ${err.message}`);
    }
  } finally {
    console.log(`\nYou are currently in ${cwd()}`);
  }
}
