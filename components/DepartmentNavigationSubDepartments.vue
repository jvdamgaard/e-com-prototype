<template>
  <grid inner :class="$style.container">
    <grid-col mobile="6" laptop="4">
      <group
        v-for="department in colOneDepartments"
        v-bind="department"
        :key="department.titel"
      />
    </grid-col>
    <grid-col mobile="6" laptop="4">
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
      <nuxt-link
        to="/"
        :class="$style.promo"
        v-lazy:background-image="promotion.imageSrc"
      >
        <btn
          v-if="promotion.btnLabel"
          type="yellow"
          shadow
          :class="$style.promoBtn"
        >
          {{promotion.btnLabel}}
        </btn>
      </nuxt-link>
    </grid-col>
    <grid-col mobile="12" laptop="8" class="has-large-bottom-padding">
      <h3>Top brands</h3>
      <p>
        <nuxt-link v-for="brand in brands" to="/" :key="brand.imgSrc">
          <img v-lazy="brand.imgSrc" :class="$style.brandIcon"/>
        </nuxt-link>
      </p>
    </grid-col>
  </grid>
</template>

<script>
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Group from './DepartmentNavigationGroup.vue';
import Btn from './Btn.vue';

export default {
  components: {
    Grid,
    GridCol,
    Btn,
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

.promoContainer {
  composes: hiddenOnMobile from './styles.css';
  composes: visibleOnLaptop from './styles.css';
  padding: 1rem 1rem 1rem 0;
}
.promo {
  composes: bgImage from './styles.css';
  width: 100%;
  height: 100%;
  display: block;
  padding: 1rem;
}

.promoBtn {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
}

.brandIcon {
  height: 2rem;
  margin-right: 1rem;
  margin-top: 1rem;
  transition: transform 0.2s ease;
}
:global(.no-touch) .brandIcon:hover {
  transform: scale(1.2);
  z-index: 10;
}
</style>
