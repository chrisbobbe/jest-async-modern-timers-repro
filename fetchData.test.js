global.Promise = require('promise');

const fetchDataReal = require('./fetchData').fetchData;
const fetchDataErrorReal = require('./fetchData').fetchDataError;

const fetchData = (...args) => {
  const promise = fetchDataReal(...args);
  jest.runAllTimers();
  return promise;
}

const fetchDataError = (...args) => {
  const promise = fetchDataErrorReal(...args);
  jest.runAllTimers();
  return promise;
}

describe('modern fake timers', () => {
  jest.useFakeTimers('modern');

  test('No Promises', () => {
    expect('peanut butter').toBe('peanut butter');
  });

  test('1 equals 1', async () => {
    await Promise.resolve();
    expect(1).toEqual(1);
  });

  describe('Promises', () => {
    test('the data is peanut butter', async () => {
      const data = await fetchData();
      expect(data).toBe('peanut butter');
    });

    test('the fetch fails with an error', () => {
      expect.assertions(1);
      return fetchDataError().catch(e => expect(e.message).toMatch('error'));
    });
  });

  describe('`.resolves`/`.rejects`', () => {
    test('the data is peanut butter', () => expect(fetchData()).resolves.toBe('peanut butter'));

    test('the fetch fails with an error', () => expect(fetchDataError()).rejects.toThrow('error'));
  });

  describe('Async/Await', () => {
    test('the data is peanut butter', async () => {
      const data = await fetchData();
      expect(data).toBe('peanut butter');
    });

    test('the fetch fails with an error', async () => {
      expect.assertions(1);
      try {
        await fetchDataError();
      } catch (e) {
        expect(e.message).toMatch('error');
      }
    });
  });

  describe('async/await combined with .resolves/.rejects', () => {
    test('the data is peanut butter', async () => {
      await expect(fetchData()).resolves.toBe('peanut butter');
    });

    test('the fetch fails with an error', async () => {
      await expect(fetchDataError()).rejects.toThrow('error');
    });
  });
});
