<template>
  <div class="Btn" :class="[
    `Btn--${type}`,
    { 
      'Btn--has-shadow': shadow,
    },
  ]">
    <div class="Btn__inner">
      <slot />
    </div>
  </div>
</template>

<<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'grey', 'yellow', 'grey-light'].indexOf(value) !== -1;
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
}
.Btn__inner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:  center;
  align-content:center;
  flex-direction: column;
}

.Btn--has-shadow {
  box-shadow: 0 0.25rem 0.5rem rgba(0,0,0,0.15);
}
.no-touch .Btn--has-shadow:hover {
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.25);
}

.Btn--primary {
  color: var(--color-white);
  background-color: var(--color-primary);
}
.no-touch .Btn--primary:hover {
  background-color: var(--color-primary-dark);
}
.Btn--grey {
  color: var(--color-white);
  background-color: var(--color-grey-dark);
}
.no-touch .Btn--grey:hover {
  background-color: var(--color-grey-darker);
}
.Btn--grey-light {
  background-color: var(--color-grey-light);
}
.Btn--yellow {
  color: var(--color-black);
  background-color: var(--color-yellow);
}
</style>