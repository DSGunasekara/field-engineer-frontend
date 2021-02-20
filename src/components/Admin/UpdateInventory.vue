<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey" text dark v-bind="attrs" v-on="on" class="my-3"> <v-icon>mdi-file-edit-outline</v-icon> Update</v-btn>
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
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
name: "UpdateInventory",
  props:["item"],
  data: () => ({
    dialog: false,
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
        await this.updateItem(item)
        this.dialog = false
      }catch (error){
        console.log(error)
      }


    }
  }
}
</script>

<style scoped>

</style>