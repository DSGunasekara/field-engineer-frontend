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
<!--              <v-col cols="12">-->
<!--                <v-text-field v-model="date" label="Date" type="datetime-local"></v-text-field>-->
<!--              </v-col>-->
              <!--              <v-col cols="12">-->
              <!--                <v-text-field v-model="startTime" label="Start Time" type="time"></v-text-field>-->
              <!--              </v-col>-->
              <v-col cols="12">
                <v-text-field v-model="category" label="Category" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="qty" label="Quantity" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="location" label="Location"></v-text-field>
              </v-col>
<!--              <v-col cols="12">-->
<!--                <v-text-field v-model="lconName" label="Customer Name"></v-text-field>-->
<!--              </v-col>-->
<!--              <v-col cols="12">-->
<!--                <v-text-field v-model="lconContactNo" label="Customer Contact No"></v-text-field>-->
<!--              </v-col>-->
<!--              <v-col cols="12" md="6">-->
<!--                <v-text-field v-model="rate" label="Rate per Hour"></v-text-field>-->
<!--              </v-col>-->
<!--              <v-col cols="12" md="6">-->
<!--                <v-text-field v-model="requiredEngineers" label="Required no of engineers"></v-text-field>-->
<!--              </v-col>-->
              <!-- <v-col cols="12">
                <v-select
                  :menu-props="{ offsetY: true }"
                  :items="items"
                  label="Select Engineers to assign"
                  multiple
                ></v-select>
              </v-col> -->
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
import {mapActions} from 'vuex';

export default {
name: "AddItem",
  data: () => ({
    dialog: false,
    itemName: '',
    category: '',
    qty: '',
    location: ''
  }),
  methods:{
  ...mapActions(["addItem"]),
    async submit(){
      const item = {
        itemName: this.itemName,
        category: this.category,
        qty: this.qty,
        allocatedQty: 0,
        inventoryLocation: this.location
      }
      try {
        const response = await this.addItem(item)
        if(response !== 200){
          return
        }
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