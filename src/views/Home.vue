<template>
  <v-container justify-center fill-height class="home">
    <v-container>
      <img alt="Vue logo" src="../assets/ribbon_mini.png">
      <HelloWorld msg="Welcome to My test page"/>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
}
</script>

<style lang="sass">
.home
  text-align: center
</style>
