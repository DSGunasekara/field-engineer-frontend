<template>
  <div class="container">
    <h1 class="subheading teal--text">Dashboard</h1>
    <v-row>
      <v-col>
        <PieChart/>
      </v-col>
      <v-col>
        <line-chart/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="font-weight-light">Pending Requests: 2</h2>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PieChart from "@/components/PieChart";
import LineChart from "@/components/LineChart";
export default {
name: "Dashboard",
  components: {LineChart, PieChart}
}
</script>

<style scoped>

</style>
