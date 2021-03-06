<template>
  <div class="dashboard">
    <v-container class="my-5">
      <br>
      <h2 v-if="this.getUserData.role !== 'Admin'" class="subheading teal--text">Your Job List</h2>
      <v-card text v-for="(job, index) in getUserJobs.jobHistory" :key="index" style="margin-top: 15px">
        <v-layout row wrap :class="`pa-3 project ml-2 ${job.status}`">
          <v-flex xs12 md2>
            <div class="caption grey--text">Job title</div>
            <div>{{ job.title }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Location</div>
            <div>{{ job.location }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ job.date | moment }}</div>
          </v-flex>
          <v-flex xs6 sm4 md1>
            <div class="caption grey--text">Rate</div>
            <div>$ {{ job.rate }}</div>
          </v-flex>
          <v-flex xs6 sm4 md1>
            <div class="caption grey--text">Engineers</div>
            <div>{{ job.assignedEngineers.length }} / {{ job.requiredEngineers }}</div>
          </v-flex>

          <v-flex xs2 sm4 md1>
            <div class="right ml-5">
              <v-chip small :class="`white--text my-2 caption ${job.status}`" :color="`${job.status === 'Done'? Done: Pending}`">{{
                  job.status
                }}</v-chip>
            </div>
          </v-flex>
          <v-flex xs6 sm4 md1>
            <v-btn outlined color="green" class="mx-2" @click="viewJob(job._id)"
            ><v-icon>mdi-eye</v-icon> View</v-btn
            >
          </v-flex>
          <v-flex xs6 sm4 md1 v-if="getUserData.role === 'Engineer'">
<!--            <v-btn outlined color="red" class="mx-5" @click="removeJob(job._id)"-->
<!--            ><v-icon>mdi-delete</v-icon> Reject</v-btn-->
<!--            >-->
          <div class="text-center">
            <v-dialog
                v-model="dialog"
                width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="mx-5"
                    color="red lighten-2"
                    dark
                    outlined
                    v-bind="attrs"
                    v-on="on"
                ><v-icon>mdi-delete</v-icon>
                  Reject
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2">
                  Are you sure you want to reject this job?
                </v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="red lighten-2"
                      text
                      @click="removeJob(job._id)"
                  >
                    Reject
                  </v-btn>
                  <v-btn
                      class="mx-5"
                      color="primary"
                      text
                      @click="dialog = false"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
    <v-snackbar top v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false" :loading="loading"
        >Close</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from "moment";

export default {
  name: "ProfileJobs",
  data(){
    return{
      snackbar: false,
      loading: false,
      text: '',
      Done: '#3cd150',
      Pending: '#ffaa2c',
      dialog: false
    }
  },
  methods:{
    ...mapActions(["fetchUserJobs", "rejectJob"]),
    viewJob(jobId){
      console.log(jobId)
      this.$router.push(`/job/${jobId}`)
    },
    async removeJob(jobId){
      try {
        const job = {
          job: jobId,
          user: this.getProfile._id
        }
        // const response = await this.rejectJob(jobId, this.getProfile._id)
        const response = await this.rejectJob(job)
        this.dialog = false
        if(response !== 200){
          this.loading = false
          this.snackbar = true
          this.text = response.data
          return;
        }
        this.loading = false
        this.snackbar = true
        this.text = "Removed from the job"
        await this.fetchUserJobs(this.getUserData.id)
      }catch (error){
        console.log(error)
      }
    },
    async getData(){
      await this.fetchUserJobs(this.getUserData.id)
    }
  },
  async created() {
    await this.getData()
  },
  computed:{
    ...mapGetters(["getUserJobs", "getProfile", "getUserData"])
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
