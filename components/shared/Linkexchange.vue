<template>
  <div class="linkexchange-wrapper">
    <linkexchange-link
      id="linkexchange"
      :recipient-address="recipientAddress"
      :whitelist="whitelist"
      :till-date="tillDate"
      api-url="https://api.userfeeds.io"
      size="rectangle"
      type="text"
      asset="ethereum"
      widget-title="State of the DApps"
      description="I accept only links for projects listed on State of the DApps"
      impression="100k unique pageviews per month"
      contact-method="support@stateofthedapps.com"
      open-details="tab"
      algorithm="links"/>
    <script src="https://cdn.jsdelivr.net/npm/@linkexchange/widgets@stable"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipientAddress: process.env.linkexchangeRecipientAddress,
      whitelist: process.env.linkexchangeWhitelistAddress,
      tillDate: process.env.linkexchangeTillDate
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/settings';

.linkexchange-wrapper {
  width: 100% !important;
  height: 100% !important;
  border: 1px solid $color--black;
}

#linkexchange {
  width: 100% !important;
  height: 100% !important;
}

#linkexchange * {
  color: $color--black !important;
}

#linkexchange .LX__banner__self {
  border: none !important;
}

#linkexchange .LX__banner__info {
  margin-top: 5px !important;
  font-size: 0.8rem !important;
}

#linkexchange .LX__banner__arrows {
  position: absolute !important;
  left: 50% !important;
  margin-left: -10px !important;
}

#linkexchange .LX__banner__arrow {
  font-size: 1rem !important;
}

#linkexchange .LX__banner__container {
  height: 100% !important;
  background-size: 100px 100px !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
}

#linkexchange .LX__link__summary:after,
#linkexchange .LX__link__summary:before {
  display: none;
}

#linkexchange .LX__banner__options {
  background: url('~assets/images/bg.jpg') center center !important;
  background-size: 100px 100px !important;
  box-shadow: none !important;
  align-items: center !important;
  padding: 0 10px !important;
  width: calc(100% - 20px) !important;
}

#linkexchange .LX__banner__probability {
  font-size: 0.7rem !important;
  text-transform: uppercase !important;
  font-weight: 600 !important;
  position: relative !important;
  top: -2px !important;
}

#linkexchange .LX__banner__rectangle {
  width: 100% !important;
  height: 100% !important;
}

#linkexchange .LX__modal__self {
  background-color: rgba($color--black, 0.85) !important;
}

#linkexchange .LX__menu__self {
  position: absolute !important;
  right: 0 !important;
  margin-right: 10px !important;
  margin-bottom: 0 !important;
  letter-spacing: 0 !important;
  font-size: 0.8rem !important;
}
</style>
