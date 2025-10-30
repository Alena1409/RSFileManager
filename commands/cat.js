import { createReadStream } from 'fs';
import path from 'path';

export function cat(filePath) {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  const readableStream = createReadStream(absolutePath, { encoding: 'utf8' });

  readableStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  readableStream.on('error', (error) => {
    if (error.code === 'ENOENT') {
      console.error(`\nOperation failed. File not found: ${filePath}`);
    } else {
      console.error(`\nOperation failed: ${error.message}`);
    }
    console.log(`\nYou are currently in ${process.cwd()}`);
  });

  readableStream.on('end', () => {
    console.log(`\nYou are currently in ${process.cwd()}`);
  });
}
