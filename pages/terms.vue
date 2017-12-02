<template>
  <div>
    <section class="section">
      <div class="text-container">
        <h1 class="heading">Terms of Use</h1>
        <div v-html="content.body"></div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    computed: {
      content () {
        return {
          body: ''
        }
      }
    },
    head () {
      return {
        title: 'State of the ÐApps — Terms of Use'
      }
    }
  }
</script>
