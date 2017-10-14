<template>
  <div class="NavigationItem has-small-line-height is-group" :class="{ 'NavigationItem--active': active}">
    <div
      v-if="icon && !lazy"
      class="NavigationItem__icon is-bg-image is-round"
      :style="{'background-image': `url('${icon}')`,}"
    />
    <div
      v-if="icon && lazy"
      class="NavigationItem__icon is-bg-image is-round"
      v-lazy:background-image="icon"
    />
    <div class="NavigationItem__text">
      <div class="NavigationItem__text__inner is-full-width is-small">
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

<style>
@import '../assets/css/variables.css';

.NavigationItem {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: var(--color-white);
  margin-bottom: 1px;
  min-height: 4rem;
}
.NavigationItem:after {
  content: '›';
  position: absolute;
  right: 1rem;
  font-size: 2rem;
  font-weight: 300;
  line-height: 1;
  color: var(--color-grey-light);
  top: calc(50% - 1rem);
}
.NavigationItem:last-child {
  margin-bottom: 0px;
}
.NavigationItem__icon {
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
}
.NavigationItem__text {
  width: calc(100% - 6.5rem);
}
.NavigationItem__text__inner {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media (min-width: 48rem) {
  .NavigationItem {
    padding: 0.25rem 1rem 0.25rem 0.5rem;
    margin-left: 0.25rem;
    border-left: 0.25rem solid transparent;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    margin-bottom: 0;
    width: calc(100% - 0.25rem);
    min-height: 0;
  }
  .NavigationItem--active {
    background-color: var(--color-grey-lighter);
    border-top-color: var(--color-grey-light);
    border-bottom-color: var(--color-grey-light);
    border-left-color: var(--color-primary);
    width: calc(100% - 0.25rem + 1px);
    z-index: 2;
  }
  .NavigationItem:after {
    display: none;
  }
  .NavigationItem__icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;
  }
  .NavigationItem__text {
    width: calc(100% - 3.5rem);
  }
}
</style>
