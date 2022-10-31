import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { LocalStorage } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const baseurlsite = 'https://b2b.skysleep.ru'
const baseurlsite = 'http://localhost:5242'
const api = axios.create({ baseURL: baseurlsite + '/' })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.request.use((config) => {
    const login = LocalStorage.getItem('login')
    const token = LocalStorage.getItem('token')

    if (login !== '' && token !== '' && login !== null && token !== null) {
      if (config.data !== undefined && config.data.params !== undefined) {
        config.data.params.login = login
        config.data.params.token = token
      } else if (config.data !== undefined) {
        config.data.append('login', login)
        config.data.append('token', token)
      }
      if (config.params === undefined) config.params = {}
      config.params.login = login
      config.params.token = token
    }
    return config
  })
})

export { axios, api, baseurlsite }
