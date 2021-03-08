<template>
  <!-- FIXME:Date need to fixed -->
  <div class="dashboard">
    <v-container class="my-5">
      <h1 class="subheading teal--text">Jobs</h1>
      <AddJob />
      <!-- TODO: make this a modal  -->
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon small left>mdi-folder</v-icon>
              <span class="caption text-lowercase">By Job Title</span>
            </v-btn>
          </template>
          <span>Sort by Job Title</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('date')" v-on="on">
              <v-icon small left>mdi-account-group</v-icon>
              <span class="caption text-lowercase">By Date</span>
            </v-btn>
          </template>
          <span>Sort by Date</span>
        </v-tooltip>
      </v-layout>

      <v-card text v-for="(job, index) in allJobs" :key="index" style="margin-top: 15px">
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
              <v-chip small :class="`${job.status} white--text my-2 caption`"  :color="`${job.status === 'Done'? Done: Pending}`">{{
                job.status
              }}</v-chip>
            </div>
          </v-flex>
          <v-flex xs6 sm4 md1>
            <UpdateJob class="mx-2 my-n2" v-bind:job="job" />
          </v-flex>
          <v-flex xs6 sm4 md1>
            <div class="text-center">
              <v-dialog
                  v-model="dialog"
                  width="500"
                  :retain-focus="false"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      class="mx-1"
                      color="red lighten-2"
                      dark
                      outlined
                      v-bind="attrs"
                      v-on="on"
                  ><v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2">
                    Are you sure you want to remove this job?
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red lighten-2"
                        text
                        @click="removeJob(job._id)"
                    >
                      Remove
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
          <v-flex xs6 sm4 md1>
            <v-btn outlined color="green" @click="viewJob(job._id)"
            ><v-icon>mdi-eye</v-icon></v-btn
            >
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
import { mapActions, mapGetters } from "vuex";
import moment from 'moment'

import AddJob from "../AddJob";
import UpdateJob from "../UpdateJob";

export default {
  name: "AdminJobs",
  components: {
    AddJob,
    UpdateJob,
  },
  data(){
    return {
      Done: '#3cd150',
      Pending: '#ffaa2c',
      dialog: false,
      snackbar: false,
      loading: false,
      text: '',
      note: '',
      msgColor: '',
    }
  },
  methods: {
    ...mapActions(["fetchJobs", "deleteJob"]),
    sortBy(prop) {
      //TODO: sorting need to updated
      this.allJobs = this.allJobs.sort((a, b) =>
        a[prop] < b[prop] ? -1 : 1
      );
    },
    async removeJob(id) {
      //TODO: create a modal to asking agree to delete
      try {
       const res = await this.deleteJob(id);
       this.responseMsg(res, "Job deleted")
       this.dialog = false
      }catch (error){
        console.log(error)
      }
    },
    viewJob(jobId){
      this.$router.push(`/job/${jobId}`)
    },
    responseMsg(response, ok, er){
      er = er || "An error occurred"
      this.snackbar = true
      if(response !== 200){
        this.text = er
        this.msgColor = "pink"
        return
      }
      this.text = ok
      this.msgColor = "green"
    }
  },
  computed: {
    ...mapGetters(["allJobs", "getProfile"]),
    role() {
      //FIXME: adding must be restricted
      return this.getProfile.role;
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMM D YYYY, h:mm a');
    }
  },
  async created() {
    try {
      const response = await this.fetchJobs();
      if(response === 200){
        this.loading = false;
      }
    }catch (error){
      console.log(error)
    }
  },
};
</script>

<style>
.project.Assigned {
  border-left: 4px solid #3cd1c2;
}
.project.Done {
  border-left: 4px solid #3cd150;
}
.project.Pending {
  border-left: 4px solid #ffaa2c;
}
.project.Reschedule {
  border-left: 4px solid #f83e70;
}
.v-chip.Assigned {
  background: #3cd1c2;
}
.v-chip.Done {
  background: #3cd150;
}
.v-chip.Pending {
  background: #ffaa2c;
}
.v-chip.Reschedule {
  background: #f83e70;
}
</style>
