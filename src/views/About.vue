<template>
  <v-container fluid class="about" id="about">
    <div id="about-content">
      <h1>This is an about page</h1>
      <p>PWAで遊ぶ。</p>
      <p>とりあえずパーティクル動かす。</p>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// tslint:disable-next-line:no-var-requires
const P5 = require('p5');

@Component({
  components: {
  },
})
export default class About extends Vue {
  private particles: any = [];

  private initParticles(num: number) {
    // tslint:disable-next-line:max-classes-per-file
    const Particle = class {
      public id: number;
      public x: number;
      public y: number;
      public vector: {x: number, y: number};

      constructor(id: number, x: number, y: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.vector = {
          x: Math.random() * 1 - Math.random() * 1,
          y: Math.random() * 1 - Math.random() * 1,
        };
      }

      public move() {
        const parent = document.querySelector('#about')!;
        this.x += this.vector.x;
        this.y += this.vector.y;
        if (this.x > parent.clientWidth) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = parent.clientWidth;
        } else if (this.y > parent.clientHeight) {
          this.y = 0;
        } else if (this.y < 0) {
          this.y = parent.clientHeight;
        }
      }
    };

    for (let i = 0; i < num; i++) {
      const parent = document.querySelector('#about')!;
      this.particles.push(new Particle(i, Math.random() * parent.clientWidth, Math.random() * parent.clientHeight));
    }
  }

  private getDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

  private sketch(p: any) {
    const particles = this.particles;
    p.setup = () => {
      const parent = document.querySelector('#about')!;
      const canvas = p.createCanvas(parent.clientWidth, parent.clientHeight);
      canvas.parent('about');
    };

    p.draw = () => {
      p.clear();
      p.smooth();

      p.fill([0, 0, 0, 85]);
      this.particles.forEach((e: any) => {
        e.move();
        p.ellipse(e.x, e.y, 2, 2);
      });

      const DISTANCE = document.querySelector('#about')!.clientWidth / 7;
      this.particles.forEach((e: any) => {
        this.particles
          .filter((v: any) => this.getDistance(e.x, e.y, v.x, v.y) < DISTANCE)
          .forEach((v: any) => {
            const per = this.getDistance(e.x, e.y, v.x, v.y) / DISTANCE;
            p.stroke([200, 200, 200, 100 - 100 * per]);
            p.line(e.x, e.y, v.x, v.y);
          });
      });
    };
  }

  private mounted() {
    this.initParticles(100);
    // tslint:disable-next-line:no-unused-expression
    new P5(this.sketch);
  }
}
</script>

<style lang="sass" scoped>
#canvas
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: #666
#about-content
  position: absolute
#about
  height: 100%
</style>

