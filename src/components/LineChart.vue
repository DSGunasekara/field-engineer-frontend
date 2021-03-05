<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data () {
    return {
      chartData: {
        labels: ["January",	"February",	"March",	"April",	"May",	"June",	"July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: 'Completed Jobs',
            data: [3,	2,	5,	8,	4,	2,	6,	1,	9, 5, 7, 5, 3],
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
