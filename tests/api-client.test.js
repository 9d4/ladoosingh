jest.mock('node-fetch');

const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const { generateHook } = require('../src/api/api-client');

describe('Generate Hook', () => {
  it('should call the API to generate a hook and return the generated linkID as string', () => {
    const linkID = 'YojcbH8hD';
    const resData = `{"link":"${linkID}"}`;
    fetch.mockResolvedValue(new Response(resData, { status: 201 }));

    return generateHook().then((linkID) => {
      expect(linkID).toBe(linkID);
    });
  });

  it('should throw error if there is an error from the API', () => {
    fetch.mockResolvedValue(new Response('', { status: 500 }));
    return expect(generateHook()).rejects.toThrow('Error from API');
  });

  it('should throw error if there is an error parsing the response from API', () => {
    fetch.mockResolvedValue(new Response('"{}', { status: 201 }));
    return expect(generateHook()).rejects.toThrow(
      'Error parsing response from API'
    );
  });
});
