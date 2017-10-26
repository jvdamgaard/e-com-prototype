<template>
  <div>
    <div
      :class="[
        $style.main,
        {
          [$style.active]: this.state.departmentNavActive,
          [$style.beyond]: activeDepartment,
        },
      ]"
    >
      <mobile-navigation-back
        :back="expandDepartment"
        :close="closeNav"
      />
      <grid :class="$style.inner">
        <grid-col>
          <h3 :class="$style.header">Mit bilka</h3>
          <navigation-item
            titel="Log ind"
            description="Log ind eller opret bruger"
            icon="https://jvdamgaard.github.io/e-com-prototype/icons/login.svg"
            lazy
          />
          <h3 :class="$style.header">Shop efter afdeling</h3>
          <navigation-item
            v-for="department in departments"
            :titel="department.titel"
            :description="department.description"
            :icon="department.iconSrc"
            :key="department.titel"
            @click.native="expandDepartment(department.titel)"
            lazy
          />
          <h3 :class="$style.header">Mere fra bilka</h3>
          <navigation-item titel="Tilbudsavis" />
          <navigation-item titel="Find butik" />
          <navigation-item titel="Kundeservice" />
        </grid-col>
      </grid>
    </div>
    <template v-for="department in departments">
      <div
        :class="[
          $style.sub,
          {
            [$style.active]: department.titel === activeDepartment,
            [$style.beyond]: department.titel === activeDepartment && activeSubDepartment,
          },
        ]"
      >
        <mobile-navigation-back
          :back="expandDepartment"
          :titel="department.titel"
          :close="closeNav"
        />
        <grid :class="$style.inner">
          <grid-col :class="$style.promotionContainer">
            <nuxt-link
              to="/"
              :class="$style.promotionLink"
              v-lazy:background-image="department.promotion.imageSrc"
              :key="department.titel"
            >
              <btn
                v-if="department.promotion.btnLabel"
                type="yellow"
                height="small"
                :class="$style.promotionButton"
              >
                {{department.promotion.btnLabel}}
              </btn>
            </nuxt-link>
          </grid-col>
          <grid-col>
            <navigation-item
              titel="Vis alle produkter"
              :icon="department.iconSrc"
            />
            <h3 :class="$style.header">Shop efter afdeling</h3>
            <navigation-item
              v-for="subDepartment in department.subDepartments"
              :titel="subDepartment.titel"
              :key="subDepartment.titel"
              @click.native="expandSubDepartment(subDepartment.titel)"
            />
            <h3 :class="$style.header">Shop efter brand</h3>
            <navigation-item
              v-for="brand in department.brands"
              :key="brand.imgSrc"
              :titel="brand.titel"
              :icon="brand.imgSrc"
            />
          </grid-col>
        </grid>
      </div>
      <div
        v-for="subDepartment in department.subDepartments"
        :class="[
          $style.subSub,
          { [$style.active]: subDepartment.titel === activeSubDepartment },
        ]"
      >
        <mobile-navigation-back
          :back="expandSubDepartment"
          :titel="subDepartment.titel"
          :close="closeNav"
        />
        <grid :class="$style.inner">
          <grid-col :class="$style.departments">
            <NavigationItem
              titel="Vis alle produkter"
            />
            <h3 :class="$style.header">Shop efter afdeling</h3>
            <NavigationItem
              v-for="subSubDepartment in subDepartment.subDepartments"
              :titel="subSubDepartment.titel"
              :key="subSubDepartment.titel"
            />
          </grid-col>
        </grid>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import NavigationItem from './NavigationItem.vue';
import MobileNavigationBack from './MobileNavigationBack.vue';
import Btn from './Btn.vue';

export default {
  components: {
    Grid,
    GridCol,
    NavigationItem,
    Btn,
    MobileNavigationBack,
  },
  data() {
    return {
      activeDepartment: null,
      activeSubDepartment: null,
      departments: [],
    };
  },
  computed: {
    ...mapState(['state']),
  },
  created() {
    if (!process.browser) { return; }
    fetch('https://jvdamgaard.github.io/e-com-prototype/json/departments.json').then(response => response.json()).then((departments) => {
      this.departments = departments;
    });
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

<style module>
@import '../assets/css/variables.css';

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--color-grey-lighter);
  padding: 3.5rem 1px 3rem 1px;
  transition: transform 0.5s ease;
}

.main {
  composes: hiddenOnTablet from global;
  composes: navigation;
  transform: translate3d(-100%, 0, 0);
  z-index: 2000;
}
.sub {
  composes: hiddenOnTablet from global;
  composes: navigation;
  transform: translate3d(100%, 0, 0);
  z-index: 2001;
}
.subSub {
  composes: hiddenOnTablet from global;
  composes: navigation;
  transform: translate3d(100%, 0, 0);
  z-index: 2002;
}

.active { transform: translate3d(0, 0, 0); }
.beyond { transform: translate3d(-25%, 0, 0); }

.inner {
  margin: 0;
  padding: 0 0 5rem;
  height: calc(100vh - 3.5rem);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.header { padding: 2rem 1rem 1rem; }

.promotionContainer {
  padding: 1rem 1rem 0;
}
.promotionLink {
  composes: bgImage from global;
  width: 100%;
  display: block;
  text-decoration: none !important;
  padding-top: 40%;
}
.promotionButton {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
}

.brands { padding: 1rem; }
.brandIcon {
  height: 2rem;
  margin-right: 1rem;
  margin-top: 1rem;
}

</style>
