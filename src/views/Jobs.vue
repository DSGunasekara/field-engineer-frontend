
<template>
  <div class="container">
    <div v-if="getProfile.role === 'Admin'">
      <AdminJobs />
    </div>
    <div v-else>
      <EngineerJobs />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AdminJobs from "../components/Admin/AdminJobs";
import EngineerJobs from "../components/Engineers/EngineerJobs";

export default {
  components: {
    AdminJobs,
    EngineerJobs,
  },
  computed: {
    ...mapGetters(["getProfile"]),
  },
  methods:{
    ...mapActions(["getUser"])
  },
  async created() {
    try {
      await this.getUser()
    }catch (error){
      console.log(error)
    }
  }
};
</script>

<style>
</style>