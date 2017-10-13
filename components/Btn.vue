<template>
  <div class="Btn" :class="[
    `Btn--is-${type}`,
    `Btn---has-${height}-height`,
    {
      'Btn--has-shadow': shadow,
    },
  ]">
    <div class="Btn__inner">
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
        return ['primary', 'grey', 'yellow', 'grey-light', 'ghost', 'buy', 'red', 'green'].indexOf(value) !== -1;
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


<style>
@import '../assets/css/variables.css';

.Btn {
  position: relative;
  font-weight: bold;
  text-align: center;
  height: 3rem;
  font-size: 1rem;
  padding: 0 0.75rem;
  border: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  white-space: nowrap;
}
.Btn__inner {
  width: calc(10rem + 100%);
  height: 100%;
  display: flex;
  justify-content:  center;
  align-content:center;
  flex-direction: column;
  margin-left: -5rem;
  margin-right: -5rem;
}


.Btn--has-shadow {
  box-shadow: 0 0.125rem 0.75rem rgba(0,0,0,0.2);
}
.no-touch .Btn--has-shadow:hover {
  box-shadow: 0 0.125rem 1.5rem rgba(0,0,0,0.3);
}

.Btn---has-small-height {
  height: 2.5rem;
}
.Btn---has-large-height {
  height: 4rem;
}

.Btn--is-primary {
  color: var(--color-white);
  background-color: var(--color-primary);
}
.no-touch .Btn--is-primary:hover {
  background-color: var(--color-primary-dark);
}

.Btn--is-buy, .Btn--is-green {
  color: var(--color-white);
  background-color: var(--color-buy);
}

.Btn--is-red {
  color: var(--color-white);
  background-color: var(--color-red);
}

.Btn--is-grey {
  color: var(--color-white);
  background-color: var(--color-grey-dark);
}
.no-touch .Btn--is-grey:hover {
  background-color: var(--color-grey-darker);
}

.Btn--is-grey-light {
  background-color: var(--color-grey-light);
}

.Btn--is-yellow {
  color: var(--color-black);
  background-color: var(--color-yellow);
}
.no-touch .Btn--is-yellow:hover {
  background-color: var(--color-yellow-dark);
}

.Btn--is-ghost {
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  background-color: transparent;
}
.no-touch .Btn--is-ghost:hover {
  background-color: var(--color-grey-darker);
}
</style>
