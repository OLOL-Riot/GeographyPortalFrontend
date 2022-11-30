import axios, { type AxiosResponse } from "axios";
import { LocalStorage } from "quasar";
import type IAuthToken from "./interfaces/IAuthToken";
import jwt_decode from "jwt-decode"

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const baseurlsite = 'https://b2b.skysleep.ru'
const baseurlsite = "http://localhost:5242";

interface IRefrashToken {
  token: string;
  refreshToken: string
}

interface IDecodedToken {
  exp: number
}

function checkToken(token: string) {
  let decodedToken = jwt_decode(token) as IDecodedToken;

  let now = new Date();
  let limitTime = new Date(decodedToken.exp * 1000);

  return now < limitTime;
}

async function refrashToken() {
  let authToken = <IAuthToken>LocalStorage.getItem("auth");

  let response = await axios.put(baseurlsite + "/api/Authentification/refresh", {
    token: authToken.token,
    refreshToken: authToken.refreshToken
  } as IRefrashToken) as AxiosResponse<IRefrashToken>;

  let responseToken = response.data;

  authToken.token = responseToken.token
  authToken.refreshToken = responseToken.refreshToken;

  LocalStorage.set("auth", authToken);
}

const getApi = async () => {
  let token = (<IAuthToken>LocalStorage.getItem("auth")).token;

  if (!checkToken(token)) {
    await refrashToken();

    token = (<IAuthToken>LocalStorage.getItem("auth")).token;
  }

  return axios.create({
    headers: {
      post: {
        Authorization:
          "bearer " + token,
      },
      get: {
        Authorization:
          "bearer " + token,
      },
    },
    baseURL: baseurlsite + "/",
  })
};

export { axios, getApi, baseurlsite };
