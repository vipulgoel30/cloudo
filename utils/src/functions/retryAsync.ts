export const retryAsync = async <T extends any>(
  operation: () => Promise<any>,
  retries: number,
  interval: number,
  maxInterval: number,
  retryOperation: () => Promise<any>
): Promise<T> => {
  try {
    return await operation();
  } catch (err) {
    if (retries === 1) throw err;
    await retryOperation?.();

    const delay = Math.min(interval * 2, maxInterval); // back-off delay
    return await retryAsync(operation, retries - 1, delay, maxInterval, retryOperation);
  }
};
