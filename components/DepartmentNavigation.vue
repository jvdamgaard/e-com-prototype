<template>
  <div class="DepartmentNavigation" :class="{ 'DepartmentNavigation--active': this.state.deparmentNavActive }">
    <Grid class="has-no-top-margin has-no-bottom-margin">
      <div
        class="is-3-col-on-laptop is-2-col-on-desktop has-shadow"
        @mouseover="enterMain"
        @mouseleave="leaveMain">
        <div class="has-white-background has-vertical-padding is-full-height">
          <NavigationItem titel="Velkommen" description="Log ind eller opret bruger" icon="/icons/login.svg" />
          <h4 class="has-padding">Afdelinger</h4>
          <NavigationItem
            v-for="department in enhancedDepartments"
            :titel="department.titel"
            :description="department.description"
            :icon="department.iconSrc"
            :active="department.titel === activeDepartment"
            :key="department.titel"
            @click.native="expandDepartment(department.titel)"
            @mouseover.native="setNextDepartment(department.titel)" />
        </div>
      </div>
      <div
        v-for="department in enhancedDepartments"
        v-show="department.titel === activeDepartment"
        class="is-9-col-on-laptop is-6-col-on-desktop has-shadow"
        @mouseover="setNextDepartment(department.titel); enterSub();"
        @mouseleave="leaveSub();">
        <Grid inner class="DepartmentNavigation__sub has-light-grey-background is-full-height">
          <div class="is-4-col has-large-top-padding">
            <template v-for="subDepartment in department.col1.subDepartments">
              <h3><nuxt-link to="/" class="is-black">{{ subDepartment.titel }}</nuxt-link></h3>
              <ul v-if="subDepartment.subDepartments" class="is-unstyled-list has-small-bottom-margin is-small">
                <li v-for="subSubs in subDepartment.subDepartments"><nuxt-link to="/" class="is-grey">{{ subSubs.titel }}</nuxt-link></li>
              </ul>
            </template>
          </div>
          <div class="is-4-col has-large-top-padding">
            <template v-for="subDepartment in department.col2.subDepartments">
              <h3><nuxt-link to="/" class="is-black">{{ subDepartment.titel }}</nuxt-link></h3>
              <ul v-if="subDepartment.subDepartments" class="is-unstyled-list has-small-bottom-margin is-small">
                <li v-for="subSubs in subDepartment.subDepartments"><nuxt-link to="/" class="is-grey">{{ subSubs.titel }}</nuxt-link></li>
              </ul>
            </template>
          </div>
          <div class="is-4-col is-2-row has-vertical-padding has-right-padding">
            <nuxt-link
              to="/"
              class="is-4-col is-2-row is-bg-image is-full-width is-full-height is-block"
              :style="`background-image: url('${department.promotion.imageSrc}')`"
              :key="department.titel"/>
          </div>
          <div class="is-8-col has-large-bottom-padding">
            <h3>Brands</h3>
            <p class="DepartmentNavigation__brand-icons">
              <nuxt-link v-for="brand in department.brands" to="/" :key="brand.imgSrc">
                <img :src="brand.imgSrc"/>
              </nuxt-link>
            </p>
          </div>
        </Grid>
      </div>
    </Grid>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import debounce from 'lodash/debounce';
import Grid from './Grid.vue';
import NavigationItem from './NavigationItem.vue';

export default {
  components: {
    Grid,
    NavigationItem,
  },
  data() {
    return {
      activeDepartment: null,
      nextDepartment: null,
      hoverMain: false,
      hoverSub: false,
    };
  },
  computed: {
    ...mapState(['departments', 'state']),
    enhancedDepartments() {
      return this.departments.map((department) => {
        const col1 = {
          subDepartments: [],
          count: 0,
        };
        const col2 = {
          subDepartments: [],
          count: 0,
        };

        department.subDepartments.forEach((subDepartment) => {
          if (col1.count <= col2.count) {
            col1.subDepartments.push(subDepartment);
            col1.count += subDepartment.subDepartments.length + 1;
          } else {
            col2.subDepartments.push(subDepartment);
            col2.count += subDepartment.subDepartments.length + 1;
          }
        });

        return {
          ...department,
          col1,
          col2,
        };
      });
    },
  },
  methods: {
    ...mapActions({
      closeDepartmentNav: 'state/closeDepartmentNav',
    }),
    expandDepartment(titel) {
      this.activeDepartment = titel;
    },
    hasDepartmentChanged() {
      if (this.activeDepartment !== this.nextDepartment) {
        this.expandDepartment(this.nextDepartment);
      }
    },
    debounceDepartmentChange: debounce((hasDepartmentChanged) => {
      hasDepartmentChanged();
    }, 100),
    setNextDepartment(titel) {
      this.nextDepartment = titel;
      if (this.activeDepartment) {
        this.debounceDepartmentChange(this.hasDepartmentChanged);
      } else {
        this.hasDepartmentChanged();
      }
    },
    debounceCloseNav: debounce((closeNav) => {
      closeNav();
    }, 500),
    closeNav() {
      if (!this.hoverSub && !this.hoverMain) {
        this.closeDepartmentNav();
        this.expandDepartment(null);
      }
    },
    leaveSub() { this.hoverSub = false; this.debounceCloseNav(this.closeNav); },
    enterSub() { this.hoverSub = true; this.debounceCloseNav(this.closeNav); },
    leaveMain() { this.hoverMain = false; this.debounceCloseNav(this.closeNav); },
    enterMain() { this.hoverMain = true; this.debounceCloseNav(this.closeNav); },
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.DepartmentNavigation {
  background-color: var(--color-pop-over-background);
  height: 100vh;
  opacity: 0;
  display: none;
}

.DepartmentNavigation--active {
  display: block;
  opacity: 1;
}

.DepartmentNavigation__sub {
  margin-left: -1rem;
  padding-left: 1rem;
  border-left: 1px solid var(--color-grey-light);
}

.DepartmentNavigation__brand-icons img {
  height: 2rem;
  margin-right: 1rem;
  margin-top: 1rem;
  transition: transform 0.2s ease;
}
.no-touch .DepartmentNavigation__brand-icons img:hover {
  transform: scale(1.2);
  z-index: 10;
}
</style>
