<template>
  <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="Star">
    <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
    <title>elements/icon/star/grey</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g fill="#CCCCCC" :class="`Star__g--${color}`">
        <polygon points="16 24 6.59543596 28.9442719 8.39154787 18.472136 0.783095739 11.0557281 11.297718 9.52786405 16 0 20.702282 9.52786405 31.2169043 11.0557281 23.6084521 18.472136 25.404564 28.9442719"></polygon>
      </g>
    </g>
  </svg>
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
@import '../assets/css/variables.css';

.Star {
  width: 1rem;
  height: 1rem;
}
.Star__g--grey {
  fill: var(--color-grey-light);
}
.Star__g--red {
  fill: var(--color-red);
}
.Star__g--yellow {
  fill: var(--color-yellow);
}
.Star__g--green {
  fill: var(--color-green);
}
</style>
