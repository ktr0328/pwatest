<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>なんか適当に作る</p>
    <v-btn href="https://github.com/ktr0328" dark round>
      <v-icon left color="primary">favorite_border</v-icon>Github
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
a
  v-icon
    border: none
</style>
