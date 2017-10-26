<template>
  <div :class="$style.container">
    <navigation-item
      titel="Log ind"
      description="Log ind eller opret bruger"
      icon="https://jvdamgaard.github.io/e-com-prototype/icons/login.svg"
      lazy
      :class="$style.navItem"
    />
    <h3 :class="$style.heading">Afdelinger</h3>
    <navigation-item
      v-for="department in departments"
      :titel="department.titel"
      :description="department.description"
      :icon="department.iconSrc"
      :active="department.titel === activeDepartment"
      :key="department.titel"
      @click.native="expandDepartment(department.titel)"
      @mouseover.native="setNextDepartment(department.titel, $event)"
      lazy
      :class="$style.navItem"
    />
  </div>
</template>

<script>
import NavigationItem from './NavigationItem.vue';

export default {
  components: {
    NavigationItem,
  },
  props: {
    departments: Array,
    expandDepartment: Function,
    setNextDepartment: Function,
    activeDepartment: String,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  padding: 1rem 0;
  min-height: 100%;
  background-color: var(--color-white);
}

.heading { padding: 1rem; }

.navItem { margin-bottom: 0; }
.navItem:before { display: none; }
</style>
