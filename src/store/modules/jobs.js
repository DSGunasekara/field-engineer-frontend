import axios from "axios";

const state = {
    jobs: [],
    userJobs: [],
};

const getters = {
    allJobs: (state) => state.jobs,
    getUserJobs: (state) => state.userJobs
};

const actions = {
    async fetchJobs({ commit }) {
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.get("job")
            commit("setJobs", response.data);
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async rejectJob({dispatch}, job){
      try {
          axios.defaults.headers.common[
              "Authorization"
              ] = `Bearer ${localStorage.getItem("access_token")}`;
          const response = await axios.patch(`job/removeEngineer/${job.job}`, {...job})
          dispatch("fetchJobs")
          return response.status
      }  catch (error){
          console.log(error)
          return error.response
      }
    },
    async fetchUserJobs({ commit }, userId){
      try {
          axios.defaults.headers.common[
              "Authorization"
              ] = `Bearer ${localStorage.getItem("access_token")}`;
          const response = await axios.get(`user/${userId}`)
          commit("setUserJobs", response.data);
          return response.status
      }  catch (error){
          console.log(error)
          return error.response
      }
    },
    async addJob({ commit }, job) {
        try {
            const response = await axios.post("job", { ...job })
            commit("setJob", response.data);
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async deleteJob({ commit, dispatch }, job) {
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;

            const response =await axios.delete(`job/${job}`)
            commit("removeJob", job);
            dispatch("fetchJobs");
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async updateJob({ dispatch }, job) {
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            console.log(job)
            const response = await axios.patch(`job/${job.id}`, { ...job })
            dispatch("fetchJobs");
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async acceptJob({ dispatch }, job){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.patch(`job/assignEngineer/${job.id}`, {...job})
            dispatch("fetchJobs")
            return response.status
        }catch (error){
            return error.response
        }
    },
    async uploadImages({dispatch}, jobImg){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.patch(`job/upload/${jobImg.get('id')}`, jobImg)
            dispatch("fetchJobs")
            return response.status
        }catch (error){
            return error.response
        }
    },
    async updateImages({dispatch}, jobImg){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.patch(`job/updateImgs/${jobImg.id}`, jobImg)
            dispatch("fetchJobs")
            return response.status
        }catch (error){
            return error.response
        }
    }
};

const mutations = {
    setJobs: (state, jobs) => (state.jobs = jobs),
    setUserJobs: (state, userJobs) => (state.userJobs = userJobs),
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
