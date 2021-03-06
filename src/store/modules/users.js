import axios from "axios";

const state = {
    token: localStorage.getItem("access_token") || null,
    profile: null,
    user: null,
    engineers: [],
};

const getters = {
    isLoggedIn: (state) => state.token !== null,
    getProfile: (state) => state.profile,
    getUserData: (state) => state.user,
    allEngineers: (state) => state.engineers,
};


const actions = {
    async fetchEngineers({ commit }) {
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.get("user/engineers")
            commit("setEngineers", response.data);
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async registerUser({ dispatch }, newUser){
      try {
          const response = await axios.post("user", { ...newUser })
          console.log(dispatch)
          return response.status
      }  catch (error){
          console.log(`Register user ${error}`)
          return error.response
      }
    },
    async login({ commit, dispatch }, credentials ){
        try {
            const response = await axios.post("login", {...credentials });
            const token = response.data;
            localStorage.setItem("access_token", token);
            commit("setToken", token);
            dispatch("getUser");
            return response.status;
        }catch (error) {
            console.log(`Login error ${error.response.status}`)
            return error.response
        }
    },
    logout({ commit }) {
        if (getters.isLoggedIn) {
            localStorage.removeItem("access_token");
            commit("removeToken");
        }
    },
    async getUser({ commit, dispatch}){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;

            const response = await axios.get("login")
            commit("setUser", { ...response.data });
            dispatch("getProfileData", response.data.id);
            return response.status
        }catch (error) {
            console.log(`Get User ${error}`)
            return error.response
        }
    },
    async removeEngineer({dispatch}, userId){
      try {
          axios.defaults.headers.common[
              "Authorization"
              ] = `Bearer ${localStorage.getItem("access_token")}`;

          const response = await axios.delete(`user/${userId}`)
          dispatch("fetchEngineers")
          return response.status
      }  catch (error){
          console.log(error)
          return error.response
      }
    },
    async getProfileData({commit}, userId){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await  axios.get(`/user/${userId}`);
            commit("setProfile", {...response.data});
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async updateUser({ dispatch }, user){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.patch(`/user/${user.id}`, {...user});
            dispatch("getProfile", user.id);
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async updateProfile({ dispatch }, user){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;

            const response = await axios.patch(`/user/updatePassword/${user.id}`, { ...user });
            dispatch("getProfile", user.id);
            return response.status
        }catch (error){
            console.log(`update profile ${error}`)
            return error.response
        }
    },
    async updatePassword({ dispatch }, user) {
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;

            const response = await axios.patch(`/user/updatePassword/${user.id}`, { ...user })
            dispatch("getProfile", user.id);
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
};

const mutations = {
    setToken: (state, token) => (state.token = token),
    removeToken: () => (state.token = null),
    setUser: (state, user) => (state.user = user),
    setProfile: (state, profile) => (state.profile = profile),
    setEngineers: (state, engineers) => (state.engineers = engineers),
};

export default {
    state,
    getters,
    actions,
    mutations,
};

















