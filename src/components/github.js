const fromEvent = require("graphcool-lib").fromEvent;

const client_id = "Iv1.21cf2727d5657718";
const client_secret = "c444ba5f8e4f496318eb33553d0f94faed848c91";

module.exports = function(event) {
  const code = event.data.githubCode;
  const graphcool = fromEvent(event);
  const api = graphcool.api("simple/v1");

  function getGithubToken() {
    return fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code
      })
    })
      .then(data => data.json())
      .then(json => json.access_token);
  }

  function getGithubAccountData(githubToken) {
    if (!githubToken) {
      return Promise.reject("Github access_token is undefined.");
    }

    return fetch(`https://api.github.com/user?access_token=${githubToken}`)
      .then(response => response.json())
      .then(parsedResponse => {
        console.log(parsedResponse);
        if (parsedResponse.error) {
          return Promise.reject(parsedResponse.error.message);
        } else {
          return parsedResponse;
        }
      });
  }

  function getGraphcoolUser(githubUser) {
    return api
      .request(
        `
    query {
      User(githubUserId: "${githubUser.id}") {
        id
      }
    }`
      )
      .then(userQueryResult => {
        if (userQueryResult.error) {
          return Promise.reject(userQueryResult.error);
        } else {
          return userQueryResult.User;
        }
      });
  }

  function createGraphcoolUser(githubUser) {
    return api
      .request(
        `
      mutation {
        createUser(
          githubUserId:"${githubUser.id}"
        ) {
          id
        }
      }`
      )
      .then(userMutationResult => {
        return userMutationResult.createUser.id;
      });
  }

  function generateGraphcoolToken(graphcoolUserId) {
    return graphcool.generateAuthToken(graphcoolUserId, "User");
  }

  return getGithubToken().then(githubToken => {
    return getGithubAccountData(githubToken)
      .then(githubUser => {
        return getGraphcoolUser(githubUser).then(graphcoolUser => {
          if (graphcoolUser === null) {
            return createGraphcoolUser(githubUser);
          } else {
            return graphcoolUser.id;
          }
        });
      })
      .then(generateGraphcoolToken)
      .then(token => {
        return { data: { token: token } };
      })
      .catch(error => {
        console.log(error);

        // don't expose error message to client!
        return { error: "An unexpected error occured." };
      });
  });
};
export const postData = (url, data = {}) =>
  getGithubToken(verifyToFetch(url, "POST", data));

export const getData = (url, data = {}) => fetchApi(url, "GET", data);

export const deleteData = (url, data = {}) =>
  getGithubToken(verifyToFetch(url, "DELETE", data));

export const putData = (url, data = {}) =>
  getGithubToken(verifyToFetch(url, "PUT", data));

export const patchData = (url, data = {}) =>
  getGithubToken(verifyToFetch(url, "PATCH", data));

const fetchInfo = (url, data = {}) => getData(`/github${url}`, data);
const patchInfo = (url, data = {}) => patchData(`/github${url}`, data);
const putInfo = (url, data = {}) => putData(`/github${url}`, data);
const routerAdapter = (router, login = null) => {
  if (login) {
    return `/${login}/${router}`;
  }
  return `/${router}`;
};

/* get repos & orgs info & user info */
const getAllRepos = () => fetchInfo(`/repos/all`);
const fetchRepos = () => fetchInfo("/repos/initial");
const fetchCommits = () => fetchInfo("/commits/initial");
const fetchOrgs = () => fetchInfo("/orgs/initial");
const getRepos = (login = null) => fetchInfo(routerAdapter("repos", login));
const getCommits = (login = null) => fetchInfo(routerAdapter("commits", login));
const getOrgs = (login = null) => fetchInfo(routerAdapter("orgs", login));
const getUser = (login = null) => fetchInfo(routerAdapter("user", login));

/* toggle user github share */
const toggleShare = enable => patchInfo("/share/status", { enable });

/* get github share records */
const getShareRecords = () => fetchInfo(`/share/records`);

const getUpdateTime = () => fetchInfo("/updateTime");

const refresh = () =>
  putInfo("/repos/refresh")
    .then(result => result && putInfo("/commits/refresh"))
    .then(result => result && putInfo("/orgs/refresh"));

const zen = () => fetchInfo("/zen");
const octocat = () => fetchInfo("/octocat");

export default {
  getUser,
  getRepos,
  getAllRepos,
  getCommits,
  getOrgs,
  fetchRepos,
  fetchCommits,
  fetchOrgs,
  toggleShare,
  getShareRecords,
  getUpdateTime,
  refresh,
  zen,
  octocat
};
