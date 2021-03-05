<template>
  <div class="container">
    <h1 class="subheading teal--text">Dashboard</h1>
    <v-row>
      <v-col>
        <PieChart v-if="pieData.length !== 0" :nos="pieData"/>
      </v-col>
      <v-col>
        <line-chart/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="font-weight-light">Pending Requests: {{ getUserReqs.length }}</h2>
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
    ...mapActions(["fetchUserJobs", "fetchRequests"]),
    getPieData(){
      this.pieData.push(this.getUserJobs.jobHistory.filter(job=>job.status === "Pending").length)
      this.pieData.push(this.getUserJobs.jobHistory.filter(job=>job.status === "Started").length)
      this.pieData.push(this.getUserJobs.jobHistory.filter(job=>job.status === "Reschedule").length)
      this.pieData.push(this.getUserJobs.jobHistory.filter(job=>job.status === "Completed").length)
    }
  },
  computed: {
    ...mapGetters(["getUserJobs", "getProfile", "allRequests"]),
    getUserReqs(){
      return this.allRequests.filter(req=> req.requestedUser._id === this.getProfile._id & req.status === "Pending")
    }
  },
  async created() {
    await this.fetchUserJobs(this.getProfile._id)
    this.getPieData()
    await this.fetchRequests()
  }
}
</script>

<style scoped>

</style>
