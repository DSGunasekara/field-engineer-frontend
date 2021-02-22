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
    <h1 class="teal--text" style="text-align: center; margin-top: 20px;">JOB TIMELINE</h1>
    <br>
    <div>
      <v-btn @click="startJob" v-if="getRole !== 'Admin'" outlined color="green">Start Job</v-btn><b><span style="margin-left: 20px" v-if="jobView.startedTime">Started Time: {{ jobView.startedTime | moment}}</span></b>
      <v-btn @click="endJob" v-if="getRole !== 'Admin'" outlined color="red" style="margin-left: 20px">End Job</v-btn><b><span style="margin-left: 20px" v-if="jobView.endTime">Ended Time: {{ jobView.endTime | moment}}</span></b>
      <br><br>
      <v-snackbar top v-model="snackbar">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false" :loading="loading">Close</v-btn>
        </template>
      </v-snackbar>
    </div>
    <br>
    <hr>
    <AddFiles class="my-1" v-bind:id="this.$route.params.id"/>
    <br>

    <v-layout row wrap>
      <v-flex
          xs12
          sm6
          md4
          lg3
          v-for="doc in jobView.jobImages" :key="doc._id"
      >
        <v-card text class="ma-3">
          <v-card-text>
            <div class="subheading">
              User: {{ doc.UserName }}
            </div>
            <div class="grey--text">
              Approval: {{ doc.status }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn  outlined class="mx-2" style="margin-bottom: 10px" color="#49C6E5" @click="openFile(`https://field-engineer-backend.herokuapp.com/${doc.ImageUrl}`)">Get
                        {{ doc.note }} DOCS</v-btn>
            <br><br>
            <div v-if="getRole === 'Admin'">
              <v-btn outlined color="green" class="my-1 mx-2" @click="approve(doc)"><v-icon>mdi-check</v-icon></v-btn>
              <v-btn outlined color="red" @click="reject(doc)"><v-icon>mdi-close</v-icon></v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import moment from "moment";
import AddFiles from "@/components/AddFiles";

export default {
  name: "Job",
  components: {
    AddFiles
  },
  data(){
    return {
      jobs: [],
      snackbar: false,
      loading: false,
      text: '',
      note: '',
      publicPath: process.env.BASE_URL
    }
  },
  methods:{
    ...mapActions(["fetchJobs", "updateJob", "fetchUserJobs","fetchReqItems", "updateImages"]),
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
    },
    async approve(item){
      const job = {
        id: item._id,
        jobId: this.$route.params.id,
        status: "Approved"
      }
      await this.updateImages(job)
    },
    async reject(item){
      const job = {
        id: item._id,
        jobId: this.$route.params.id,
        status: "Rejected"
      }
      await this.updateImages(job)
    },
    openFile(url){
      window.open(url)
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
