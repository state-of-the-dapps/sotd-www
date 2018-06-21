<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    var gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 600)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(0.1, '#acff84')
    gradient.addColorStop(0.99, '#98e3ff')
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['2015', '2016'],
      datasets: [
        {
          label: '2016',
          backgroundColor: gradient,
          data: [25, 50, 30, 29, 10]
        },
        {
          label: '2015',
          backgroundColor: gradient,
          data: [609, 199, 324, 129, 82]
        }
      ]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          gridLines: {
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
