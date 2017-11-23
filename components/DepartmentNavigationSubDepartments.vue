<template>
  <grid inner :class="$style.container">
    <grid-col mobile="6" laptop="4" :class="$style.groupContainer">
      <group
        v-for="department in colOneDepartments"
        v-bind="department"
        :key="department.titel"
      />
    </grid-col>
    <grid-col mobile="6" laptop="4" :class="$style.groupContainer">
      <group
        v-for="department in colTwoDepartments"
        v-bind="department"
        :key="department.titel"
      />
    </grid-col>
    <grid-col
      mobile="0"
      laptop="4"
      rowOnMobile="2"
      :class="$style.promoContainer"
    >
      <promotion v-bind="promotion" />
    </grid-col>
    <grid-col mobile="12" laptop="8">
      <brands :brands="brands" />
    </grid-col>
  </grid>
</template>

<script>
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Promotion from './DepartmentNavigationPromotion.vue';
import Brands from './DepartmentNavigationBrands.vue';
import Group from './DepartmentNavigationGroup.vue';

export default {
  components: {
    Grid,
    GridCol,
    Promotion,
    Brands,
    Group,
  },
  props: {
    colOneDepartments: Array,
    colTwoDepartments: Array,
    promotion: Object,
    brands: Array,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  background-color: var(--color-grey-lighter);
  min-height: 100%;
  margin-left: -1rem;
  padding-left: 1rem;
  border-left: 1px solid var(--color-grey-light);
}
.groupContainer {
  padding-top: 1rem;
}
.promoContainer {
  padding: 1rem 1rem 1rem 0;
}
</style>
