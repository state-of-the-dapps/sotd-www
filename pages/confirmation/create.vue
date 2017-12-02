<template>
  <div>
    <section class="section">
      <div class="text-container">
        <h1 class="heading">Thanks for submitting! Your submission will be reviewed shortly by our digital cats, check your email for the status of your request.</h1>
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
        title: 'State of the ÐApps — Confirmation'
      }
    }
  }
</script>
