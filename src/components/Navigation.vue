<template>
  <div class="navigation">
    <v-toolbar flat dark color="secondary">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            hoge
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile v-for="v in 5" :key="'key' + v">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class Navigation extends Vue {}
</script>

<style lang="sass">
</style>
