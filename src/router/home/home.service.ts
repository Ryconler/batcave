import { Module } from 'vuex'

export const store: Module<any, any> = {
  namespaced: true,
  state: () => ({
    homeData: {}
  }),
  mutations: {},
  getters: {},
  actions: {}
}
