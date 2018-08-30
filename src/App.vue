<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <Navigation/>
    </v-navigation-drawer>
    <v-toolbar app dark scroll-off-screen>
      <v-toolbar-side-icon v-on:click="toggleNavigationDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>PlayGround</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <transition name="contents">
        <router-view/>
      </transition>
    </v-content>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      app
      color="black"
    >
      <v-btn color="white"
      flat
      v-for="v in bottomNavItems"
      :key="'key' + v.title"
      :to="v.to"
      >
        <span>{{ v.title }}</span>
        <v-icon color="primary">{{ v.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {
  private drawer: boolean = false;
  private bottomNav: string = 'home';
  private bottomNavItems = [
    {
      title: 'Home',
      value: 'home',
      icon: 'home',
      to: '/',
    },
    {
      title: 'About',
      value: 'favorites',
      icon: 'favorite',
      to: '/about',
    },
    {
      title: 'Photo',
      value: 'photo',
      icon: 'insert_photo',
      to: '/photo',
    },
  ];

  private toggleNavigationDrawer(): void {
    this.drawer = !this.drawer;
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style lang="sass" scoped>
.contents-enter-active, .contents-leave-active
  transition: all 1s
.contents-enter
  opacity: 0
  transform: translateX(-300px) scale(1.2)
.contents-leave-to
  opacity: 0
  transform: translateX(300px) scale(0.8)
.contents-leave-active
  position: absolute
</style>

