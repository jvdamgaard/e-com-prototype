<template>
  <div>
    <Grid class="MainNavigation has-primary-background is-white is-aligned-vertical-center has-no-top-margin has-no-bottom-margin has-shadow">
      <div class="is-2-col is-1-col-on-desktop is-hidden-on-mobile is-visible-on-laptop" style="white-space: nowrap;">
        <nuxt-link to="/" class="MainNavigation__logo has-no-underline">
          <img src="https://jvdamgaard.github.io/e-com-prototype/images/logo.svg" width="112" height="32" />
        </nuxt-link>
      </div>
      <div class="is-2-col is-1-col-on-tablet">
        <div
          class="MainNavigation__menu-icon is-aligned-center"
          :class="{ 'MainNavigation__menu-icon--active': state.departmentNavActive }"
          @click="openDepartmentNav"
          @touchstart="openDepartmentNav"
          @mouseover="openDepartmentNav">
          <div>&#8801;</div>
        </div>
      </div>
      <div class="is-8-col is-10-col-on-tablet is-7-col-on-laptop is-8-col-on-desktop">
        <div class="is-group">
          <input type="text" placeholder="Søg i mere end 250.000 produkter" class="no-border">
          <Btn type="yellow" class="MainNavigation__search-button">
            <img src="https://jvdamgaard.github.io/e-com-prototype/icons/search-black.svg" height="32" width="32" />
          </Btn>
        </div>
      </div>
      <div class="is-2-col is-1-col-on-tablet is-2-col-on-laptop is-aligned-center">
        <div
          class="MainNavigation__basket-icon"
          :class="{ 'MainNavigation__basket-icon--active': state.miniBasketActive }"
          @click="openMiniBasket"
          @touchstart="openMiniBasket"
          @mouseover="openMiniBasket">
          <span class="MainNavigation__basket-icon__text is-hidden-on-mobile is-inline-on-laptop">Kurv ({{itemsInBasket}})</span>
          <svg width="32px" height="32px" viewBox="0 0 32 32">
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="elements/icon/basket/black" fill-rule="nonzero" fill="#333333">
                <path d="M3.89999966,4 C3.40292985,4 3,4.40294785 3,4.89999966 C3,5.39705448 3.40292985,5.79999933 3.89999966,5.79999933 L6.8906386,5.79999933 C8.38019804,9.48924794 9.84740749,13.1852436 11.3249969,16.8812542 L9.96563745,20.1531129 C9.85175749,20.4259028 9.88379748,20.7548227 10.0481674,21.0004926 C10.2125674,21.2461625 10.5044072,21.4012325 10.7999971,21.4000025 L25.7999915,21.4000025 C26.2754613,21.4066025 26.7128012,20.9755326 26.7128012,20.5000028 C26.7128012,20.024473 26.2754613,19.5932832 25.7999915,19.6000031 L12.1499966,19.6000031 L12.9281363,17.7437538 L27.3749909,16.5906143 C27.7531408,16.5609143 28.0954406,16.2663444 28.1812406,15.8968645 L29.9812399,8.09687346 C30.0989599,7.57150766 29.6383701,6.99824388 29.0999903,6.99999888 L9.30935769,6.99999888 L8.33435806,4.56249979 C8.20085811,4.23255391 7.85591824,4.000012 7.49999837,4 L3.89999966,4 Z M10.0312474,8.7999982 L27.9656307,8.7999982 L26.5687412,14.8562459 L12.8906364,15.9437545 L10.0312474,8.7999982 Z M13.799996,22.0000022 C12.1538066,22.0000022 10.7999971,23.3537817 10.7999971,25.0000011 C10.7999971,26.6461905 12.1538066,28 13.799996,28 C15.4461854,28 16.7999949,26.6461905 16.7999949,25.0000011 C16.7999949,23.3538117 15.4461854,22.0000022 13.799996,22.0000022 Z M22.7999926,22.0000022 C21.1538033,22.0000022 19.7999938,23.3538117 19.7999938,25.0000011 C19.7999938,26.6461905 21.1538033,28 22.7999926,28 C24.446182,28 25.7999915,26.6461905 25.7999915,25.0000011 C25.7999915,23.3537817 24.446182,22.0000022 22.7999926,22.0000022 Z M13.799996,23.8000016 C14.4734058,23.8000016 14.9999956,24.3265914 14.9999956,25.0000011 C14.9999956,25.6734109 14.4734058,26.2000007 13.799996,26.2000007 C13.1266463,26.2000007 12.5999965,25.6733809 12.5999965,25.0000011 C12.5999965,24.3266214 13.1266463,23.8000016 13.799996,23.8000016 Z M22.7999926,23.8000016 C23.4733424,23.8000016 23.9999922,24.3266214 23.9999922,25.0000011 C23.9999922,25.6733809 23.4733424,26.2000007 22.7999926,26.2000007 C22.1265829,26.2000007 21.5999931,25.6734109 21.5999931,25.0000011 C21.5999931,24.3265914 22.1265829,23.8000016 22.7999926,23.8000016 Z" id="Basket"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </Grid>
    <DepartmentNavigation />
    <MiniBasket />
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'; // eslint-disable-line
  import Grid from './Grid.vue';
  import Btn from './Btn.vue';
  import DepartmentNavigation from './DepartmentNavigation.vue';
  import MiniBasket from './MiniBasket.vue';

  export default {
    components: {
      Grid,
      Btn,
      DepartmentNavigation,
      MiniBasket,
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

  .MainNavigation__menu-icon {
    font-size: 2.5rem;
    line-height: 2.5rem;
    margin-top: 0.5rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .MainNavigation__menu-icon--active {
    background-color: var(--color-white);
    color: var(--color-grey-dark);
    z-index: 10;
  }

  .MainNavigation__logo {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .MainNavigation__logo img {
    height: 2rem;
    vertical-align: middle;
  }

  .MainNavigation__search-button {
    line-height: 2.5rem!important;
    height: 2.5rem!important;
  }

  .MainNavigation__basket-icon {
    display: inline-block;
    width: 100%;
    height: 3rem;
    margin-top: 0.5rem;
    cursor: pointer;
    transition: all 0.25s ease;
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
    color: var(--color-grey-dark);
    z-index: 10;
  }
  .MainNavigation__basket-icon--active path {
    fill: var(--color-grey-dark);
  }
</style>
