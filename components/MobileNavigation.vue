<template>
  <div
    class="MobileNavigation is-hidden-on-tablet"
    :class="{ 'MobileNavigation--active': this.state.departmentNavActive }"
    @click.self="closeNav"
    >
    <Grid class="has-no-margin has-no-padding" @click.native.self="closeNav">
      <div class="is-11-col has-shadow">
        <div class="MobileNavigation__departments has-white-background has-vertical-padding is-full-height">
          <NavigationItem titel="Velkommen" description="Log ind eller opret bruger" icon="/icons/login.svg" />
          <h3 class="has-padding">Afdelinger</h3>
          <NavigationItem
            v-for="department in departments"
            :titel="department.titel"
            :description="department.description"
            :icon="department.iconSrc"
            :active="department.titel === activeDepartment"
            :key="department.titel"
            @click.native="expandDepartment(department.titel)" />
        </div>
      </div>
      <!--<div
        v-for="department in enhancedDepartments"
        v-show="department.titel === activeDepartment"
        class="is-hidden-on-mobile is-visible-on-tablet is-8-col is-9-col-on-laptop is-6-col-on-desktop has-shadow"
        @mouseover="setNextDepartment(department.titel); enterSub();"
        @mouseleave="leaveSub();">
        <Grid inner class="DepartmentNavigation__sub has-light-grey-background is-full-height">
          <div class="is-6-col is-4-col-on-laptop has-large-top-padding">
            <template v-for="subDepartment in department.col1.subDepartments">
              <h3><nuxt-link to="/" class="is-black">{{ subDepartment.titel }}</nuxt-link></h3>
              <ul v-if="subDepartment.subDepartments" class="is-unstyled-list has-small-bottom-margin is-small">
                <li v-for="subSubs in subDepartment.subDepartments"><nuxt-link to="/" class="is-grey">{{ subSubs.titel }}</nuxt-link></li>
              </ul>
            </template>
          </div>
          <div class="is-6-col is-4-col-on-laptop has-large-top-padding">
            <template v-for="subDepartment in department.col2.subDepartments">
              <h3><nuxt-link to="/" class="is-black">{{ subDepartment.titel }}</nuxt-link></h3>
              <ul v-if="subDepartment.subDepartments" class="is-unstyled-list has-small-bottom-margin is-small">
                <li v-for="subSubs in subDepartment.subDepartments"><nuxt-link to="/" class="is-grey">{{ subSubs.titel }}</nuxt-link></li>
              </ul>
            </template>
          </div>
          <div class="is-hidden-on-mobile is-visible-on-laptop is-4-col-on-laptop is-2-row has-vertical-padding has-right-padding">
            <nuxt-link
              to="/"
              class="is-bg-image is-full-width is-full-height is-block is-white has-padding has-no-underline"
              :style="`background-image: url('${department.promotion.imageSrc}')`"
              :key="department.titel">
              <Btn v-if="department.promotion.btnLabel" type="yellow" shadow class="DepartmentNavigation__promo-btn">{{department.promotion.btnLabel}}</Btn>
            </nuxt-link>
          </div>
          <div class="is-12-col is-8-col-on-laptop has-large-bottom-padding">
            <h3>Top brands</h3>
            <p class="DepartmentNavigation__brand-icons">
              <nuxt-link v-for="brand in department.brands" to="/" :key="brand.imgSrc">
                <img :src="brand.imgSrc"/>
              </nuxt-link>
            </p>
          </div>
        </Grid>
      </div>-->
    </Grid>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import Grid from './Grid.vue';
import NavigationItem from './NavigationItem.vue';
import Btn from './Btn.vue';

export default {
  components: {
    Grid,
    NavigationItem,
    Btn,
  },
  data() {
    return {
      activeDepartment: null,
    };
  },
  computed: {
    ...mapState(['departments', 'state']),
  },
  methods: {
    ...mapActions({
      closeDepartmentNav: 'state/closeDepartmentNav',
    }),
    expandDepartment(titel) {
      this.activeDepartment = titel;
    },
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.MobileNavigation {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--color-pop-over-background);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

</style>
