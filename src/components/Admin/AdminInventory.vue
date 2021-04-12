<template>
  <!-- FIXME:Date need to fixed -->
  <div class="dashboard">
    <v-container class="my-5">
      <h1 class="subheading teal--text">Inventory</h1>
      <AddItem v-if="getRole === 'Admin'"/>
      <!-- TODO: make this a modal  -->

<!--      Search    -->
      <div class="search-wrapper">
        <v-text-field type="text" v-model="search" placeholder="Search Items"/>
      </div>
      <v-card text v-for="(item, index) in filteredList" :key="index" style="margin-top: 15px">
        <v-layout row wrap :class="`pa-3 project ml-2`">
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Serial Number</div>
            <div> {{ item.price }}</div>
          </v-flex>
          <v-flex xs12 md2>
            <div class="caption grey--text">Item</div>
            <div>{{ item.itemName }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Category</div>
            <div>{{ item.category }}</div>
          </v-flex>

          <v-flex xs6 sm4 md1>
            <div class="caption grey--text">Quantity</div>
            <div>{{ item.qty}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Location</div>
            <div>{{ item.inventoryLocation }}</div>
          </v-flex>
          <v-flex xs6 sm4 md1 v-if="getRole !== 'Admin'">
            <AddRequest v-bind:item="item"/>
          </v-flex>

          <v-flex xs6 sm4 md1 v-if="getRole === 'Admin'">
<!--            <v-btn outlined color="red" @click="deleteItem(item._id)"-->
<!--            ><v-icon>mdi-delete</v-icon> Delete</v-btn-->
<!--            >-->
            <div class="text-center">
              <v-dialog
                  v-model="dialog"
                  width="500"
                  :retain-focus="false"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="red lighten-2"
                      dark
                      outlined
                      v-bind="attrs"
                      v-on="on"
                  ><v-icon>mdi-delete</v-icon>
                    Delete
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2">
                    Are you sure you want to delete this item?
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red lighten-2"
                        text
                        @click="deleteItem(item._id)"
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
          <v-flex xs6 sm4 md1 v-if="getRole === 'Admin'">
            <UpdateInventory v-bind:item="item"/>
          </v-flex>

        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
    <v-snackbar top v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="`${msgColor}`" text v-bind="attrs" @click="snackbar = false" :loading="loading">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddItem from "@/components/AddItem";
import AddRequest from "@/components/Engineers/AddRequest";
import UpdateInventory from "@/components/Admin/UpdateInventory";

export default {
  name: "AdminInventory",
  components:{
    AddItem,
    AddRequest,
    UpdateInventory
  },
  data(){
    return{
      search: '',
      snackbar: false,
      loading: false,
      text: '',
      msgColor:'',
      dialog: false
    }
  },
  methods:{
    ...mapActions(["fetchItems", "removeItem"]),
    async deleteItem(itemId){
      try{
        const res = await this.removeItem(itemId)
        this.responseMsg(res, "Item removed")
      }catch (error){
        console.log(error)
      }
    },
    responseMsg(response, ok){
      this.snackbar = true
      if(response !== 200){
        this.text = "An error occurred"
        this.msgColor = "pink"
      }
      this.text = ok
      this.msgColor = "green"
    }
  },
  computed:{
    ...mapGetters(["allItems", "getProfile"]),
    getRole(){
      if(!this.getProfile){
        return "Guest"
      }else{
        return this.getProfile.role
      }
    },
    filteredList() {
      return this.allItems.filter(item => item.price.toLowerCase().includes(this.search.toLowerCase()) || item.itemName.toLowerCase().includes(this.search.toLowerCase())
          || item.category.toLowerCase().includes(this.search.toLowerCase()) || item.inventoryLocation.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  async created(){
    await this.fetchItems()
  }
}
</script>

<style scoped>

</style>
