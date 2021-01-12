import axios from "axios";

const state = {
    token: localStorage.getItem("access_token") || null,
    profile: null,
    user: null,
};

const getters = {
    isLoggedIn(state) {
        return state.token !== null;
    },
    getProfile(state) {
        return state.profile;
    },
};


const actions = {
    async registerUser({ dispatch }, newUser){
      try {
          await axios.post("user", { ...newUser })
          console.log(dispatch)
      }  catch (error){
          console.log(`Register user ${error}`)
      }
    },
    async login({ commit, dispatch }, credentials ){
        try {
            const response = await axios.post("login", {...credentials });
            const token = response.data;
            localStorage.setItem("access_token", token);
            commit("setToken", token);
            dispatch("getUser");
        }catch (error) {
            console.log(`Login error ${error}`)
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
            dispatch("getProfile", response.data.id);

        }catch (error) {
            console.log(`Get User ${error}`)
        }
    },
    async getProfile({commit}, userId){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await  axios.get(`/user/${userId}`);
            commit("setProfile", {...response.data});
        }catch (error){
            console.log(error)
        }
    },
    async updateUser({ dispatch }, user){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.patch(`/user/${user.id}`, {...user});
            dispatch("getProfile", user.id);
        }catch (error){
            console.log(error)
        }
    },
    async updateProfile({ dispatch }, user){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;

            const response = await axios.patch(`/user/updatePassword/${user.id}`, { ...user });
            dispatch("getProfile", user.id);
        }catch (error){
            console.log(`update profile ${error}`)
        }
    }
};

const mutations = {
    setToken: (state, token) => (state.token = token),
    removeToken: () => (state.token = null),
    setUser: (state, user) => (state.user = user),
    setProfile: (state, profile) => (state.profile = profile),
};

export default {
    state,
    getters,
    actions,
    mutations,
};

















