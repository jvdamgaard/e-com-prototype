<template>
  <div>
    <grid :class="$style.container">
      <grid-col verticalCenter>
        <div :class="$style.group">
          <nuxt-link to="/" :class="$style.logo">
            MARKET
          </nuxt-link>
          <div
            :class="state.departmentNavActive ? $style.menuIconActive : $style.menuIcon"
            @click="openDepartmentNav"
            @touchstart="openDepartmentNav"
            @mouseover="enterDepartment"
            @mouseleave="leaveDepartment"
          >
            <span :class="$style.burgerIcon">&#8801;</span>
            <span :class="$style.textMenu">Afdelinger ▼</span>
          </div>
          <input type="text" placeholder="Søg i mere end 250.000 produkter" :class="$style.searchInput" v-model="searchQuery" @keyup.enter="search">
          <btn type="yellow" :class="$style.searchButton" @click.native="search">
            <img src="https://jvdamgaard.github.io/e-com-prototype/icons/search-black.svg" height="32" width="32" />
          </btn>
          <nuxt-link
            :class="state.miniBasketActive ? $style.basketIconActive : $style.basketIcon"
            to="/kurv/"
            @touchstart.native="openMiniBasket"
            @mouseover.native="enterMiniBasket"
            @mouseleave.native="leaveMiniBasket"
          >
            <span :class="$style.basketFullText">Kurv ({{itemsInBasket}})</span>
            <span :class="$style.basketShortText">{{itemsInBasket}}</span>
            <img
              :src="`https://jvdamgaard.github.io/e-com-prototype/icons/basket-${state.miniBasketActive ? 'grey-darker' : 'white'}.svg`"
              height="32"
              width="32"
            />
          </nuxt-link>
        </div>
      </grid-col>
    </grid>
    <department-navigation />
    <mini-basket />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import debounce from 'lodash/debounce';
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Btn from './Btn.vue';
import DepartmentNavigation from './DepartmentNavigation.vue';
import MiniBasket from './MiniBasket.vue';

export default {
  components: {
    Grid,
    GridCol,
    Btn,
    DepartmentNavigation,
    MiniBasket,
  },
  data() {
    return {
      hoverDepartment: false,
      hoverMiniBasket: false,
      searchQuery: '',
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
    search() {
      this.$router.push(`/search/${this.searchQuery}/`);
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  composes: shadow from global;
  background-color: var(--color-primary);
  color: var(--color-white);
  margin-top: 0!important;
  margin-bottom: 0!important;
  height: 3.5rem;
  overflow: hidden;
}

.group { composes: group from global; }

.logo {
  composes: hiddenOnMobile from global;
  composes: visibleOnTablet from global;
  font-size: 1.5rem;
  font-weight: 900;
  text-decoration: none;
  display: block;
  line-height: 3.5rem;
  margin-right: 1rem;
  color: var(--color-white);
}

.menuIcon {
  display: block;
  font-size: 2.5rem;
  line-height: 1;
  height: 3rem;
  padding: 0rem 1rem 0.5rem;
  margin: 0.5rem 0 0 -1rem;
  cursor: pointer;
  transition: all 0.25s ease;
}
.menuIconActive {
  composes: menuIcon;
  background-color: var(--color-white);
  color: var(--color-grey-darker);
  z-index: 10;
}
@media (min-width: 48rem) {
  .menuIcon {
    font-size: 1rem;
    font-weight: bold;
    padding: 0.75rem 1rem 1.25rem;
    margin-right: 1rem;
    margin-left: 0;
  }
}
@media (min-width: 96rem) {
  .menuIcon {
    float: right;
  }
}

.burgerIcon { composes: hiddenOnTablet from global; }
.textMenu {
  composes: hiddenOnMobile from global;
  composes: visibleOnTablet from global;
  white-space: nowrap;
}

.searchInput { border: 0 !important; }

.searchButton {
  composes: hiddenOnMobile from global;
  composes: visibleOnTablet from global;
  line-height: 2.5rem!important;
  height: 2.5rem!important;
  width: auto!important;
}

.basketIcon {
  display: inline-block;
  height: 3rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  padding: 0 0.5rem;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  color: var(--color-white);
  text-decoration: none !important;
}
.basketIcon img {
  height: 2rem;
  width: 2rem;
  display: inline-block;
  vertical-align: middle;
  margin: 0.25rem 0;
}
.basketIconActive {
  composes: basketIcon;
  background-color: var(--color-white);
  color: var(--color-grey-darker);
  z-index: 10;
}

.basketIconText {
  font-weight: bold;
  margin-right: 0rem;
}
.basketFullText {
  composes: hiddenOnMobile from global;
  composes: inlineOnLaptop from global;
  composes: basketIconText;
}
.basketShortText {
  composes: hiddenOnLaptop from global;
  composes: basketIconText;
}

@media (min-width: 48rem) {
  .basketIcon {
    padding: 0 1rem;
    margin-left: 1rem;
  }
  .basketIconText {
    margin-right: 0.5rem;
  }
}
</style>
