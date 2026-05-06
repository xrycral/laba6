import { consumeWithAsyncIterator } from './consumer.js';
import { createDataStream, consumeStream } from './streamExample.js';

async function main() {
  await consumeWithAsyncIterator(100);

  console.log('\n' + '='.repeat(40) + '\n');

  const stream = createDataStream(80, 45);
  consumeStream(stream);
}

main().catch((err) => {
  console.error('Unhandled error in main:', err.message);
  process.exit(1);
});