<template>
  <v-container>
    <v-row>
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="blue" outlined dark v-bind="attrs" v-on="on" style="margin-top: 10px">
            <v-icon>mdi-file-edit-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Create a Job</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="job.title"
                    label="Job Title"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="job.date"
                    label="Date"
                    type="datetime-local"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="job.location"
                    label="Location"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="job.description"
                    label="Description"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="job.lconName"
                    label="Customer Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="job.lconContactNo"
                    label="Customer Contact No"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="job.rate"
                    label="Rate per Hour"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="job.requiredEngineers"
                    label="Required no of engineers"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelUpdate">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-snackbar top v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn :color="`${msgColor}`" text v-bind="attrs" @click="snackbar = false"
        >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UpdateJob",
  props: ["job"],
  data: () => ({
    dialog: false,
    snackbar: false,
    text: "",
    loading: false,
    msgColor: ''
  }),
  methods: {
    ...mapActions(["updateJob", "fetchJobs"]),
    async submit() {
      const job = {
        id: this.job._id,
        title: this.job.title,
        date: this.job.date,
        location: this.job.location,
        description: this.job.description,
        lconName: this.job.lconName,
        lconContactNo: this.job.lconContactNo,
        rate: this.job.rate,
        requiredEngineers: this.job.requiredEngineers,
      };
      try {
        const response = await this.updateJob(job);
        this.loading = true
        if(response !== 200){
          this.snackbar = true
          this.text = "An Error occurred"
          this.msgColor = "pink"
          return;
        }
        this.dialog = false
        this.snackbar = true
        this.text = "Updated successfully"
        this.msgColor = "green"
      }catch (error){
        console.log(error)
      }
    },
    async cancelUpdate() {
      try {
        const response = await this.fetchJobs();
        if( response !== 200){
          this.dialog = false;
          return
        }
        this.dialog = false;
      }catch (error){
        console.log(error)
      }
    },
  },
};
</script>
