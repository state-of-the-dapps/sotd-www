<template>
  <LayoutMain>
    <div class="page-logos">
      <div class="wrapper">
        <h1 class="title-1">Download our logos</h1>
        <p>The logos and icons below can be used to link to State of the ÐApps. Please do not modify them.</p>
        <p></p>
        <ul class="logo-list">
          <li class="logo-item">
            <a class="button" href="/logos.zip">Download all logos (.zip)</a>
          </li>
          <li class="logo-item">
            <a href="/logos.zip">
              <img width="140" src="~/assets/images/press/logo-reverse.png"/>
            </a>
          </li>
          <li class="logo-item">
            <a href="/logos.zip">
              <img width="140" src="~/assets/images/press/logo.png"/>
            </a>
          </li>
          <li class="logo-item">
            <a href="/logos.zip">
              <img width="50" src="~/assets/images/press/monogram.png"/>
            </a>
          </li>
          <li class="logo-item">
            <a href="/logos.zip">
              <img width="50" src="~/assets/images/press/rounded_outlined.png"/>
            </a>
          </li>
          <li class="logo-item">
            <a href="/logos.zip">
              <img width="50" src="~/assets/images/press/rounded_square.png"/>
            </a>
          </li>
          <li class="logo-item">
            <a href="/logos.zip">
              <img width="50" src="~/assets/images/press/square_reverse.jpg"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    LayoutMain
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.button {
  display: inline-block;
  background: $color--black;
  color: $color--gray;
  padding: 10px;
  border-radius: 4px;
  text-decoration: none;
}

.description {
  text-align: center;
  font-size: 1.2rem;
  max-width: 500px;
  margin: 0 auto;
}

.logo-list {
  padding: 20px 10px;
}

.logo-item {
  padding-bottom: 20px;
}

.title-1 {
  font-size: 3rem;
  text-transform: initial;
  text-align: center;
  margin-bottom: .75rem;
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
  padding-top: 25px;
  padding-bottom: 25px;
  text-align: center;
}
</style>
