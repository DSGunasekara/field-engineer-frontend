<template class="app">
  <v-app>
    <Navbar />
    <v-main class="mx-4 mb-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Layouts/Navabar";
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
  methods:{
    ...mapActions(['fetchEngineers', 'fetchRequests', 'fetchJobs', 'fetchItems'])
  },
  async created() {
    await this.fetchEngineers()
    await this.fetchItems()
    await this.fetchJobs()
    await this.fetchRequests()
  }
};
</script>

<style scoped>
.app {
  background-color: #3cd1c2;
}
</style>
