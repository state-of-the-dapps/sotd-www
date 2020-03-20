<template>
  <div class="page">
    <section class="section">
      <div class="text-container">
        <h1>About</h1>
        <p class="intro">State of the DApps is a not-for-profit curated directory of Decentralized Applications, also called DApps, which run on various several blockchains.
        State of the DApps was initially created to categorize and showcase developed projects built on the <a
          href="https://ethereum.org/"
          target="_blank"
          rel="noopener">Ethereum</a> Blockchain, but more recently we have added support for
          <a
            href="https://eos.io/"
            target="_blank"
            rel="noopener">EOS</a>,
          <a
            href="https://steem.com/"
            target="_blank"
            rel="noopener">Steem</a> and
          <a
            href="https://hive.io/"
            target="_blank"
            rel="noopener">Hive</a>.</p>
        <p>The inspiration for State of the DApps came from FreshMeat now known as <a
          href="http://freecode.com/"
          target="_blank"
          rel="noopener">FreeCode</a> which was a site reference for Linux users, which had a big inventory of the open source applications, games and all sources for Linux.</p>
        <p>In State of the DApps there are many projects covering different fields such as health, Ponzi schemes, games, virtual reality, artificial intelligence, education, registries, job markets, tinder for horses and many more. The directory has become one of the biggest reference for the Ethereum ecosystem, we are referred to in talks, workshops, meetups; <a
          href="https://twitter.com/VitalikButerin"
          target="_blank"
          rel="noopener">Vitalik Buterin</a> included uses State of the DApps.</p>
        <p>We already have a really wonderful team contributing to the growth of the project, and our goal is to connect DApp creators and users.</p>
        <p>State of the DApps is a privately funded and independent project. We are open to collaboration with others when it is a good match for both parties, but what makes us successful is our autonomy &amp; objectivity.</p>
        <p>Watch our video presentation of the project: <a
          href="https://youtu.be/iqBNPh5IMqM"
          target="_blank"
          rel="noopener">https://youtu.be/iqBNPh5IMqM</a></p>
        <p>And remember... smart contracts are neither smart, nor contracts!</p>
        <br>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'State of the DApps — About'
    }
  }
}
</script>

<style lang="scss" scoped>
.text-container {
  @include text-container;
}
</style>
