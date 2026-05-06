import { Readable } from 'node:stream';

function createDataStream(totalRecords, failAt = null) {
  let current = 0;

  const stream = new Readable({
    objectMode: true,
    read() {
      setTimeout(() => {
        if (current >= totalRecords) {
          this.push(null);
          return;
        }

        if (current === failAt) {
          this.destroy(new Error(`Stream error at record ${current}`));
          return;
        }

        this.push({ id: current, value: Math.random() * 1000 });
        current++;
      }, 5);
    },
  });

  return stream;
}

function consumeStream(stream) {
  console.log('=== Event-based Stream Example ===\n');

  let count = 0;
  let sum = 0;

  stream.on('data', (record) => {
    count++;
    sum += record.value;

    if (count % 20 === 0) {
      console.log(
        `Received ${count} records so far | running avg: ${(sum / count).toFixed(2)}`
      );
    }
  });

  stream.on('end', () => {
    console.log(
      `\nStream ended. Total: ${count} records | final avg: ${(sum / count).toFixed(2)}`
    );
  });

  stream.on('error', (err) => {
    console.error(`\n[Stream] Error event caught: ${err.message}`);
    console.log(`Records received before error: ${count}`);
    throw err;
  });
}

export { createDataStream, consumeStream };