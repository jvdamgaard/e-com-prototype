<template>
  <div :class="
    [$style.container,
    {
      [$style.transparent] : transparent,
      [$style.inactive] : inactive,
    }
  ]">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
    inactive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  composes: small from global;
  background-color: var(--color-white);
  padding: 1rem;
  margin-bottom: 1px;
}
.container:last-child {
  margin-bottom: 1rem;
}

.container > *:not(:first-child) { margin-top: 1rem; }

@media (min-width: 48rem) {
  .container {
    padding: 2rem 1rem;
    font-size: 1rem;
  }
}

.transparent {
  background-color: transparent;
}

.inactive { opacity: 0.5; }

@media (min-width: 48rem) {
  .container {
    padding: 2rem;
  }
}
</style>
