import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { basename } from 'path';

const client = createClient({
  projectId: 'h4u8wu58',
  dataset: 'production',
  apiVersion: '2021-06-07',
  token: process.env.SANITY_API_READ_TOKEN,
});

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/upload-cv.mjs <path-to-cv.pdf>');
  process.exit(1);
}

const fileBuffer = readFileSync(filePath);
const fileName = basename(filePath);

console.log(`Uploading ${fileName}...`);

const asset = await client.assets.upload('file', fileBuffer, {
  filename: fileName,
});

console.log('Upload successful!');
console.log('Asset ID:', asset._id);
console.log('URL:', asset.url);
