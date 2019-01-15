<template>
  <svg 
    :width="width" 
    :height="height" 
    class="IconCheckmark" 
    viewBox="0 0 100 125.02625">
    <path
      :class="fill"
      class="path"
      d="M51.438,0.021C23.834-0.773,0.814,20.96,0.021,48.563C0.007,49.049,0,49.535,0,50.021
	c0,27.614,22.386,50,50,50s50-22.386,50-50C100.012,22.958,78.488,0.799,51.438,0.021z M72.281,25.271l9.906,9.906L52.469,64.865
	l-9.906,9.906l-9.875-9.906L17.812,50.021l9.906-9.906l14.844,14.844L72.281,25.271z"/>
  </svg>
</template>

<script>
export default {
  props: {
    fill: {
      default: 'gray',
      type: String
    },
    height: {
      default: 20,
      type: Number
    },
    width: {
      default: 15,
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.path {
  transition: fill 0.2s ease;
}

.black {
  fill: $color--black;
}

.purple {
  fill: $color--medium-purple;
}

.gray {
  fill: darken($color--gray, 15%);
}

.white {
  fill: $color--white;
}
</style>
