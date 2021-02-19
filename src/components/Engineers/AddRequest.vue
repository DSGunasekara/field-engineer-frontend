<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey" text dark v-bind="attrs" v-on="on" class="my-3"> <v-icon>mdi-cart-arrow-down</v-icon> Request </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Request an Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="itemName" label="Item" disabled></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="requiredDate" label="Date"
                              type="datetime-local"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                    v-model="job"
                    :items="jobs"
                    label="Select the Job"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="qty" label="Quantity" type="number" required
                    min="0"
                    v-bind:max="item.qty"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="note" label="Description"></v-text-field>
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
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
name: "AddRequest",
  props: ['item'],
  data:()=>({
    dialog: false,
    itemName: '',
    requiredDate: '',
    jobs: [],
    job: '',
    qty: '',
    note: '',
  }),
  methods:{
    ...mapActions(['fetchUserJobs', 'addRequest']),
    async submit(){
      const job = this.getUserJobs.jobHistory.filter(job=> job.title === this.job)[0]
      const request = {
        item: this.item._id,
        requestedUser: this.getProfile._id,
        requiredDate: this.requiredDate,
        job: job._id,
        qty: this.qty,
        note: this.note
      }
      const res = await this.addRequest(request)
      if(res !== 200){
        return
      }
      this.dialog = false
      this.itemName = ''
      this.requiredDate = ''
      this.job = ''
      this.qty = ''
      this.note = ''
    }
  },
  computed:{
    ...mapGetters(["getUserJobs", "getProfile"]),
  },
  async created() {
    this.itemName = this.item.itemName
    await this.fetchUserJobs(this.getProfile._id)

    this.getUserJobs.jobHistory.filter(job=> this.jobs.push(job.title))
  }
}
</script>

<style scoped>

</style>