<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn outlined color="blue" dark v-bind="attrs" v-on="on" class="my-3 mx-10"> <v-icon>mdi-file-edit-outline</v-icon> Update</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add an Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="item.itemName" label="Item" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="item.category" label="Category" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="item.qty" label="Quantity" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="item.price" label="Price" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="item.inventoryLocation" label="Location"></v-text-field>
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
import { mapActions } from 'vuex'
export default {
name: "UpdateInventory",
  props:["item"],
  data: () => ({
    dialog: false,
    snackbar: false,
    loading: false,
    text: '',
    note: '',
    msgColor: '',
  }),
  methods:{
    ...mapActions(["updateItem"]),
    async submit(){
      const item = {
        _id: this.item._id,
        itemName: this.item.itemName,
        category: this.item.category,
        qty: this.item.qty,
        price: this.item.price,
        inventoryLocation: this.item.inventoryLocation
      }
      try {
        const res = await this.updateItem(item)
        this.dialog = false
        this.responseMsg(res, "Updated the item")
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
