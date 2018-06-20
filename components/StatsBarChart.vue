<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    var gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 600)
    gradient.addColorStop(0, '#acff84')
    gradient.addColorStop(1, '#98e3ff')
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Games (509)', 'Exchanges (199)', 'Finance (342)', 'Gambling (129)', 'Other (82)'],
      datasets: [
        {
          label: '',
          backgroundColor: gradient,
          data: [609, 199, 324, 129, 82]
        }
      ]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          display: false,
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
            color: '#333'
          },
          ticks: {
            fontFamily: 'Overpass',
            fontSize: 16,
            fontColor: '#333',
            autoSkip: false
          },
          barPercentage: 1.1
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
