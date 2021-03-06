import axios from "axios";

const state = {
    requests: [],
    jobItems: []
};

const getters = {
    allRequests: (state) => state.requests,
    getReqItems: (state) => state.jobItems,
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
    async fetchReqItems({commit}, jobId){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.get(`request/job/${jobId}`)
            commit("setJobItems", response.data);
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
    },
    async updateRequest({dispatch}, request){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.patch(`request/${request._id}`, {...request})
            dispatch("fetchRequests")
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async deleteRequest({dispatch}, id){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.delete(`request/${id}`)
            dispatch("fetchRequests")
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
    setJobItems: (state, items) => (state.jobItems = items)
}

export default {
    state,
    getters,
    actions,
    mutations,
};