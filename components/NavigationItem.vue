<template>
  <div class="NavigationItem has-small-line-height is-group">
    <div class="has-tiny-right-margin">
      <img :src="icon" width="40" height="40" />
    </div>
    <div class="NavigationItem__text">
      <div class="NavigationItem__text__inner is-full-width">
        <strong>{{titel}}</strong><br>
        <span class="is-dimmed is-small">{{description}}</span>
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
    },
  };
</script>

<style>
@import '../assets/css/variables.css';

.NavigationItem {
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  cursor: pointer;
  margin-left: 0.25rem;
  border-left: 0.25rem solid transparent;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
  width: calc(100% - 0.25rem);
}
.no-touch .NavigationItem:hover {
  background-color: var(--color-grey-lighter);
  border-color: var(--color-grey-light);
  width: calc(100% - 0.25rem + 1px);
  z-index: 2;
}
.NavigationItem__text {
  width: calc(100% - 3.5rem);
}
.NavigationItem__text__inner {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
