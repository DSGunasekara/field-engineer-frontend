<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            plain
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Engineer</span>
<!--          {{ availableEngineers[0] }}-->
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-select
                    v-model="engineer"
                    :items=names
                    label="Available Engineers"
                    required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="joinJob"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar top v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="`${msgColor}`" text v-bind="attrs" @click="snackbar = false" :loading="loading">Close</v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
name: "AddEngToJob",
  props:["job"],
  data(){
    return{
      dialog: false,
      names: [],
      engineer: '',
      snackbar: false,
      loading: false,
      text: '',
      note: '',
      msgColor: ''
    }
  },
  methods:{
    ...mapActions(['fetchEngineers', 'acceptJob']),
    async joinJob(){
      let selectedEngineer = this.allEngineers.filter(engi => engi.name === this.engineer)
      const newJob = {
        id: this.job,
        engineer: selectedEngineer[0]._id
      }
      const res = await this.acceptJob(newJob)
      this.responseMsg(res, "Engineer added", "Engineer already added")
      this.dialog = false
      this.engineer = ''
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
    ...mapGetters(['allEngineers']),
  },
  async created() {
    try {
      await this.fetchEngineers()
      let engs = this.allEngineers.filter(engineer => engineer.availability === true)
      engs.filter(engineer => this.names.push(engineer.name))
    }catch (err){
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>
