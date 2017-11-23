<template>
  <nuxt-link v-if="to" :to="to" :class="[
    $style.container,
    $style[type],
    {
      [$style[height]]: height !== 'default',
      [$style.shadow]: shadow,
      [$style.loading]: loading,
      [$style.done]: done,
    },
  ]">
    <div :class="$style.inner">
      <slot />
    </div>
  </nuxt-link>
  <div v-else :class="[
    $style.container,
    $style[type],
    {
      [$style[height]]: height !== 'default',
      [$style.shadow]: shadow,
      [$style.loading]: loading,
      [$style.done]: done,
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
        return ['primary', 'grey', 'yellow', 'grey-light', 'ghost', 'ghost-white', 'ghost-dimmed', 'buy', 'red', 'green'].indexOf(value) !== -1;
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
    to: String,
    loading: Boolean,
    done: Boolean,
  },
};
</script>


<style module>
@import '../assets/css/variables.css';

.container {
  display: block;
  position: relative;
  font-weight: bold;
  text-align: center;
  height: 3rem;
  padding: 0 0.75rem;
  border: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-decoration: none !important;
  width: 100%;
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
  box-shadow: 0 0.125rem 0.75rem rgba(0,0,0,0.15);
}
:global(.no-touch) .shadow:hover {
  box-shadow: 0 0.125rem 1.5rem rgba(0,0,0,0.25);
}

.small {
  composes: small from global;
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
  background-color: var(--color-grey-lighter);
}
:global(.no-touch) .grey-light:hover {
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
:global(.no-touch) .ghost-white:hover {
  color: var(--color-black);
  background-color: var(--color-white);
}

.ghost-dimmed {
  color: var(--color-grey-dark);
  border: 1px solid var(--color-grey-light);
  background-color: transparent;
  font-weight: normal;
}
:global(.no-touch) .ghost-dimmed:hover {
  color: var(--color-black);
  border-color: var(--color-black);
}

@-webkit-keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes counter-rotating {
  from {
    transform: rotate(405deg);
  }
  to {
    transform: rotate(45deg);
  }
}

.loading {
  width: 3rem;
  margin: 0 auto;
  background-color: transparent;
  border-radius: 1.5rem;
  box-shadow: none !important;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  padding: 0;
}
:global(.no-touch) .loading:hover {
  background-color: transparent;
  cursor: default;
}

.loading.small {
  width: 2.5rem;
  border-radius: 1.25rem;
}
.loading.large {
  width: 4rem;
  border-radius: 2rem;
}

.loading:before {
  content: '✓';
  color: var(--color-buy);
  font-size: 3rem;
  font-weight: 300;
  position: absolute;
  top: -0.25rem;
  right: 0.5rem;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: rotate(-90deg);
}

.loading .inner {
  color: transparent;
  border-radius: 100%;
  border: 2px solid transparent;
  border-right-color: var(--color-primary);
  animation: rotating 1s cubic-bezier(0.58, 0.13, 0.35, 0.71) infinite;
  animation-delay: 0.3s;
  transition: all 1s ease;
}

.done {
  composes: loading;
}

.done:before {
  opacity: 1;
  color: var(--color-buy);
  transform: rotate(0deg);
}
.done .inner {
  border: 2px solid var(--color-buy) !important;
}
</style>
