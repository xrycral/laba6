async function* dataProducer(totalRecords, chunkSize = 10) {
  let processed = 0;

  while (processed < totalRecords) {
    await new Promise((resolve) => setTimeout(resolve, 10));

    const chunk = [];
    const end = Math.min(processed + chunkSize, totalRecords);

    for (let i = processed; i < end; i++) {
      if (i === 55) {
        return;
      }

      chunk.push({ id: i, value: Math.random() * 1000 });
    }

    yield chunk;
    processed = end;
  }
}

export { dataProducer };