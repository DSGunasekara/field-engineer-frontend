<template>
  <!-- FIXME:Date need to fixed -->
  <div class="dashboard">
    <v-container class="my-5">
      <h1 class="subheading teal--text">Inventory</h1>
      <AddItem v-if="getRole === 'Admin'"/>
      <!-- TODO: make this a modal  -->
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon small left>mdi-folder</v-icon>
              <span class="caption text-lowercase">By project name</span>
            </v-btn>
          </template>
          <span>Sort by project name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('due')" v-on="on">
              <v-icon small left>mdi-account-group</v-icon>
              <span class="caption text-lowercase">By Person</span>
            </v-btn>
          </template>
          <span>Sort by project author</span>
        </v-tooltip>
      </v-layout>
<!--      Search    -->
      <div class="search-wrapper">
        <v-text-field type="text" v-model="search" placeholder="Search by Serial Number or Item Name"/>
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
            <v-btn outlined color="red" @click="deleteItem(item._id)"
            ><v-icon>mdi-delete</v-icon> Delete</v-btn
            >
          </v-flex>
          <v-flex xs6 sm4 md1 v-if="getRole === 'Admin'">
            <UpdateInventory v-bind:item="item"/>
          </v-flex>

        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
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
      search: ''
    }
  },
  methods:{
    ...mapActions(["fetchItems", "removeItem"]),
    async deleteItem(itemId){
      try{
        await this.removeItem(itemId)
      }catch (error){
        console.log(error)
      }
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
      return this.allItems.filter(item => item.price.toLowerCase().includes(this.search.toLowerCase()) || item.itemName.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  async created(){
    await this.fetchItems()
  }
}
</script>

<style scoped>

</style>
