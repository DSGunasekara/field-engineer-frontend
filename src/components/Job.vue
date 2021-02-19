<template>
  <div class="container">
<!--    {{jobView[0]}}-->
    <v-card>
      <v-row>
        <v-col class="ml-5 " cols="auto">Title: </v-col>
        <v-col cols="auto" class="font-weight-bold">{{ jobView.title }} </v-col>
      </v-row>
      <v-row>
        <v-col class="ml-5 " cols="auto">Date: </v-col>
        <v-col cols="auto" class="font-weight-bold">{{ jobView.date | moment}} </v-col>
      </v-row>
      <v-row>
        <v-col class="ml-5" cols="auto">Description: </v-col>
        <v-col cols="auto" class="font-weight-bold">{{ jobView.description }}</v-col>
      </v-row>
      <v-expansion-panels focusable>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold">Assigned Engineers</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="ml-5" v-for="engineer in jobView.assignedEngineers" :key="engineer._id">
              <v-col><v-icon>mdi-face</v-icon> {{ engineer.name }}</v-col>
              <v-col><v-icon>mdi-email</v-icon> {{ engineer.email }}</v-col>
              <v-col><v-icon>mdi-cellphone-android</v-icon>{{ engineer.contactNo }}</v-col>
              <v-col><v-icon>mdi-star</v-icon>{{ engineer.rate }}</v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row style="padding-top: 5px">
        <v-col class="ml-5" cols="auto">Location: </v-col>
        <v-col cols="auto" class="font-weight-bold">{{ jobView.location }}</v-col>
      </v-row>
      <v-row>
        <v-col class="ml-5" cols="auto">Rate for an hour: </v-col>
        <v-col class="font-weight-bold" cols="auto">${{ jobView.rate }}</v-col>
      </v-row>
      <v-row>
        <v-col class="ml-5" cols="auto">Customer Name: </v-col>
        <v-col class="font-weight-bold" cols="auto">{{ jobView.lconName }}</v-col>
      </v-row>
      <v-row>
        <v-col class="ml-5" cols="auto">Customer Contact No: </v-col>
        <v-col class="font-weight-bold" cols="auto">{{ jobView.lconContactNo }}</v-col>
      </v-row>
      <v-expansion-panels focusable>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold">Assigned Equipments</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="ml-5" v-for="req in getReqItems" :key="req._id">
              <v-col><v-icon>mdi-tools</v-icon> {{ req.item.itemName }}</v-col>
              <v-col>Quantity: {{ req.qty }}</v-col>
              <v-col><v-icon>mdi-map-marker</v-icon>{{ req.item.inventoryLocation }}</v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <h1 class="grey--text" style="text-align: center; margin-top: 20px;">JOB TIMELINE</h1>
<!--    <v-timeline>-->
<!--      <v-timeline-item-->
<!--          v-for="n in 4"-->
<!--          :key="n"-->
<!--          large-->
<!--      >-->
<!--        <template v-slot:icon>-->
<!--          <v-avatar>-->
<!--            <img src="">-->
<!--          </v-avatar>-->
<!--        </template>-->
<!--        <template>-->
<!--          <span>Tus eu perfecto</span>-->
<!--        </template>-->
<!--        <v-card class="elevation-2">-->
<!--          <v-card-title class="headline">-->
<!--            Lorem ipsum-->
<!--          </v-card-title>-->
<!--          <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>-->
<!--        </v-card>-->
<!--      </v-timeline-item>-->
<!--    </v-timeline>-->
    <div>
      <v-btn @click="startJob">Start Job</v-btn> <span style="margin-left: 20px" v-if="jobView.startedTime">{{ jobView.startedTime | moment}}</span>
      <br><br><v-btn @click="endJob">End Job</v-btn><span style="margin-left: 20px" v-if="jobView.endTime">{{ jobView.endTime | moment}}</span>
<!--      <v-snackbar top v-model="snackbar">-->
<!--        {{ text }}-->

<!--        <template v-slot:action="{ attrs }">-->
<!--          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false" :loading="loading">Close</v-btn>-->
<!--        </template>-->
<!--      </v-snackbar>-->
      <v-snackbar top v-model="snackbar">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false" :loading="loading">Close</v-btn>
        </template>
      </v-snackbar>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import moment from "moment";

export default {
  name: "Job",
  data(){
    return {
      jobs: [],
      snackbar: false,
      loading: false,
      text: ''
    }
  },
  methods:{
    ...mapActions(["fetchJobs", "updateJob", "fetchUserJobs","fetchReqItems"]),
    async startJob(){
      try {
        const time = new Date().toISOString()
        const job = {
          id: this.$route.params.id,
          startedTime: time,
          setDate: true
        }
        const response = await this.updateJob(job)
        this.snackbar = true
        this.loading = false
        if(response !== 200){
          this.text = response.data
          this.snackbar = false
          return
        }
        this.text = "Job Started"
      }catch (error){
        console.log(error)
      }
    },
    async endJob(){
      try {
        const time = new Date().toISOString()
        const job = {
          id: this.$route.params.id,
          status: "Done",
          endTime: time,
          setDate: true
        }
        const response = await this.updateJob(job)
        this.snackbar = true
        this.loading = false
        if(response !== 200){
          this.text = response.data
          this.snackbar = false
          return
        }
        this.text = "Job Ended"
      }catch (error){
        console.log(error)
      }
    }
  },
  computed:{
    ...mapGetters(["allJobs", "getProfile", "getReqItems"]),
    jobView(){
      return  this.allJobs.filter(job=> job._id === this.$route.params.id)[0]

    },
    getRole(){
      return this.getProfile.role
    }
  },
  async created() {
    try {
      await this.fetchJobs()
      await this.fetchReqItems(this.$route.params.id)
    }catch (error){
      console.log(error)
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMM D YYYY, h:mm a');
    }
  },

}
</script>

<style scoped>

</style>
