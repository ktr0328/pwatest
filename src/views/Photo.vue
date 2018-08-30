<template>
  <v-container fluid class="place">
    <v-toolbar
      dense
      floating
      absolute
      style="top: 20%; left: 50%; position: fixed"
    >
      <v-form v-on:submit.prevent="search">
        <v-text-field
          hide-details
          prepend-icon="search"
          single-line
          placeholder="something.."
          v-model="$store.state.searchText"
        ></v-text-field>
      </v-form>
    </v-toolbar>
    <h1 id="title-anchor">Image Searcher</h1>

    <transition-group name="image-list">
      <img style="width: 50%"
        v-for='v in $store.state.images' v-bind:key="'key' + v" v-lazy='v' alt='alt'
        v-on:click="() => {
          select = v;
          imageDialog = true;
        }"
      >
    </transition-group>

    <div class="text-xs-center" v-if="$store.state.pages > 0">
      <v-pagination
        v-model="$store.state.page"
        :length="$store.state.pages"
        circle
        total-visible="6"
      ></v-pagination>
    </div>

    <v-dialog
      v-model="isLoading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="imageDialog" width="100%">
      <v-card>
        <img :src='select' alt='img' style="width: 100%" v-on:click="imageDialog = false">
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Vuetify from 'vuetify';
import axios from 'axios';

interface FlickrType {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

@Component
export default class Photo extends Vue {
  private select: string = '';
  private isLoading: boolean = false;
  private imageDialog: boolean = false;

  private mounted() {
    this.$store.watch(
      (state) => state.page,
      (val: string, oldVal: string) => {
        this.search(parseInt(val, 10));
      },
    );
  }

  private search(page: number): void {
    const candidate = ['dog', 'cat', 'animal', 'laugh'];

    if (!this.$store.state.searchText) {
      this.$store.commit(
        'setSearchText',
        candidate[Math.floor(Math.random() * candidate.length)],
      );
    }

    const searchText = this.$store.state.searchText;
    const searchPage = Number(page) ? page : 1;
    this.$store.commit('changePage', searchPage);
    this.$vuetify.goTo('#title-anchor', {
      duration: 600,
      offset: -150,
      easing: 'easeInOutCubic',
    });

    this.isLoading = true;
    axios
      .get(
        `https://klyv3aupki.execute-api.us-west-2.amazonaws.com/dev/flickr-api?text=${searchText}&page=${searchPage}`,
      )
      .then((v) => {
        const photos = v.data.photo.map(
          (e: FlickrType) =>
            `https://farm${e.farm}.staticflickr.com/${e.server}/${e.id}_${
              e.secret
            }.jpg`,
        );
        this.$store.commit('setPages', parseInt(v.data.pages, 10));
        this.$store.commit('setImages', photos);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
</script>

<style lang="sass" scoped>
.image-list-enter-active, .image-list-leave-active
  transition: opacity 1s
.image-list-enter, .image-list-leave-to
  opacity: 0
</style>

