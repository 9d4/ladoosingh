const host = "https://ladoosingh.herokuapp.com";

const paths = {
  generateHook: {
    method: "POST",
    url: `${host}/links`,
  },
  linkHistory: {
    method: "GET",
    url: `${host}/links/:id`,
  },
};

export { host, paths };
