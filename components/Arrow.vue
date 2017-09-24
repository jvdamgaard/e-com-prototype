<template>
  <div class="Arrow" :class="`Arrow--${direction}`">
    <slot />
  </div>
</template>

<<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'right',
      validator(value) {
        return ['right', 'left'].indexOf(value) !== -1;
      },
    },
  },
};
</script>


<style>
@import '../assets/css/variables.css';

.Arrow {
  width: 0; 
  height: 0;
  border-top: 0.75rem solid transparent;
  border-bottom: 0.75rem solid transparent;
  transition: all 0.2s ease;
}

.Arrow--right {
  border-left: 1rem solid var(--color-grey);
}
.Arrow--right:hover {
  border-left-color: var(--color-primary);
}

.Arrow--left {
  border-right: 1rem solid var(--color-grey);
}
.Arrow--left:hover {
  border-right-color: var(--color-primary);
}
</style>