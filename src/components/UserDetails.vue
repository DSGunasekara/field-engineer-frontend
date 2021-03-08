<template>
  <v-card>
    <v-list-item>
      <v-list-item-content class="grey--text headline ma-2">
        <div v-if="getProfile !== null">
          <v-list-item-title class="headline ma-2">
            <v-icon>mdi-account</v-icon>
            {{ getProfile.name }}
            <span justify>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    outlined
                    color="blue"
                    v-on="on"
                    router
                    :to="'/updateProfile'"
                  >
                    <v-icon>mdi-account-edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit your profile</span>
              </v-tooltip>
            </span>
          </v-list-item-title>
          <v-list-item-title class="ma-2">
            <v-icon>mdi-email</v-icon>
            {{ getProfile.email }}
          </v-list-item-title>
          <v-list-item-title class="ma-2">
            <v-icon>mdi-passport</v-icon>
            {{ getProfile.passportNo }}
          </v-list-item-title>
          <v-list-item-title class="ma-2">
            <v-icon>mdi-cellphone</v-icon>
            {{ getProfile.contactNo }}
          </v-list-item-title>
          <v-list-item-title class="ma-2">
            <v-icon>mdi-map-marker</v-icon>
            {{ getProfile.state }}, {{ getProfile.country }}
          </v-list-item-title>
          <v-list-item-title class="ma-2">
            <v-icon>mdi-briefcase</v-icon>
            {{ getProfile.role }}
          </v-list-item-title>
          <v-list-item-title class="ma-2" v-if="getProfile.role !== 'Customer'">
            <v-icon v-if="getProfile.availability === true" small left
            >mdi-check</v-icon
            >
            <v-icon v-else small left>mdi-window-close</v-icon>
            {{
              getProfile.availability === true ? "Available" : "Not Available"
            }}
            <v-btn outlined x-small class="mx-3" @click="updateStatus">change status</v-btn>
          </v-list-item-title>
          <v-list-item-title class="ma-2" v-if="getProfile.role === 'Engineer'">
            <v-rating
                readonly
                v-model="getProfile.rate"
            ></v-rating>
          </v-list-item-title>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserDetails",
  methods: {
    ...mapActions(["getUser", "updateUser"]),
    async updateStatus(){
      const user = {
        id: this.getProfile._id,
        availability: !this.getProfile.availability
      }
      console.log(user)
      const res = await this.updateUser(user)
      console.log(res)
    }
  },
  computed: {
    ...mapGetters(["getProfile"]),

  },
  async created() {
    try {
      await this.getUser()
    }catch (error){
      console.log(error)
    }
  },
};
</script>

<style>
</style>
