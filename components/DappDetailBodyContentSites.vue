<template>
<div class="component-DappDetailBodyContentSites">
  <div class="wrapper">
    <button class="button">Launch DApp</button>
    <button class="button">Visit website</button>
    <ul class="social-list">
      <li class="social-item">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <SvgSocialChat/>
        </a>
      </li>
      <li class="social-item">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <SvgSocialBlog/>
        </a>
      </li>
      <li class="social-item">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <SvgSocialFacebook/>
        </a>
      </li>
      <li class="social-item">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <SvgSocialGithub/>
        </a>
      </li>
      <li class="social-item">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <SvgSocialGitter/>
        </a>
      </li>
      <li class="social-item">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <SvgSocialReddit/>
        </a>
      </li>
      <li class="social-item">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <SvgSocialTwitter/>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import SvgSocialChat from './SvgSocialChat'
import SvgSocialBlog from './SvgSocialBlog'
import SvgSocialFacebook from './SvgSocialFacebook'
import SvgSocialGithub from './SvgSocialGithub'
import SvgSocialGitter from './SvgSocialGitter'
import SvgSocialReddit from './SvgSocialReddit'
import SvgSocialTwitter from './SvgSocialTwitter'

export default {
  components: {
    SvgSocialChat,
    SvgSocialBlog,
    SvgSocialFacebook,
    SvgSocialGithub,
    SvgSocialGitter,
    SvgSocialReddit,
    SvgSocialTwitter
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.button {
  background: $color--black;
  color: $color--gray;
  display: block;
  width: 100%;
  max-width: 200px;
  padding: 5px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

.social-item {
  padding: 3px;
}

.social-list {
  padding-top: 5px;
  margin: 0 -3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid $color--gray;
}
</style>
