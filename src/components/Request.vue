<template>
  <div>
    <div v-if="getRole ==='Admin'">
      <AdminRequest/>
    </div>
    <div v-if="getRole !=='Admin'">
      <EngineerRequests/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AdminRequest from "@/components/Admin/AdminRequest";
import EngineerRequests from "@/components/Engineers/EngineerRequests";

export default {
name: "Request",
  components:{
    AdminRequest,
    EngineerRequests
  },
  computed: {
    ...mapGetters(["getProfile"]),
    getRole(){
      return this.getProfile.role
    }
  }
}
</script>

<style scoped>

</style>