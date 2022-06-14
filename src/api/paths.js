const host = "https://ladoosingh.herokuapp.com";

const paths = {
  generateHook: {
    method: "POST",
    url: `${host}/links`,
  },
};

export { host, paths };
