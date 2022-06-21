jest.mock('node-fetch');

const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const { generateHook, getLinkHistory } = require('../src/api/api-client');

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

describe('Get Link History', () => {
  it('should call the API to get link history and return the linkID as string', () => {
    const linkID = 'YojcbH8hD';
    const resData = `[{"data": {"method": "GET"}, "created_at": "2020-01-01T00:00:00.000Z", "updated_at": "2020-01-01T00:00:00.000Z"}]`;
    fetch.mockResolvedValue(new Response(resData, { status: 200 }));

    return getLinkHistory(linkID).then((res) => {
      expect(res[0]).toStrictEqual(JSON.parse(resData)[0]);
    });
  });
});