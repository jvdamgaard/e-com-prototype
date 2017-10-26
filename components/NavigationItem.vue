<template>
  <div :class="[
    $style.container,
    { [$style.active]: active}
  ]">
    <div
      v-if="icon && !lazy"
      :class="$style.icon"
      :style="{'background-image': `url('${icon}')`,}"
    />
    <div
      v-if="icon && lazy"
      :class="$style.icon"
      v-lazy:background-image="icon"
    />
    <div :class="$style.text">
      <div :class="$style.textInner">
        <span v-html="titel" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titel: String,
    description: String,
    icon: String,
    active: Boolean,
    lazy: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  composes: smallLineHeight from global;
  composes: group from global;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: var(--color-white);
  margin-bottom: 1px;
  min-height: 4rem;
}

/* Hide first part of bottom border */
.container:not(:last-child):before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 1px;
  width: 1rem;
  background-color: var(--color-white);
}
.container:after {
  content: '›';
  position: absolute;
  right: 1rem;
  font-size: 2rem;
  font-weight: 300;
  line-height: 1;
  color: var(--color-grey-light);
  top: calc(50% - 1rem);
}
.container:last-child {
  margin-bottom: 0px;
}
.icon {
  composes: bgImage from global;
  composes: round from global;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
}
.text {
  width: calc(100% - 6.5rem);
}
.textInner {
  composes: small from global;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media (min-width: 48rem) {
  .container {
    padding: 0.25rem 1rem 0.25rem 0.5rem;
    margin-left: 0.25rem;
    border-left: 0.25rem solid transparent;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    margin-bottom: 0;
    width: calc(100% - 0.25rem);
    min-height: 0;
  }
  .active {
    background-color: var(--color-grey-lighter);
    border-top-color: var(--color-grey-light);
    border-bottom-color: var(--color-grey-light);
    border-left-color: var(--color-primary);
    width: calc(100% - 0.25rem + 1px);
    z-index: 2;
  }
  .container:after {
    display: none;
  }
  .icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;
  }
  .text {
    width: calc(100% - 3.5rem);
  }
}
</style>
