<template>
  <div :class="[
    $style.grid,
    {
      [$style.inner]: inner,
      [$style[`${rowGap}RowGap`]]: rowGap !== 'default',
      [$style[`${colGap}ColGap`]]: colGap !== 'default',
      [$style[`fullWidthUntil-${fullWidthUntil}`]]: fullWidthUntil !== 'none',
    }
  ]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    rowGap: {
      type: String,
      default: 'default',
      validator(value) {
        return ['none', 'default', 'large'].indexOf(value) !== -1;
      },
    },
    colGap: {
      type: String,
      default: 'default',
      validator(value) {
        return ['none', 'default', 'large'].indexOf(value) !== -1;
      },
    },
    inner: Boolean,
    fullWidthUntil: {
      type: String,
      default: 'none',
      validator(value) {
        return ['none', 'mobile', 'phablet', 'tablet', 'laptop', 'desktop'].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style module>
.grid {
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
  margin: 2rem 0;
  padding: 0 1rem;
}

.inner {
  margin: 0;
  padding: 0;
}

@media (max-width: 399px) {
  .fullWidthUntil-mobile { padding: 0 !important; }
}
@media (max-width: 767px) {
  .fullWidthUntil-phablet { padding: 0 !important; }
}
@media (max-width: 1023px) {
  .fullWidthUntil-tablet { padding: 0 !important; }
}
@media (max-width: 1537px) {
  .fullWidthUntil-laptop { padding: 0 !important; }
}
.fullWidthUntil-desktop { padding: 0 !important; }

.noneRowGap { grid-row-gap: 0; }
.largeRowGap { grid-row-gap: 2rem; }

.noneColGap { grid-column-gap: 0; }
.largeColGap { grid-column-gap: 2rem; }

@media (min-width: 48rem) {
  .grid {
    padding: 0 2.5rem;
  }
  .inner {
    margin: 0;
    padding: 0;
  }
}

@media (min-width: 64rem) {
  .grid {
    margin: 3.5rem 0;
    padding: 0 4rem;
  }
  .inner {
    margin: 0;
    padding: 0;
  }
}
</style>
