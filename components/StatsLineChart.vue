<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data () {
    return {
      datacollection: {
        labels: ['Charity', 'Energy', 'Exchanges', 'Finance', 'Games'],
        datasets: [
          {
            label: '',
            backgroundColor: '#9cc67e',
            data: [40, 20, 20, 30, 90]
          }
        ]
      }
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.datacollection, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontFamily: 'Overpass',
            fontSize: 13
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontFamily: 'Overpass',
            fontSize: 15
          }
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      hover: {
        mode: null
      }
    })
  }
}
</script>
