<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey" text dark v-bind="attrs" v-on="on" class="my-3"> <v-icon>mdi-cloud-upload</v-icon> Upload Files </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Upload a file</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                    label="Upload File"
                    outlined
                    dense
                    v-model="file"
                ></v-file-input>
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
import {mapActions, mapGetters} from 'vuex'

export default {
name: "AddFiles",
  props:["id"],
  data:()=>({
    dialog: false,
    file: undefined,
    note: ''
  }),
  methods:{
  ...mapActions(["uploadImages"]),
    submit: async function () {
      try {
        let formData = new FormData()
        formData.append("jobImg", this.file, this.file.name)
        formData.append('id', this.id)
        formData.append('name', this.getProfile.name)
        formData.append('note', this.note)

        // const img = {
        //   id: this.id,
        //   jobImg: this.file,
        //   name: this.getProfile.name,
        //   note: this.note
        // }
        // console.log(formData.getAll('id'))
        await this.uploadImages(formData)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed:{
    ...mapGetters(["getProfile"])
  }
}
</script>

<style scoped>

</style>