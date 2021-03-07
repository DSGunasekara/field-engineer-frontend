<template>
 <div class="container">
   <v-row>
     <v-col>
       <v-date-picker
           v-model="picker"
           type="month"
       ></v-date-picker>
     </v-col>
     <v-col>
       <h2 style="color: #43576D">Engineer Reports</h2>
       <h2 class="subtitle-1">Select the month and then download the report</h2>
       <br>
       <v-btn @click="downEng"><v-icon class="mx-2">mdi-cloud-download-outline</v-icon>{{ picker + " " }}Report Download</v-btn>
       <h2 style="color: #43576D">Inventory Reports</h2>
       <h2 class="subtitle-1">Select the month and then download the report</h2>
       <br>
       <v-btn @click="downInventory"><v-icon class="mx-2">mdi-cloud-download-outline</v-icon>{{ picker + " " }}Report Download</v-btn>
     </v-col>
   </v-row>
 </div>
</template>

<script>
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { mapActions, mapGetters } from 'vuex'
import moment from "moment";

export default {
name: "Reports",
  data(){
    return{
      picker: new Date().toISOString().substr(0, 7),
    }
  },
  methods:{
  ...mapActions(['fetchEngineers', 'fetchRequests']),
    downEng(){
    let data = this.allEngineers.map((item)=>{
      let newDate = this.picker
      return [
          item.name,
          item.jobHistory.filter(job => job.date.substr(0, 7) === newDate.substr(0, 7)).length,
          item.jobHistory.filter(job => job.status === "Done" & job.date.substr(0, 7) === newDate.substr(0, 7)).length,
          item.jobHistory.filter(job => job.status === "Pending" & job.date.substr(0, 7) === newDate.substr(0, 7)).length
      ]
    })
    let doc = new jsPDF('l', 'mm', [305, 250]);
    doc.text('FE Manger Platform', 35, 10);
    // doc.text('-----------------------------------------', 35, 15)
    doc.text(
        `Engineer Activity Report ${new Date().toISOString().substr(0, 7) }`,
        35,
        20
    );

    // let img = new Image();
    // img.src = 'assets/images/logo.png';
    // doc.addImage(img, 10, 5, 20, 20);

    autoTable(doc, {
      head: [
        [
          "Engineer",
          "No Of Total Jobs",
          "No of Pending Jobs",
          "No Of Completed Jobs",
        ],
      ],
      body: data,
      margin: { top: 40 },
    })
    doc.save(
        `Engineer Report-${this.picker}`);
    },
    downInventory(){
      let data = this.acceptedReqs.map((item)=>{
        return [
            item.item.price,
            item.item.itemName,
            item.qty,
            item.job.title,
            item.requestedUser._id,
            item.requestedUser.name
        ]
      })
      let doc = new jsPDF('l', 'mm', [305, 250]);
      doc.text('FE Manger Platform', 35, 10);
      // doc.text('-----------------------------------------', 35, 15)
      doc.text(
          `Inventory Report ${new Date().toISOString().substr(0,7) }`,
          35,
          20
      );

      // let img = new Image();
      // img.src = 'assets/images/logo.png';
      // doc.addImage(img, 10, 5, 20, 20);

      autoTable(doc, {
        head: [
          [
            "Serial Number",
            "Item",
            "Quantity",
            "Job Id",
            "Engineer Id",
            "Engineer Name"
          ],
        ],
        body: data,
        margin: { top: 40 },
      })
      doc.save(
          `Inventory Report-${this.picker} `);
    }
  },
  computed:{
    ...mapGetters(['allEngineers', 'allRequests']),
    acceptedReqs(){
      return this.allRequests.filter(item => item.status === "Approved" & item.requiredDate.substr(0, 7) === this.picker.substr(0, 7))
    }
  },
  async mounted() {
    await this.fetchEngineers()
    await this.fetchRequests()
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMM D YYYY, h:mm a');
    }
  },
}
</script>

<style scoped>

</style>
