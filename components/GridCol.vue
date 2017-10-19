<template>
  <div :class="[
    $style.container,
    $style[`is-${mobile}-col-on-mobile`],
    {
      [$style[`is-${phablet}-col-on-phablet`]]: phablet,
      [$style[`is-${tablet}-col-on-tablet`]]: tablet,
      [$style[`is-${laptop}-col-on-laptop`]]: laptop,
      [$style[`is-${desktop}-col-on-desktop`]]: desktop,

      [$style[`is-${rowOnMobile}-row-on-mobile`]]: rowOnMobile,
      [$style[`is-${rowOnPhablet}-row-on-phablet`]]: rowOnPhablet,
      [$style[`is-${rowOnTablet}-row-on-tablet`]]: rowOnTablet,
      [$style[`is-${rowOnLaptop}-row-on-laptop`]]: rowOnLaptop,
      [$style[`is-${rowOnDesktop}-row-on-desktop`]]: rowOnDesktop,

      [$style['vertical-center']]: verticalCenter,
    }
  ]">
    <slot />
  </div>
</template>

<script>
function validate({ min = 1, max = 12, exceptions = [] }) {
  return (v) => {
    if (exceptions.some(exception => exception === v)) {
      return true;
    }
    const i = parseInt(v, 10);
    return !Number.isNaN(Number(i)) && v >= min && v <= max;
  };
}
export default {
  props: {
    mobile: {
      type: String,
      default: '12',
      validator: validate({ min: 0, max: 12 }),
    },
    phablet: {
      type: String,
      validator: validate({ min: 0, max: 12 }),
    },
    tablet: {
      type: String,
      validator: validate({ min: 0, max: 12 }),
    },
    laptop: {
      type: String,
      validator: validate({ min: 0, max: 12 }),
    },
    desktop: {
      type: String,
      validator: validate({ min: 0, max: 12 }),
    },

    rowOnMobile: {
      type: String,
      validator: validate({ min: 1, max: 4 }),
    },
    rowOnPhablet: {
      type: String,
      validator: validate({ min: 1, max: 4 }),
    },
    rowOnTablet: {
      type: String,
      validator: validate({ min: 1, max: 4 }),
    },
    rowOnLaptop: {
      type: String,
      validator: validate({ min: 1, max: 4 }),
    },
    rowOnDesktop: {
      type: String,
      validator: validate({ min: 1, max: 4 }),
    },

    verticalCenter: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module>

.container { position: relative; }

.vertical-center { align-self: center; }

.is-0-col-on-mobile { display: none; }
.is-1-col-on-mobile { grid-column: span 1; }
.is-2-col-on-mobile { grid-column: span 2; }
.is-3-col-on-mobile { grid-column: span 3; }
.is-4-col-on-mobile { grid-column: span 4; }
.is-5-col-on-mobile { grid-column: span 5; }
.is-6-col-on-mobile { grid-column: span 6; }
.is-7-col-on-mobile { grid-column: span 7; }
.is-8-col-on-mobile { grid-column: span 8; }
.is-9-col-on-mobile { grid-column: span 9; }
.is-10-col-on-mobile { grid-column: span 10; }
.is-11-col-on-mobile { grid-column: span 11; }
.is-12-col-on-mobile { grid-column: span 12; }

.is-1-row-on-mobile { grid-row: span 1; }
.is-2-row-on-mobile { grid-row: span 2; }
.is-3-row-on-mobile { grid-row: span 3; }
.is-4-row-on-mobile { grid-row: span 4; }

@media (min-width: 25rem) {

  .is-0-col-on-phablet { display: none; }
  .is-1-col-on-phablet { grid-column: span 1; display: block; }
  .is-2-col-on-phablet { grid-column: span 2; display: block; }
  .is-3-col-on-phablet { grid-column: span 3; display: block; }
  .is-4-col-on-phablet { grid-column: span 4; display: block; }
  .is-5-col-on-phablet { grid-column: span 5; display: block; }
  .is-6-col-on-phablet { grid-column: span 6; display: block; }
  .is-7-col-on-phablet { grid-column: span 7; display: block; }
  .is-8-col-on-phablet { grid-column: span 8; display: block; }
  .is-9-col-on-phablet { grid-column: span 9; display: block; }
  .is-10-col-on-phablet { grid-column: span 10; display: block; }
  .is-11-col-on-phablet { grid-column: span 11; display: block; }
  .is-12-col-on-phablet { grid-column: span 12; display: block; }

  .is-1-row-on-phablet { grid-row: span 1; }
  .is-2-row-on-phablet { grid-row: span 2; }
  .is-3-row-on-phablet { grid-row: span 3; }
  .is-4-row-on-phablet { grid-row: span 4; }

}

@media (min-width: 48rem) {

  .is-0-col-on-tablet { display: none; }
  .is-1-col-on-tablet { grid-column: span 1; display: block; }
  .is-2-col-on-tablet { grid-column: span 2; display: block; }
  .is-3-col-on-tablet { grid-column: span 3; display: block; }
  .is-4-col-on-tablet { grid-column: span 4; display: block; }
  .is-5-col-on-tablet { grid-column: span 5; display: block; }
  .is-6-col-on-tablet { grid-column: span 6; display: block; }
  .is-7-col-on-tablet { grid-column: span 7; display: block; }
  .is-8-col-on-tablet { grid-column: span 8; display: block; }
  .is-9-col-on-tablet { grid-column: span 9; display: block; }
  .is-10-col-on-tablet { grid-column: span 10; display: block; }
  .is-11-col-on-tablet { grid-column: span 11; display: block; }
  .is-12-col-on-tablet { grid-column: span 12; display: block; }

  .is-1-row-on-tablet { grid-row: span 1; }
  .is-2-row-on-tablet { grid-row: span 2; }
  .is-3-row-on-tablet { grid-row: span 3; }
  .is-4-row-on-tablet { grid-row: span 4; }

}

@media (min-width: 64rem) {

  .is-0-col-on-laptop { display: none; }
  .is-1-col-on-laptop { grid-column: span 1; display: block; }
  .is-2-col-on-laptop { grid-column: span 2; display: block; }
  .is-3-col-on-laptop { grid-column: span 3; display: block; }
  .is-4-col-on-laptop { grid-column: span 4; display: block; }
  .is-5-col-on-laptop { grid-column: span 5; display: block; }
  .is-6-col-on-laptop { grid-column: span 6; display: block; }
  .is-7-col-on-laptop { grid-column: span 7; display: block; }
  .is-8-col-on-laptop { grid-column: span 8; display: block; }
  .is-9-col-on-laptop { grid-column: span 9; display: block; }
  .is-10-col-on-laptop { grid-column: span 10; display: block; }
  .is-11-col-on-laptop { grid-column: span 11; display: block; }
  .is-12-col-on-laptop { grid-column: span 12; display: block; }

  .is-1-row-on-laptop { grid-row: span 1; }
  .is-2-row-on-laptop { grid-row: span 2; }
  .is-3-row-on-laptop { grid-row: span 3; }
  .is-4-row-on-laptop { grid-row: span 4; }

}

@media (min-width: 96rem) {

  .is-0-col-on-desktop { display: none; }
  .is-1-col-on-desktop { grid-column: span 1; display: block; }
  .is-2-col-on-desktop { grid-column: span 2; display: block; }
  .is-3-col-on-desktop { grid-column: span 3; display: block; }
  .is-4-col-on-desktop { grid-column: span 4; display: block; }
  .is-5-col-on-desktop { grid-column: span 5; display: block; }
  .is-6-col-on-desktop { grid-column: span 6; display: block; }
  .is-7-col-on-desktop { grid-column: span 7; display: block; }
  .is-8-col-on-desktop { grid-column: span 8; display: block; }
  .is-9-col-on-desktop { grid-column: span 9; display: block; }
  .is-10-col-on-desktop { grid-column: span 10; display: block; }
  .is-11-col-on-desktop { grid-column: span 11; display: block; }
  .is-12-col-on-desktop { grid-column: span 12; display: block; }

  .is-1-row-on-desktop { grid-row: span 1; }
  .is-2-row-on-desktop { grid-row: span 2; }
  .is-3-row-on-desktop { grid-row: span 3; }
  .is-4-row-on-desktop { grid-row: span 4; }

}
</style>
