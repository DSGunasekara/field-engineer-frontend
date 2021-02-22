<template>
  <v-container class="my-5">
    <h1 class="subheading grey--text">Engineers</h1>
    <!-- <div v-if="loading == true">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div> -->
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        md4
        lg3
        v-for="(engineer, index) in allEngineers"
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

            <v-btn v-if="getProfile.role === 'Admin'" outlined color="red" @click="deleteEngineer(engineer._id)">
              <v-icon small left>mdi-delete</v-icon>
              <span class="">Remove</span>
            </v-btn>
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
    };
  },
  methods: {
    ...mapActions(["fetchEngineers", "getUser", "removeEngineer"]),
    async deleteEngineer(engineerId){
      try {
        await this.removeEngineer(engineerId)
      }catch (error){
        console.log(error)
      }
  },
  },
  computed: {
    ...mapGetters(["allEngineers", "getProfile"]),
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
