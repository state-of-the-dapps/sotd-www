<template>
  <div class="layout">
    <div class="wrapper">
      <main class="main">
        <div class="menu">
          <div class="menu-wrapper">
            <BaseMenu/>
          </div>
        </div>
        <nuxt/>
      </main>
      <footer class="footer">
        <SecondaryCta/>
        <TheFooter/>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheFooter from '~/components/TheFooter'
import BaseMenu from '~/components/BaseMenu'
import SecondaryCta from '~/components/SecondaryCta'

export default {
  components: {
    TheFooter,
    BaseMenu,
    SecondaryCta
  }
}
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  background: $color--gray;
  font-size: 13px;
  height: 100%;
}

body,
input,
textarea {
  @include font-text;
  font-weight: 400;
  line-height: 1.2;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  color: $color--black;
  letter-spacing: -0.25px;
}

body {
  background-size: 100px 100px;
  height: 100%;
}

:focus {
  outline: none;
}

input::placeholder,
textarea::placeholder {
  color: darken($color--gray, 30%);
  opacity: 1;
}

input::placeholder {
  line-height: 1.7;
}

input[type='submit'] {
  border-radius: 0;
}

p {
  margin: 1em 0;
}

h1 {
  font-size: 20px;
  line-height: 1;
}

h1,
h2 {
  margin: 0.83em 0;
}

ul,
li {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

em {
  font-style: normal;
  font-weight: 700;
}

a {
  color: $color--black;
  text-decoration: underline;
  cursor: pointer;
}

strong {
  font-weight: 700;
}

button {
  background: none;
  border: 0;
  border-radius: 0;
  color: inherit;
  letter-spacing: -0.15px;
  /* cursor: default; */
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  -webkit-appearance: button; /* for input */
  -webkit-user-select: none; /* for button */
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    cursor: pointer;
  }
}

button::-moz-focus-inner {
  border: 0;
  padding: 0;
}

button:focus {
  outline: none;
}

pre {
  margin: 0;
  background: $color--white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba($color--black, 0.05);
}

code {
  @include font-text-mono;
  margin: 0;
  padding: 0;
}

#__nuxt,
#__layout {
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}

.markdown-article-wrapper {
  max-width: 550px;
  margin: 0 auto;
}

.markdown-article {
  em {
    display: block;
    font-size: 0.95rem;
    text-align: center;
    font-weight: 300;
  }
  p {
    font-size: 1.3rem;
    line-height: 1.35;
  }
  img {
    width: 100%;
    border-radius: 3px;
  }
  iframe {
    max-width: 100%;
  }
  ul {
    padding-left: 2rem;
    li {
      font-size: 1.15rem;
      line-height: 1.4;
      position: relative;
      margin-bottom: 0.1rem;
      &:before {
        content: '•';
        position: absolute;
        top: 0.1rem;
        font-size: 13px;
        margin-left: -10px;
        vertical-align: middle;
      }
    }
  }
  h2 {
    @include font-display;
    font-size: 2.25rem;
    margin-top: 2rem;
    margin-bottom: -0.5rem;
  }
  h3 {
    font-size: 1.4rem;
    margin-top: 3rem;
    margin-bottom: 0rem;
  }

  blockquote {
    background: rgba($color--gray, 0.6);
    padding: 0 20px;
    overflow: hidden;
    border-radius: 4px;
    margin-left: 0;
    p {
      font-size: 1.2rem;
    }
  }
}
</style>

<style lang="scss" scoped>
.layout {
  height: 100%;
  position: relative;
}

.main {
  min-height: 98%;
  position: relative;
}

.menu-wrapper {
  @include margin-wrapper-main;
  padding: 7px 0 0 0;
}

.wrapper {
  height: 100%;
}
</style>
