<template>
  <div class="list">
    <Name/>
    <Email/>
    <Teaser/>
    <Description/>
    <Website/>
    <Organizer/>
    <RegistrationInfo/>
    <Social/>
    <Tags/>
  </div>
</template>

<script>
  import Description from '~/components/events/form/fields/Description.vue'
  import Email from '~/components/events/form/fields/Email.vue'
  import Name from '~/components/events/form/fields/Name.vue'
  import Organizer from '~/components/events/form/fields/Organizer.vue'
  import RegistrationInfo from '~/components/events/form/fields/RegistrationInfo.vue'
  import Social from '~/components/events/form/fields/Social.vue'
  import Tags from '~/components/events/form/fields/Tags.vue'
  import Teaser from '~/components/events/form/fields/Teaser.vue'
  import Website from '~/components/events/form/fields/Website.vue'

  export default {
    components: {
      Description,
      Email,
      Name,
      Organizer,
      RegistrationInfo,
      Social,
      Tags,
      Teaser,
      Website
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .list {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    margin: 0 auto;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-right: 20px;
      margin-left: 0;
    }

    .item {
      width: 100%;
      margin-bottom: 15px;
      position: relative;
      border: 1px solid transparent;
      &.-icon, &.-image {
        background: rgba(lighten($color--gallery, 100%), .9);
        box-shadow: 0 0 20px rgba($color--mine-shaft, .05);
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        border-radius: 50%;
        &.-drop {
          border-color: $color--mine-shaft;
        }
      }
      &.-image {
        width: auto;
        height: auto;
        min-height: 200px;
        border-radius: 10px;
      }
      &.--has-errors {
        border-color: $color--tart-orange;
      }
    }

    /deep/ .required {
      display: inline-block;
      padding-left: 2px;
      color: $color--tart-orange;
    }

    /deep/ .label {
      position: absolute;
      left: 0;
      top: 10px;
      padding: 20px;
      pointer-events: none;
      font-size: .95rem;
      transition: top .2s ease;
    }

    /deep/ .text-input, /deep/ .text-area {
      border: none;
      padding: 30px 50px 30px 20px;
      width: 100%;
      box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
      background: rgba(lighten($color--gallery, 100%),.9);
      transition: background .2s ease;
      &:focus {
        background: none;
        background: rgba(250, 250, 250, 0.7);
      }
      &:focus + .label,  &.--is-filled + .label {
        top: -11px;
        opacity: .65;
      }
    }

    /deep/ .text-area {
      vertical-align: top;
      min-height: 75px;
      resize: none;
    }

    /deep/ .remaining-characters {
      position: absolute;
      display: block;
      right: 20px;
      top: 30px;
    }

    /deep/ .help {
      padding: 10px 20px;
      margin: 0;
      background: none;
      background: rgba(250, 250, 250, 0.7);
      font-size: .9rem;
      line-height: 1.45;
    }

    /deep/ .error-list, /deep/ .warning-list {
      padding: 10px 20px;
      color: lighten($color--alabaster, 100%);
    }

    /deep/ .error-list {
      background: $color--tart-orange;
    }

    /deep/ .warning-list {
      background: $color--burning-orange;
    }

    /deep/ .error-item, /deep/ .warning-item {
      margin: .2rem 0;
    }
  }
</style>
