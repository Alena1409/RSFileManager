import { promises as fs } from 'fs';
import { cwd } from 'process';

export async function ls() {
  try {
    const items = await fs.readdir(cwd(), { withFileTypes: true });
    const tableData = items
      .sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
      })
      .map((item) => ({
        Name: item.name,
        Type: item.isDirectory() ? 'directory' : 'file',
      }));

    console.table(tableData);
  } catch {
    console.log(`\nOperation failed`);
  } finally {
    console.log(`\nYou are currently in ${cwd()}`);
  }
}
