<template>
  <img v-lazy="`https://jvdamgaard.github.io/e-com-prototype/icons/star-${color}.svg`" class="Star" />
</template>

<script>
export default {
  props: {
    rating: Number,
    pos: Number,
  },
  computed: {
    color() {
      if (this.rating < this.pos) {
        return 'grey';
      }
      if (this.rating === 1) {
        return 'red';
      }
      if (this.rating === 2 || this.rating === 3) {
        return 'yellow';
      }
      return 'green';
    },
  },
};
</script>


<style>
.Star {
  width: 1rem;
  height: 1rem;
}
</style>
