<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div> -->
  <div class="w-100 h-100">
    <router-view/>
  </div>
</template>

<style lang="scss">
  // Import custom SASS variable overrides, or alternatively
  // define your variable overrides here instead

  $primary: #f578a3;
  $dark: #20212c;



  // Import Bootstrap and BootstrapVue source SCSS files
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';

  // General style overrides and custom classes
  body, html {
    margin: 0;
    background-color: #17181e;
    height: 100%;
    width: 100%
  }

.panel-heading .accordion-toggle {
    @include caret(right);

    &.collapsed {
        @include caret(left);
    }
}
  .my-widget {
    color: var(--danger);
  }
  // ...
</style>