<template>
  <!-- FIXME:Date need to fixed -->
  <div class="dashboard">
    <v-container class="my-5">
      <h1 class="subheading teal--text">Requests</h1>
      <!-- TODO: make this a modal  -->
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon small left>mdi-folder</v-icon>
              <span class="caption text-lowercase">By project name</span>
            </v-btn>
          </template>
          <span>Sort by project name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('due')" v-on="on">
              <v-icon small left>mdi-account-group</v-icon>
              <span class="caption text-lowercase">By Person</span>
            </v-btn>
          </template>
          <span>Sort by project author</span>
        </v-tooltip>
      </v-layout>
      <v-card text v-for="(request, index) in allRequests" :key="index" style="margin-top: 15px">
        <v-layout row wrap :class="`pa-3 project ml-2`">
          <v-flex xs12 md2>
            <div class="caption grey--text">Item</div>
            <div>{{ request.item.itemName }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">User</div>
            <div>{{ request.requestedUser.name }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Job</div>
            <div>{{ request.job.title }}</div>
          </v-flex>

          <v-flex xs6 sm4 md1>
            <div class="caption grey--text">Quantity</div>
            <div>{{ request.qty}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Available Quantity</div>
            <div>{{ request.item.qty }}</div>
          </v-flex>
          <v-flex xs6 sm4 md1>
            <div class="caption grey--text">Status</div>
            <div>{{ request.status }}</div>
          </v-flex>

          <v-flex xs6 sm4 md1>
            <v-btn outlined color="green" @click="approve(request._id)"
            ><v-icon>mdi-check</v-icon></v-btn
            >
          </v-flex>
          <v-flex xs6 sm4 md1>
            <v-btn outlined color="red" @click="reject(request._id)"
            ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-flex>

        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
name: "AdminRequest",
  data:()=>({

}),
  methods:{
    ...mapActions(["fetchRequests", "updateRequest"]),
    async approve(id){
      try {
        const request = {
          _id: id,
          status: "Approved"
        }
        const res = await this.updateRequest(request)
        if(res !== 200){
          return
        }else {
          await this.fetchRequests()
          return
        }
      }catch (error){
        console.log(error)
      }
    },
    async reject(id){
      try {
        const request = {
          _id: id,
          status: "Rejected"
        }
        const res = await this.updateRequest(request)
        if(res !== 200){
          return
        }else {
          await this.fetchRequests()
          return
        }
      }catch (error){
        console.log(error)
      }
    }
  },
  computed:{
    ...mapGetters(["allRequests"])
  },
  async created() {
    await this.fetchRequests()
  }
}
</script>

<style scoped>

</style>