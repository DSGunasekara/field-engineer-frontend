import axios from "axios";

const state = {
    requests: [],
};

const getters = {
    allRequests: (state) => state.requests,
}

const actions = {
    async fetchRequests({commit}){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.get("request")
            commit("setRequests", response.data);
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async addRequest({commit}, request){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.post('request', {...request})
            commit("setRequest", response.data)
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    }

}

const mutations = {
    setRequests: (state, request) => (state.requests = request),
    setRequest: (state, request) => (state.requests.push(request)),
}

export default {
    state,
    getters,
    actions,
    mutations,
};