<template>
  <div class="layout">
    <div class="wrapper">
      <div class="main">
        <div class="menu">
          <div class="menu-wrapper">
            <BaseMenu/>
          </div>
        </div>
        <nuxt/>
      </div>
      <div class="footer">
        <SecondaryCta/>
        <TheFooter/>
      </div>
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
html {
  box-sizing: border-box;
  background: $color--gray;
  font-size: 13px;
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
input,
textarea {
  font-family: 'Overpass', sans-serif;
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
  &.--has-popup {
    overflow: hidden;
  }
}

:focus {
  outline: none;
}

input::placeholder,
textarea::placeholder {
  color: darken($color--gray, 30%);
}

input::placeholder {
  line-height: 1.7;
}

h1 {
  font-size: 20px;
  line-height: 1;
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

input[type='submit'] {
  border-radius: 0;
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

.container {
  max-width: 2000px;
  margin: 0 auto;
  padding: 15px 10px;
  @include tweakpoint('min-width', 1000px) {
    padding: 15px 22px;
  }
}

.loader-wrapper {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

.loader {
  width: 20px;
  height: 20px;
  background-color: $color--black;

  margin: 0 auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% {
    -webkit-transform: perspective(120px);
  }
  50% {
    -webkit-transform: perspective(120px) rotateY(180deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}

.text-container {
  max-width: 700px;
  margin: 25px auto;
  padding: 0 15px;
  @include tweakpoint('min-width', 700px) {
    margin: 50px auto 75px;
  }
  h2 {
    font-size: 1.35rem;
    margin-bottom: -0.5rem;
    margin-top: 1.65rem;
  }
  p {
    font-size: 1.15rem;
    line-height: 1.35;
    max-width: 600px;
    &.intro {
      font-size: 1.4rem;
      line-height: 1.275;
      max-width: 700px;
    }
  }
  ul {
    margin: 1.25rem 2rem;
    li {
      margin: 0.25rem 0;
      list-style-type: square;
    }
  }
}

.title-1,
.title-2 {
  @include font-display;
  letter-spacing: 0px;
  font-weight: normal;
}

.title-1 {
  letter-spacing: 0.5px;
}

.title-2 {
  font-size: 2.25rem;
  margin-bottom: 0.75rem;
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
}

button:focus {
  outline: none;
}

p {
  margin: 1em 0;
}

h1,
h2 {
  margin: 0.83em 0;
}
</style>

<style lang="scss">
body {
  &.has-modal {
    overflow: hidden;
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
  &.has-modal {
    filter: blur(8px);
  }
}
</style>
