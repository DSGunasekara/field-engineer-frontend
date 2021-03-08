<template>
  <nav>
    <v-toolbar flat>
      <v-app-bar-nav-icon
        class="grey--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title style="color: #43576D; text-shadow: 1px 1px #43576D">
        FE Manager
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <h3 v-if="getProfile" class="mx-10 overline" style="color: teal">Hello, {{ getProfile.name }}</h3>
       <Logout v-if="isLoggedIn"/>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      dark
      absolute
      temporary
      class="navColor"
    >
      <v-list class="my-2">
        <v-list-item
          v-for="link in getLinks"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <v-list-item-content>
              {{ link.text }}
            </v-list-item-content>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>

</template>

<script>
import { mapGetters } from "vuex";
import Logout from '../Logout'


export default {
  name: "Navbar",
  components:{
    Logout,
  },
  methods: {

  },
  data() {
    return {
      drawer: null,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-account", text: "Profile", route: "/profile" },
        { icon: "mdi-folder", text: "Jobs", route: "/jobs" },
        { icon: "mdi-account-group", text: "Engineers", route: "/engineers" },
        { icon: "mdi-store", text: "Inventory", route: "/inventory" },
        { icon: "mdi-message-processing", text: "Requests", route: "/requests" },
      ],
    };
  },
  computed:{
    ...mapGetters(["isLoggedIn", "getProfile"]),
    getLinks(){
      if(!this.getProfile){
        return this.links
      } else if (this.getProfile.role === "Admin"){
        return this.links;
      }else if (this.getProfile.role === "Customer") {
        return this.links.filter(link=> link.text === "Profile");
      }else{
        return this.links.filter(link=> link.text !== "Engineers")
      }
    }
  }
};
</script>

<style scoped>
.v-navigation-drawer.navColor {
  background-color: #43576D;
}
</style>
