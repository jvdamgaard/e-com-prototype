<template>
  <div :class="$style[direction]" />
</template>

<script>
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


<style module>
@import '../assets/css/variables.css';

.arrow {
  width: 0;
  height: 0;
  border-top: 0.75rem solid transparent;
  border-bottom: 0.75rem solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.right {
  composes: arrow;
  border-left: 1rem solid var(--color-grey);
}
.right:hover {
  border-left-color: var(--color-primary);
}

.left {
  composes: arrow;
  border-right: 1rem solid var(--color-grey);
}
.left:hover {
  border-right-color: var(--color-primary);
}
</style>
