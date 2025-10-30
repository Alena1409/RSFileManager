import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
import { cwd } from 'process';

export async function decompress(filePath) {
  if (!filePath.endsWith('.br')) {
    console.log(`\nOperation failed. File does not have a '.br' extension.`);
    return;
  }
  const outputFileName = filePath.slice(0, -3);
  const readStream = createReadStream(filePath);
  const brotliStream = createBrotliDecompress();
  const writeStream = createWriteStream(outputFileName, { flags: 'wx' });

  try {
    await pipeline(readStream, brotliStream, writeStream);

    console.log(
      `\nSuccessfully decompressed '${filePath}' to '${outputFileName}'.`
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
