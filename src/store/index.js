import Vue from 'vue'
import Vuex from 'vuex'
import { SkynetClient } from "skynet-js";
import { ContentRecordDAC } from "@skynetlabs/content-record-library";
const portal = window.location.hostname === 'localhost' ? "https://siasky.net" : undefined;
const client = new SkynetClient(portal);


Vue.use(Vuex)

const skynet = {
  namespaced: true,
  state: () => ({
    mysky: false,
    user: null
  }),
  mutations: {
    setMysky(state, payload) {
      state.mysky = payload
    },
    setUser(state, payload){
      state.user = payload
    }
  },
  actions: {
    init: function({commit}){
      return new Promise(async(resolve, reject) => {
        try {
          // Initialize MySky.
          let mySky = await client.loadMySky();
          // Initialize DAC, auto-adding permissions.
          const dac = new ContentRecordDAC()
          await mySky.loadDacs(dac);
          let user = await mySky.checkLogin();
          commit('setUser', user)
          commit('setMysky', mySky)
          resolve()
        } catch (error) {
          console.log(error)
          reject(error)
        }        
      })
    },
    login: function({state, dispatch}) {
      return new Promise(async (resolve, reject) => {
        try {
          await state.mysky.requestLoginAccess()
          await dispatch("Skynet", "init");
          resolve()
        }
        catch(err) {
          reject(err)
        } 
      })
    },
    save: function({state}, payload){
      return new Promise(async (resolve, reject) => {
        try {
          let path = await client.extractDomain(window.location.hostname) + "/task/tasks.json"
          let result = await state.mysky.setJSON(path + "/task/tasks.json", (payload));
          resolve(result)
        }
        catch(err){
          console.log(err)
          reject(err)
        }
      })
    },
    retrieve: function({state}, payload){
      return new Promise(async (resolve, reject) => {
        try {
          // Get discoverable JSON data from the given path.
          let path = await client.extractDomain(window.location.hostname) + "/task/tasks.json"
          let result = await state.mysky.getJSON(path + "/task/tasks.json", payload);
          if(result["data"] == null) { result.data = []}
          resolve(result)
        } catch (error) {
          console.log(error)
          reject(error)
        }
      })
    }
  },
  getters: {}
}

export default new Vuex.Store({
  modules: {
    Skynet: skynet,
  }
})
