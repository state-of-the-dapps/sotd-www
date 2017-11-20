<template>
  <div>
    <IntroSection/>
    <SubmitForm/>
  </div>
</template>

<script>
  import IntroSection from '~/components/sections/submit/Intro'
  import SubmitForm from '~/components/sections/submit/SubmitForm'

  export default {
    components: {
      IntroSection,
      SubmitForm
    },
    head () {
      return {
        title: 'State of the ÐApps — Submit a ÐApp'
      }
    }
  }
</script>
