<template>
  <div class="container">
    <h1 class="subheading teal--text">Dashboard</h1>
    <v-row>
      <v-col>
        <PieChart v-if="pieData.length !== 0" :nos="pieData"/>
      </v-col>
      <v-col>
        <line-chart v-if="lineData.length !==0" :nos="lineData"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 v-if="getUserData.role !== 'Admin' " class="font-weight-light">Pending Requests: {{ getUserReqs.length }}</h2>
        <h2 v-if="getUserData.role === 'Admin' " class="font-weight-light">Pending Requests: {{ getPendingReqs.length }}</h2>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PieChart from "@/components/PieChart";
import LineChart from "@/components/LineChart";
import { mapGetters, mapActions } from 'vuex'

export default {
name: "Dashboard",
  components: {LineChart, PieChart},
  data(){
    return{
      pieData: [],
      lineData: [],
    }
  },
  methods:{
    ...mapActions(["fetchUserJobs", "fetchRequests", "fetchJobs", "getUser"]),
    getPieData(){
      if(this.getUserData.role !== "Admin"){
        this.pieData.push(this.getUserJobs.jobHistory.filter(job=>job.status === "Pending").length)
        this.pieData.push(this.getUserJobs.jobHistory.filter(job=>job.status === "Started").length)
        this.pieData.push(this.getUserJobs.jobHistory.filter(job=>job.status === "Reschedule").length)
        this.pieData.push(this.getUserJobs.jobHistory.filter(job=>job.status === "Done").length)
      }else if(this.getUserData.role === "Admin"){
        this.pieData.push(this.allJobs.filter(job=>job.status === "Pending").length)
        this.pieData.push(this.allJobs.filter(job=>job.status === "Started").length)
        this.pieData.push(this.allJobs.filter(job=>job.status === "Reschedule").length)
        this.pieData.push(this.allJobs.filter(job=>job.status === "Done").length)
      }
    },
    getLineData(){
      if(this.getUserData.role !== "Admin"){
        let newDate = new Date().toISOString();
        let yearlyJobs = this.getUserJobs.jobHistory.filter(job=>job.status === "Done" & job.date.substr(0,4) === newDate.substr(0,4) )
        for (let i = 0; i < 12; i++) {
          this.lineData.push(yearlyJobs.filter(job => job.date.substr(5,2) == i+1).length)
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getUserJobs", "getProfile", "getUserData", "allRequests", "allJobs"]),
    getUserReqs(){
      return this.allRequests.filter(req=> req.requestedUser._id === this.getProfile._id & req.status === "Pending")
    },
    getPendingReqs(){
      return this.allRequests.filter(req=> req.status === "Pending")
    }
  },
  async mounted(){
    await this.getUser()
    await this.fetchJobs()
    await this.fetchUserJobs(this.getUserData.id)
    await this.fetchRequests()
    await this.getPieData()
    await this.getLineData()
  },
  async created() {

  }
}
</script>

<style scoped>

</style>
