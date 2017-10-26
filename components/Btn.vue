<template>
  <div :class="[
    $style.container,
    $style[type],
    {
      [$style[height]]: height !== 'default',
      [$style.shadow]: shadow,
    },
  ]">
    <div :class="$style.inner">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'grey', 'yellow', 'grey-light', 'ghost', 'ghost-white', 'buy', 'red', 'green'].indexOf(value) !== -1;
      },
    },
    height: {
      type: String,
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1;
      },
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>


<style module>
@import '../assets/css/variables.css';

.container {
  position: relative;
  font-weight: bold;
  text-align: center;
  height: 3rem;
  font-size: 1rem;
  padding: 0 0.75rem;
  border: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.inner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:  center;
  align-content: center;
  flex-direction: column;
}


.shadow {
  box-shadow: 0 0.125rem 0.75rem rgba(0,0,0,0.2);
}
:global(.no-touch) .shadow:hover {
  box-shadow: 0 0.125rem 1.5rem rgba(0,0,0,0.3);
}

.small {
  height: 2.5rem;
}
.large {
  height: 4rem;
}

.primary {
  color: var(--color-white);
  background-color: var(--color-primary);
}
:global(.no-touch) .primary:hover {
  background-color: var(--color-primary-dark);
}

.buy, .green {
  color: var(--color-white);
  background-color: var(--color-buy);
}
:global(.no-touch) .buy:hover, :global(.no-touch) .green:hover {
  background-color: var(--color-buy-dark);
}

.red {
  color: var(--color-white);
  background-color: var(--color-red);
}

.grey {
  color: var(--color-white);
  background-color: var(--color-grey-dark);
}
:global(.no-touch) .grey:hover {
  background-color: var(--color-grey-darker);
}

.grey-light {
  background-color: var(--color-grey-light);
}

.yellow {
  color: var(--color-black);
  background-color: var(--color-yellow);
}
:global(.no-touch) .yellow:hover {
  background-color: var(--color-yellow-dark);
}

.ghost {
  color: var(--color-grey-darker);
  border: 1px solid var(--color-grey-darker);
  background-color: transparent;
}
:global(.no-touch) .ghost:hover {
  color: var(--color-white);
  background-color: var(--color-grey-darker);
}

.ghost-white {
  color: var(--color-white);
  border: 1px solid var(--color-white);
  background-color: transparent;
}
:global(.no-touch) .ghost:hover {
  color: var(--color-black);
  background-color: var(--color-white);
}
</style>
