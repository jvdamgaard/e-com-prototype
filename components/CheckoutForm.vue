<template>
  <form :class="$style.form">
    <slot/>
  </form>
</template>

<script>
</script>

<style module>
@import '../assets/css/variables.css';

.form p:not(:first-child) {
  margin-top: 1rem;
}
.form input[type="checkbox"], .form input[type="radio"] {
  display: inline-block;
  width: auto;
  height: auto;
  margin-right: 0.5rem;
}

.form label div {
  float: right;
}

.form label img {
  display: inline-block;
  height: 1rem;
  margin-left: 0.5rem;
}
</style>
