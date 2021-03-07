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
            <v-btn outlined color="red" class="mx-1" @click="removeJob(job._id)"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
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
      Pending: '#ffaa2c'
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
       await this.deleteJob(id);
      }catch (error){
        console.log(error)
      }
    },
    viewJob(jobId){
      this.$router.push(`/job/${jobId}`)
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
