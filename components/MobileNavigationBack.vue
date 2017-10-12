<template>
  <div class="BackNavigationItem" @click="back(null)">
    <div v-if="titel" class="BackNavigationItem__back">
      <p class="is-full-width is-center-aligned">&#8249;</p>
    </div>
    <div v-if="titel"  class="BackNavigationItem__text">
      <div class="BackNavigationItem__text__inner is-full-width is-small">
        <strong>{{titel}}</strong>
      </div>
    </div>
    <div class="BackNavigationItem__close" @click="close" @touchstart="close">
      <p class="is-full-width is-center-aligned">&#215;</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      close: Function,
      back: Function,
      titel: String,
    },
  };
</script>

<style>
@import '../assets/css/variables.css';

.BackNavigationItem {
  height: 3.5rem;
  margin-bottom: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  background: var(--color-grey-lighter);
  border-bottom: 1px solid var(--color-grey-light);
}
/*.NavigationItem:after {
  content: '›';
  position: absolute;
  right: 1rem;
  font-size: 2.5rem;
  line-height: 1;
  color: var(--color-grey-dark);
  font-weight: 200;
  top: calc(50% - 1.25rem);
}*/
.BackNavigationItem__back, .BackNavigationItem__close {
  width: 3.5rem;
  text-align: center;
  height: 3.5rem;
  font-size: 2.5rem;
  line-height: 3rem;
  color: var(--color-grey-dark);
  font-weight: 200;
  position: absolute;
  top: 0;
}
.BackNavigationItem__back { left: 0; }
.BackNavigationItem__close { right: 0; }
.BackNavigationItem__text {
  width: calc(100% - 7rem);
  height: 3.5rem;
  line-height: 3.5rem;
  margin-left: 3.5rem;
}
.NavigationItem__text__inner {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
