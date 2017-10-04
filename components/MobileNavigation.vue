<template>
  <div>
    <div
      class="MobileNavigation is-hidden-on-tablet"
      :class="{
        'MobileNavigation--active': this.state.departmentNavActive,
        'MobileNavigation--beyond': activeDepartment,
      }"
      >
      <Grid class="has-no-margin has-no-padding">
        <div class="is-12-col">
          <BackNavigationItem :back="expandDepartment" :close="closeNav" />
        </div>
        <div class="is-12-col">
          <NavigationItem titel="Log ind" description="Log ind eller opret bruger" icon="/icons/login.svg" />
        </div>
        <div class="is-12-col">
          <h3 class="has-padding">Afdelinger</h3>
          <NavigationItem
            v-for="department in departments"
            :titel="department.titel"
            :description="department.description"
            :icon="department.iconSrc"
            :key="department.titel"
            @click.native="expandDepartment(department.titel)" />
        </div>
      </Grid>
    </div>
    <template v-for="department in departments">
      <div
        class="SubMobileNavigation is-hidden-on-tablet"
        :class="{
          'SubMobileNavigation--active': department.titel === activeDepartment,
          'SubMobileNavigation--beyond': department.titel === activeDepartment && activeSubDepartment,
        }">
        <Grid class="has-no-margin has-no-padding">
          <div class="is-12-col">
            <BackNavigationItem :back="expandDepartment" titel="Alle afdelinger" :close="closeNav" />
          </div>
          <div class="is-12-col">
            <h3 class="has-padding">{{department.titel}}</h3>
            <NavigationItem :titel="`<strong>Alle i ${department.titel}</strong>`" />
            <NavigationItem
              v-for="subDepartment in department.subDepartments"
              :titel="subDepartment.titel"
              :key="subDepartment.titel"
              @click.native="expandSubDepartment(subDepartment.titel)" />
          </div>
          <div class="is-12-col has-padding">
            <h3>Top brands</h3>
            <p class="SubMobileNavigation__brand-icons">
              <nuxt-link v-for="brand in department.brands" to="/" :key="brand.imgSrc">
                <img :src="brand.imgSrc"/>
              </nuxt-link>
            </p>
          </div>
          <div class="is-12-col has-horizontal-padding">
            <nuxt-link
              to="/"
              class="SubMobileNavigation__promotion is-bg-image is-full-width is-block has-no-underline"
              :style="`background-image: url('${department.promotion.imageSrc}')`"
              :key="department.titel">
              <Btn v-if="department.promotion.btnLabel" type="yellow" shadow class="DepartmentNavigation__promo-btn">{{department.promotion.btnLabel}}</Btn>
            </nuxt-link>
          </div>
        </Grid>
      </div>
      <div
        v-for="subDepartment in department.subDepartments"
        class="SubSubMobileNavigation is-hidden-on-tablet"
        :class="{ 'SubSubMobileNavigation--active': subDepartment.titel === activeSubDepartment }">
        <Grid class="has-no-margin has-no-padding">
          <div class="is-12-col">
            <BackNavigationItem :back="expandSubDepartment" :titel="department.titel" :close="closeNav" />
          </div>
          <div class="is-12-col">
            <h3 class="has-padding">{{subDepartment.titel}}</h3>
            <NavigationItem :titel="`<strong>Alle i ${subDepartment.titel}</strong>`" />
            <NavigationItem
              v-for="subSubDepartment in subDepartment.subDepartments"
              :titel="subSubDepartment.titel"
              :key="subSubDepartment.titel" />
          </div>
        </Grid>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import Grid from './Grid.vue';
import NavigationItem from './NavigationItem.vue';
import BackNavigationItem from './BackNavigationItem.vue';
import Btn from './Btn.vue';

export default {
  components: {
    Grid,
    NavigationItem,
    Btn,
    BackNavigationItem,
  },
  data() {
    return {
      activeDepartment: null,
      activeSubDepartment: null,
    };
  },
  computed: {
    ...mapState(['departments', 'state']),
  },
  methods: {
    ...mapActions({
      closeDepartmentNav: 'state/closeDepartmentNav',
    }),
    closeNav() {
      this.expandDepartment();
      this.expandSubDepartment();
      this.closeDepartmentNav();
    },
    expandDepartment(titel) {
      this.activeDepartment = titel;
    },
    expandSubDepartment(titel) {
      this.activeSubDepartment = titel;
    },
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.MobileNavigation, .SubMobileNavigation, .SubSubMobileNavigation {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--color-grey-lighter);
  padding: 0 1px 3rem 1px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition: transform 0.5s ease;
}
.MobileNavigation {
  transform: translate3d(-100%, 0, 0);
  z-index: 2000;
}
.SubMobileNavigation { z-index: 2001; }
.SubSubMobileNavigation { z-index: 2002; }
.SubMobileNavigation, .SubSubMobileNavigation {
  transform: translate3d(100%, 0, 0);
}
.MobileNavigation--active, .SubMobileNavigation--active, .SubSubMobileNavigation--active {
  transform: translate3d(0, 0, 0);
}
.MobileNavigation--beyond, .SubMobileNavigation--beyond {
  transform: translate3d(-50%, 0, 0);
}
.MobileNavigation__departments {}

.SubMobileNavigation__promotion {
  padding-top: 150%;
}
.SubMobileNavigation__brand-icons img {
  height: 3rem;
  margin-right: 1rem;
  margin-top: 1rem;
}

</style>
