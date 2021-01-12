import axios from "axios";

const state = {
    jobs: [],
};

const getters = {
    allJobs: (state) => state.jobs,
};

const actions = {
    async fetchJobs({ commit }) {
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.get("job")
            commit("setJobs", response.data);
        }catch (error){
            console.log(error)
        }
    },
    async addJob({ commit }, job) {
        try {
            const response = await axios.post("job", { ...job })
            commit("setJob", response.data);
        }catch (error){
            console.log(error)
        }
    },
    async deleteJob({ commit, dispatch }, job) {
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;

            await axios.delete(`job/${job}`)
            commit("removeJob", job);
            dispatch("fetchJobs");
        }catch (error){
            console.log(error)
        }
    },
    async updateJob({ dispatch }, job) {
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            await axios.patch(`job/${job.id}`, { ...job })
            dispatch("fetchJobs");
        }catch (error){
            console.log(error)
        }
    },
    async acceptJob({ dispatch }, job){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            await axios.patch(`job/addEngineer/${job.id}`, {...job})
            dispatch("fetchJobs")
        }catch (error){
            console.log(error)
        }
    },
};

const mutations = {
    setJobs: (state, jobs) => (state.jobs = jobs),
    setJob: (state, job) => state.jobs.push(job),
    removeJob: (state, jobId) =>
        (state.jobs = state.jobs.filter((job) => job.id !== jobId)),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
