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
      <v-card text v-for="(request, index) in getUserReqs" :key="index" style="margin-top: 15px">
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

          <v-flex xs6 sm4 md1 v-if="request.status !== 'Approved'">
<!--            <v-btn outlined color="red" @click="removeReq(request._id)"-->
<!--            ><v-icon>mdi-delete</v-icon></v-btn-->
<!--            >-->
            <div class="text-center">
              <v-dialog
                  v-model="dialog"
                  width="550"
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
                    Are you sure you want to delete this request?
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red lighten-2"
                        text
                        @click="removeReq(request._id)"
                    >
                      Delete
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
name: "EngineerRequests",
  data(){
    return{
      dialog: false
    }
  },
  methods:{
    ...mapActions(["fetchRequests", "deleteRequest"]),
    async removeReq(id){
      try {
        await this.deleteRequest(id)
      }catch (error){
        console.log(error)
      }
    }
  },
  computed:{
    ...mapGetters(["allRequests", "getProfile"]),
    getUserReqs(){
      return this.allRequests.filter(req=> req.requestedUser._id === this.getProfile._id)
    }
  },
  async created() {
    await this.fetchRequests()
  }
}
</script>

<style scoped>

</style>
