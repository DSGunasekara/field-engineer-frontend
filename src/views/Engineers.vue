<template>
  <v-container class="my-5">
    <h1 class="subheading teal--text">Engineers</h1>
<!--    <div v-if="loading == true">-->
<!--      <v-progress-circular indeterminate color="primary"></v-progress-circular>-->
<!--    </div>-->
    <div class="search-wrapper">
      <v-text-field type="text" v-model="search" placeholder="Search Engineers"/>
    </div>
    <v-layout row wrap v-if="filteredList.length !== 0">
      <v-flex
        xs12
        sm6
        md4
        lg3
        v-for="(engineer, index) in filteredList"
        :key="index"
      >
        <v-card text class="ma-3">
          <v-responsive class="pt-4 mx-4">
            <v-avatar center size="100" class="grey lighten-2">
              <img src="../assets/profile.jpg"  alt="profile"/>
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">
              {{ engineer.name }}
            </div>
            <div class="grey--text">
              <v-icon small left>mdi-map-marker</v-icon>
              {{ `${engineer.state}, ${engineer.country}` }}
            </div>
            <div class="grey--text">
              <v-icon small left>mdi-star</v-icon>
              {{ engineer.rate }}
            </div>
            <div :class="`${engineer.availability} `">
              <v-icon v-if="engineer.availability === true" small left
                >mdi-check</v-icon
              >
              <v-icon v-else small left>mdi-window-close</v-icon>
              {{
                engineer.availability === true ? "Available" : "Not Available"
              }}
            </div>
          </v-card-text>
          <v-card-actions>
            <div v-if="getProfile">
<!--              <v-btn v-if="getProfile.role === 'Admin'" outlined color="red" @click="deleteEngineer(engineer._id)">-->
<!--                <v-icon small left>mdi-delete</v-icon>-->
<!--                <span class="">Remove</span>-->
<!--              </v-btn>-->
              <div class="text-center">
                <v-dialog
                    v-model="dialog"
                    width="600"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-if="getProfile.role === 'Admin'"
                        class="mx-5"
                        color="red lighten-2"
                        dark
                        outlined
                        v-bind="attrs"
                        v-on="on"
                    ><v-icon>mdi-delete</v-icon>
                      Remove
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="headline grey lighten-2">
                      Are you sure you want to remove this engineer?
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="red lighten-2"
                          text
                          @click="deleteEngineer(engineer._id)"
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
              <v-rating
                  @input="addRating($event, engineer._id)"
                  v-model="engineer.rate"
              ></v-rating>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Engineers",
  data() {
    return {
      loading: true,
      search: '',
      dialog: false
    };
  },
  methods: {
    ...mapActions(["fetchEngineers", "getUser", "removeEngineer", "updateUser"]),
    async deleteEngineer(engineerId){
      try {
        await this.removeEngineer(engineerId)
      }catch (error){
        console.log(error)
      }
    },
    async addRating(value, id) {
      const user = {
        id: id,
        rate: value
      }
      await this.updateUser(user)
    },
  },
  computed: {
    ...mapGetters(["allEngineers", "getProfile"]),
    filteredList() {
      return this.allEngineers.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  async created() {
    try {
      await this.fetchEngineers()
      await this.getUser()
      this.loading = false;
    }catch (error){
      console.log(error)
    }
  },
};
</script>

<style>
/*.true {*/
/*  color: #00c853;*/
/*}*/
/*.false {*/
/*  color: #e53935;*/
/*}*/
</style>
