<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props:['nos'],
  data () {
    return {
      chartData: {
        labels: ["January",	"February",	"March",	"April",	"May",	"June",	"July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: 'Completed Jobs',
            data: this.nos,
            fill: false,
            borderColor: 'teal',
            backgroundColor: 'teal',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
