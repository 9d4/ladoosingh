import { paths } from './paths';

/**
 * @typedef {Object} PathObj
 * @property {string} url
 * @property {string} method
 */

/**
 * Call the API to generate a hook and return the generated linkID as string.
 * If there is an error from the API, this function will throw error based on situation.
 */
const generateHook = () => {
  return fetch(paths.generateHook.url, {
    method: paths.generateHook.method,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      }

      return Promise.reject(new Error('Error from API'));
    })

    .then((json) => {
      return Promise.resolve(json.link);
    })

    .catch((err) => {
      if (err.type === 'invalid-json') {
        return Promise.reject(new Error('Error parsing response from API'));
      }

      return Promise.reject(err);
    });
};

const getLinkHistory = (linkID) => {
  return fetch(paths.linkHistory.url.replace(':id', linkID), {
    method: paths.linkHistory.method,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }

      if (res.status === 404) {
        return Promise.reject(new Error('Hook not found'));
      }

      return Promise.reject(new Error('Error from API'));
    })

    .then((json) => {
      return Promise.resolve(json);
    })

    .catch((err) => {
      if (err.type === 'invalid-json') {
        return Promise.reject(new Error('Error parsing response from API'));
      }

      return Promise.reject(err);
    });
}

export { generateHook, getLinkHistory };
