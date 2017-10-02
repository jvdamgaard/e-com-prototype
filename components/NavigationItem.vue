<template>
  <div class="NavigationItem has-small-line-height is-group" :class="{ 'NavigationItem--active': active}">
    <div class="has-tiny-right-margin">
      <div class="NavigationItem__icon is-bg-image is-round" :style="{
        'background-image': `url('${icon}')`,
      }" />
    </div>
    <div class="NavigationItem__text">
      <div class="NavigationItem__text__inner is-full-width is-small">
        <strong>{{titel}}</strong><br>
        <span class="is-dimmed">{{description}}</span>
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
    },
  };
</script>

<style>
@import '../assets/css/variables.css';

.NavigationItem {
  padding: 0.25rem 1rem 0.25rem 0.5rem;
  cursor: pointer;
  margin-left: 0.25rem;
  border-left: 0.25rem solid transparent;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  width: calc(100% - 0.25rem);
}
.NavigationItem--active {
  background-color: var(--color-grey-lighter);
  border-top-color: var(--color-grey-light);
  border-bottom-color: var(--color-grey-light);
  border-left-color: var(--color-primary);
  width: calc(100% - 0.25rem + 1px);
  z-index: 2;
}
.NavigationItem__icon {
  width: 5rem;
  height: 5rem;
}
.NavigationItem__text {
  width: calc(100% - 6rem);
}
.NavigationItem__text__inner {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media (min-width: 48rem) {
  .NavigationItem__icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  .NavigationItem__text {
    width: calc(100% - 3.5rem);
  }
}
</style>
