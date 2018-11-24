<template>
  <div class="component--collections-detail-lead">
    <h2 class="sub-heading">Collection</h2>
    <h1 class="heading">{{ name }}<span v-if="curator">, by {{ curator }}</span></h1>
    <p class="description">
      {{ description }}<span v-if="linkUrl && linkText">. <a 
        :href="linkUrl" 
        target="_blank" 
        rel="noopener noreferrer">{{ linkText }}</a></span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    curator: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    linkUrl: {
      type: String,
      default: ''
    },
    linkText: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.component--collections-detail-lead {
  padding: 0 20px;
  text-align: center;
  margin: 3rem 0 3.5rem 0;
}
.heading {
  font-size: 2rem;
  font-weight: 700;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.sub-heading {
  font-weight: 300;
  text-transform: uppercase;
  font-size: 1.1rem;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
}
.description {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}
</style>
