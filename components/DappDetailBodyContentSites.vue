<template>
<div class="component-DappDetailBodyContentSites">
  <div class="wrapper">
    <button class="button">Launch DApp</button>
    <button class="button">Visit website</button>
    <ul class="social-list">
      <li class="social-item">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          Social
        </a>
      </li>
      <li class="social-item">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          Social
        </a>
      </li>
      <li class="social-item">
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          Social
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

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

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid $color--gray;
}
</style>
