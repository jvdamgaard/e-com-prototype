<template>
  <div>
    <grid class="MainNavigation has-primary-background is-white is-aligned-vertical-center has-no-top-margin has-no-bottom-margin has-shadow">
      <div class="is-12-col">
        <div class="is-group">
          <nuxt-link to="/" class="MainNavigation__logo has-no-underline is-hidden-on-mobile is-visible-on-tablet">
            <img src="https://jvdamgaard.github.io/e-com-prototype/images/logo.svg" width="84" height="24" />
          </nuxt-link>
          <div
            class="MainNavigation__menu-icon"
            :class="{ 'MainNavigation__menu-icon--active': state.departmentNavActive }"
            @click="openDepartmentNav"
            @touchstart="openDepartmentNav"
            @mouseover="enterDepartment"
            @mouseleave="leaveDepartment"
          >
            <span class="is-hidden-on-tablet">&#8801;</span>
            <span class="is-hidden-on-mobile is-visible-on-tablet" style="white-space: nowrap">Afdelinger ▼</span>
          </div>
          <input type="text" placeholder="Søg i mere end 250.000 produkter" class="no-border">
          <btn type="yellow" class="MainNavigation__search-button">
            <img src="https://jvdamgaard.github.io/e-com-prototype/icons/search-black.svg" height="32" width="32" />
          </btn>
          <div
            class="MainNavigation__basket-icon"
            :class="{ 'MainNavigation__basket-icon--active': state.miniBasketActive }"
            @click="openMiniBasket"
            @touchstart="openMiniBasket"
            @mouseover="enterMiniBasket"
            @mouseleave="leaveMiniBasket"
          >
            <span class="MainNavigation__basket-icon__text is-hidden-on-mobile is-inline-on-laptop">Kurv ({{itemsInBasket}})</span>
            <span class="MainNavigation__basket-icon__text is-hidden-on-laptop">{{itemsInBasket}}</span>
            <icon-basket />
          </div>
        </div>
      </div>
    </grid>
    <department-navigation />
    <mini-basket />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import debounce from 'lodash/debounce';
import Grid from './Grid.vue';
import Btn from './Btn.vue';
import DepartmentNavigation from './DepartmentNavigation.vue';
import MiniBasket from './MiniBasket.vue';
import IconBasket from './IconBasket.vue';

export default {
  components: {
    Grid,
    Btn,
    DepartmentNavigation,
    MiniBasket,
    IconBasket,
  },
  data() {
    return {
      hoverDepartment: false,
      hoverMiniBasket: false,
    };
  },
  computed: {
    ...mapState(['user', 'state']),
    itemsInBasket() {
      return this.user.basket.items
        .reduce((accumulator, item) => (accumulator + item.quantity), 0);
    },
  },
  methods: {
    ...mapActions({
      openDepartmentNav: 'state/openDepartmentNav',
      openMiniBasketNow: 'state/openMiniBasket',
    }),
    openDepartmentNavigation() {
      if (this.hoverDepartment) {
        this.openDepartmentNav();
      }
    },
    debounceOpenDepartmentNav: debounce((openDepartmentNavigation) => {
      openDepartmentNavigation();
    }, 250),
    leaveDepartment() {
      this.hoverDepartment = false;
      this.debounceOpenDepartmentNav(this.openDepartmentNavigation);
    },
    enterDepartment() {
      this.hoverDepartment = true;
      this.debounceOpenDepartmentNav(this.openDepartmentNavigation);
    },
    openMiniBasketOverlay() {
      if (this.hoverMiniBasket) {
        this.openMiniBasket();
      }
    },
    debounceOpenMiniBasketOverlay: debounce((openMiniBasketOverlay) => {
      openMiniBasketOverlay();
    }, 250),
    leaveMiniBasket() {
      this.hoverMiniBasket = false;
      this.debounceOpenMiniBasketOverlay(this.openMiniBasketOverlay);
    },
    enterMiniBasket() {
      this.hoverMiniBasket = true;
      this.debounceOpenMiniBasketOverlay(this.openMiniBasketOverlay);
    },
    openMiniBasket() {
      if (this.user.basket.items.length > 0) {
        this.openMiniBasketNow();
      }
    },
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.MainNavigation {
  height: 3.5rem;
  overflow: hidden;
}

.MainNavigation__logo {
  display: block;
  height: 3.5rem;
  vertical-align: middle;
  margin-right: 1rem;
}

.MainNavigation__logo img {
  height: 3.5rem;
  width: auto;
  padding: 1.25rem 0;
}

.MainNavigation__menu-icon {
  display: block;
  font-size: 2.5rem;
  line-height: 1;
  height: 3rem;
  padding: 0rem 1rem 0.5rem;
  margin-top: 0.5rem;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
}
.MainNavigation__menu-icon--active {
  background-color: var(--color-white);
  color: var(--color-grey-darker);
  z-index: 10;
}
@media (min-width: 48rem) {
  .MainNavigation__menu-icon {
    font-size: 1rem;
    font-weight: bold;
    padding: 0.75rem 1rem 1.25rem;
  }
}
@media (min-width: 96rem) {
  .MainNavigation__menu-icon {
    float: right;
  }
}

.MainNavigation__search-button {
  line-height: 2.5rem!important;
  height: 2.5rem!important;
}

.MainNavigation__basket-icon {
  display: inline-block;
  height: 3rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  padding: 0 1rem;
  white-space: nowrap;
}
.MainNavigation__basket-icon__text {
  font-weight: bold;
  margin-right: 0.5rem;
}
.MainNavigation__basket-icon svg {
  height: 2rem;
  width: 2rem;
  display: inline-block;
  vertical-align: middle;
  margin: 0.25rem 0;
}
.MainNavigation__basket-icon path {
  transition: fill 0.25s ease;
  fill: var(--color-white);
}
.MainNavigation__basket-icon--active {
  background-color: var(--color-white);
  color: var(--color-grey-darker);
  z-index: 10;
}
.MainNavigation__basket-icon--active path {
  fill: var(--color-grey-darker);
}
</style>
