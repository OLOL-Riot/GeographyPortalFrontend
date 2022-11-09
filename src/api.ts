import axios from "axios";
import { LocalStorage } from "quasar";
import type authToken from "./interfaces/authToken";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const baseurlsite = 'https://b2b.skysleep.ru'
const baseurlsite = "http://localhost:5242";
const getApi = () =>
  axios.create({
    headers: {
      post: {
        Authorization: 'bearer ' + (<authToken>LocalStorage.getItem("auth")).token,
      },
      get: {
        Authorization: 'bearer ' + (<authToken>LocalStorage.getItem("auth")).token,
      },
    },
    baseURL: baseurlsite + "/",
  });

export { axios, getApi, baseurlsite };
