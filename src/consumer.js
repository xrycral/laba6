import { dataProducer } from './producer.js';

async function consumeWithAsyncIterator(totalRecords) {
  console.log('=== Async Iterator Example ===');
  console.log(`Processing ${totalRecords} records in chunks...\n`);

  let totalProcessed = 0;
  let chunkCount = 0;

  try {
    for await (const chunk of dataProducer(totalRecords)) {
      chunkCount++;
      totalProcessed += chunk.length;

      const avg =
        chunk.reduce((sum, item) => sum + item.value, 0) / chunk.length;

      console.log(
        `Chunk #${chunkCount}: ${chunk.length} records | avg value: ${avg.toFixed(2)}`
      );
    }

    console.log(`\nDone. Total processed: ${totalProcessed} records.`);
  } catch (err) {
    console.error(`\n[Consumer] Producer error caught: ${err.message}`);
    console.log(`Processed before error: ${totalProcessed} records.`);
  }
}

export { consumeWithAsyncIterator };