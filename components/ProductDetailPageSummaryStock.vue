<template>
  <div :class="$style.container">
    <p><strong :class="$style.green">På lager.</strong> Kan også afhentes i 9 butikker. <a href="#">Se hvilke butikker</a></p>
    <p><strong>3-5 dages til 29,-</strong> Eller få den allerede i morgen ved valg af hurtigere leveringsmulighed. <a href="#">Se alle leveringsmuligheder</a></p>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container > * { margin-top: 0.5rem; }
.green { color: var(--color-green); }
</style>
