<template>
  <div class="linkexchange-wrapper">
    <linkexchange-link id="linkexchange"
      size="rectangle"
      type="text"
      recipient-address="0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
      asset="ethereum"
      widget-title="SotD"
      till-date="6/2/2018"
      description="I accept only links that are about science and technology."
      impression="N/A"
      contact-method="email"
      algorithm="links">
    </linkexchange-link>
    <script src="https://cdn.jsdelivr.net/npm/@linkexchange/widgets@stable"></script>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  @import '~assets/css/settings';

  .linkexchange-wrapper {
    width: 100% !important;
    height: 100% !important;
    border: 1px solid $color--mine-shaft;
  }

  #linkexchange {
    width: 100% !important;
    height: 100% !important;
  }

  #linkexchange * {
    color: $color--mine-shaft !important;
  }

  #linkexchange [class*="banner__self"] {
    border: none !important;
  }

  #linkexchange [class*="banner__info"] {
    margin-top: 5px !important;
    font-size: .8rem !important;
  }

  #linkexchange [class*="banner__arrows"] {
    position: absolute !important;
    left: 50% !important;
    margin-left: -10px !important;
  }

  #linkexchange [class*="banner__arrow"] {
    font-size: 1rem !important;
  }

  #linkexchange [class*="banner__container"] {
    height: 100% !important;
    background: url('~/assets/images/bg.jpg') center center !important;
    background-size: 100px 100px !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
  }

  #linkexchange [class*="banner__options"] {
    background: url('~/assets/images/bg.jpg') center center !important;
    background-size: 100px 100px !important;
    box-shadow: none !important;
    align-items: center !important;
    padding: 0 10px !important;
    width: calc(100% - 20px) !important;
  }

  #linkexchange [class*="banner__probability"] {
    font-size: .8rem !important;
    text-transform: uppercase !important;
    font-weight: 600 !important;
    position: relative !important;
    top: -2px !important;
  }

  #linkexchange [class*="banner__rectangle"] {
    width: 100% !important;
    height: 100% !important;
  }

  #linkexchange [class*="menu__self"] {
    position: absolute !important;
    right: 0 !important;
    margin-right: 10px !important;
    margin-bottom: 0 !important;
    letter-spacing: 0 !important;
    font-size: .8rem !important;
  }
</style>
