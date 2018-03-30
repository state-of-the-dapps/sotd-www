<template>
  <div class="component-Menu">
    <div class="nameplate">
      <nuxt-link class="logo-link" :to="{ name: 'home' }">Logo</nuxt-link>
      <span class="tagline">Tagline</span>
    </div>
    <ul class="nav-list" role="navigation">
      <li class="nav-item"><nuxt-link class="nav-link" :to="{ name: 'home' }">Home</nuxt-link></li>
      <li class="nav-item"><nuxt-link class="nav-link" :to="{ name: 'dapps' }">ÐApps</nuxt-link></li>
      <li class="nav-item"><nuxt-link class="nav-link" :to="{ name: 'events' }">Events</nuxt-link></li>
      <li class="nav-item -newsletter"><span class="nav-link -newsletter">Stay in the loop</span></li>    
    </ul>
  </div>
</template>
