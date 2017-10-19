<template>
  <div :class="$style.container">
    <h3><nuxt-link to="/" :class="$style.headerLink">{{ titel }}</nuxt-link></h3>
    <ul v-if="subDepartments" :class="$style.list">
      <li v-for="SubDepartment in subDepartments">
        <nuxt-link to="/" :class="$style.subLink">{{ SubDepartment.titel }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    titel: String,
    subDepartments: Array,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container { padding-top: 2rem; }
.headerLink { color: var(--color-black); }
.subLink { color: var(--color-grey-darker); }
.list {
  composes: unstyledList from './styles.css';
  composes: small from './styles.css';
  margin-bottom: 1rem;
}
</style>
