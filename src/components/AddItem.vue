<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey" text dark v-bind="attrs" v-on="on" class="my-5"> <v-icon>mdi-plus-circle</v-icon> Add Item</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add an Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="itemName" label="Item" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="category" label="Category" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="price" label="Serial Number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="qty" label="Quantity" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="location" label="Location"></v-text-field>
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
import {mapActions} from 'vuex';

export default {
name: "AddItem",
  data: () => ({
    dialog: false,
    itemName: '',
    category: '',
    qty: '',
    price: '',
    location: '',
    snackbar: false,
    loading: false,
    text: '',
    note: '',
    msgColor: '',
  }),
  methods:{
  ...mapActions(["addItem"]),
    async submit(){
      const item = {
        itemName: this.itemName,
        category: this.category,
        qty: this.qty,
        price: this.price,
        inventoryLocation: this.location
      }
      try {
        const response = await this.addItem(item)
        this.responseMsg(response, "Item created")
        this.dialog = false
        this.itemName = ''
        this.category = ''
        this.qty = ''
        this.price = ''
        this.location = ''
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
  }
}
</script>

<style scoped>

</style>
