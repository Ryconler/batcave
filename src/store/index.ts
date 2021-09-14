import { Module, createStore } from 'vuex'
import { isString } from 'lodash'

// import mutations from './mutations'
// import actions from './action'
// import getters from './getters'

// const state = {
//   user: null,
//   errorMessages: [],
//   myLikeURLIds: [],
//   myLikeFileIds: [],
//   homeSelect: true,
//   urlSelect: false,
//   fileSelect: false,
//   myLikeSelect: false,
//   myURLSelect: false,
//   myFileSelect: false,
//   changePswSelect: false,
//   login: false,
//   register: false
// }
const state = {
  appData: {}
}
const mutations = {}
const actions = {}
export const appStore = createStore({
  state,
  getters: {},
  mutations,
  actions
})

/**
 * 动态注册模块store
 * @param to 路由或者自定义module名称
 * @param store 数据
 * @param isCache 是否缓存store
 */
export function registerModule(to: any | string, store: Module<any, any>, isCache = false) {
  let name = ''
  let keepAlive = isCache
  if (isString(to)) {
    name = to
  } else if (to && to.name) {
    name = to.name
    keepAlive = to?.meta?.keepAlive
  }
  if (name) {
    if (appStore.hasModule(name)) {
      if (!keepAlive) {
        appStore.unregisterModule(name)
        appStore.registerModule(name, store)
      }
    } else {
      appStore.registerModule(name, store)
    }
  }
}
