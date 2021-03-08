<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey" text dark v-bind="attrs" v-on="on" class="my-5"> <v-icon>mdi-plus-circle</v-icon> Add a job </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create a Job</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="title" label="Job Title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="date" label="Date" type="datetime-local"></v-text-field>
              </v-col>
<!--              <v-col cols="12">-->
<!--                <v-text-field v-model="startTime" label="Start Time" type="time"></v-text-field>-->
<!--              </v-col>-->
              <v-col cols="12">
                <v-text-field v-model="location" label="Location"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="description" label="Description" required></v-text-field>
              </v-col>
<!--              <v-col cols="12">-->
<!--                <v-text-field v-model="lconName" label="Customer Name"></v-text-field>-->
<!--              </v-col>-->
<!--              <v-col cols="12">-->
<!--                <v-text-field v-model="lconContactNo" label="Customer Contact No"></v-text-field>-->
<!--              </v-col>-->
              <v-col cols="12" md="6">
                <v-text-field v-model="rate" label="Rate per Hour"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="requiredEngineers" label="Required no of engineers"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  required
                  :menu-props="{ offsetY: true }"
                  :items="cusNames"
                  label="Select customer to assign"
                  v-model="customer"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar top v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false" :loading="loading"
        >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "AddJob",
  data: () => ({
    dialog: false,
    // selectItems: null
    title: '',
    date:'',
    // startTime: '',
    location: '',
    description:'',
    lconName:'',
    lconContactNo:'',
    rate:'',
    requiredEngineers:'',
    cusNames: [],
    customer:'',
    snackbar: false,
    loading: false,
    text: '',
    note: '',
    msgColor: '',
  }),
  methods: {
    ...mapActions(["addJob", "fetchCustomers"]),
    async submit(){
      console.log(this.addJob);
      let selectedCus = this.getCustomers.filter(cus=> cus.name === this.customer)[0]
      const job = {
        title: this.title,
        date: this.date,
        // startTime: this.startTime,
        location: this.location,
        description: this.description,
        lconName: selectedCus.name,
        lconContactNo: selectedCus.contactNo,
        rate: this.rate,
        requiredEngineers: this.requiredEngineers,
        status: 'Pending',
        customer: selectedCus._id
      }
      console.log(job)
      try {
        const response = await this.addJob(job);
        this.responseMsg(response, "Job created")
        this.dialog = false
      }catch (error){
        console.log(error)
      }
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
  computed:{
    ...mapGetters(["getCustomers"])
  },
  async created() {
    await this.fetchCustomers()
    this.getCustomers.map(customer => this.cusNames.push(customer.name))
  }
};
</script>
