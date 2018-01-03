<template>
  <div :class="{ [$style.mobileNavActive]: state.mobileNavActive }">
    <grid :class="$style.eyebrow">
      <grid-col mobile="0" tablet="12">
        <div :class="$style.group">
          <div :class="$style.promotion">
            <nuxt-link to="/legetoej/lego/" :class="$style.promotionLink">
              <strong class="red">25% rabat</strong> på alt LEGO indtil lørdag
            </nuxt-link>
          </div>
          <ul :class="$style.links">
            <li>
              <nuxt-link to="/tilbudsaviden/" :class="$style.link">Tilbudsavis</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/kundeservice/" :class="$style.link">Find butik</nuxt-link>
            </li>
            <li :class="$style.customerService">
              <nuxt-link to="/kundeservice/" :class="$style.link">Kundeservice</nuxt-link>
            </li>
          </ul>
        </div>
      </grid-col>
    </grid>

    <grid :class="$style.main">
      <grid-col verticalCenter>
        <div :class="$style.group">
          <a href="#" @touchstart.prevent="openMobileNav" @click.prevent="openMobileNav" class="hiddenOnLaptop" :class="[$style.iconLink, $style.menu]">
            <img src="/icons/ic_menu_white_24px.svg"/>
          </a>
          <nuxt-link to="/" :class="$style.logo">
            <span>mrkt</span>
          </nuxt-link>
          <input type="search" placeholder="Søg efter produkter, brands, afdelinger eller inspiration" class="hiddenOnMobile visibleOnTablet" :class="$style.search" v-model="searchQuery" @keyup.enter="search">
          <nuxt-link to="/søg/" class="hiddenOnTablet" :class="$style.iconLink">
            <img src="/icons/ic_search_white_24px.svg"/>
          </nuxt-link>
          <nuxt-link to="/mit-mrkt/" :class="$style.iconLink">
            <img src="/icons/ic_perm_identity_white_24px.svg"/>
          </nuxt-link>
          <nuxt-link to="/favoritter/" class="hiddenOnMobile visibleOnPhablet" :class="$style.iconLink">
            <img src="/icons/ic_favorite_border_white_24px.svg"/>
          </nuxt-link>
          <nuxt-link to="/kurv/" :class="$style.iconLink">
            <img src="/icons/ic_bag_outline_white_24px.svg"/>
          </nuxt-link>
        </div>
      </grid-col>
    </grid>

    <grid fullWidthUntil="tablet" :class="$style.departments">
      <grid-col mobile="12">
        <div class="hiddenOnLaptop">
          <p class="h2">{{myAccountNavigation.header}}</p>
          <ul class="inlineList">
            <li v-for="department in myAccountNavigation.departments">
              <nuxt-link
                to="/"
              >
                <span
                  v-if="department.imageUrl"
                  :style="{ 'background-image': `url(${department.imageUrl}?w=112&h=112&fm=jpg)`}"
                  class="bgImage"
                />
                {{department.header}}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <p class="h2 hiddenOnLaptop">{{ mainNavigation.header }}</p>
        <ul class="inlineList">
          <li v-for="department in mainNavigation.departments">
            <nuxt-link
              :class="[
                $style.departmentLink,
                { [$style.activeDepartmentLink]: (activeDepartment.id === department.id && state.departmentNavActive)}
              ]"
              to="/"
              @mouseover.native="overDepartment(department)"
              @mouseleave.native="overDepartment()"
            >
              <span
                v-if="department.imageUrl"
                :style="{ 'background-image': `url(${department.imageUrl}?w=112&h=112&fm=jpg)`}"
                class="bgImage"
              />
              {{department.header}}
            </nuxt-link>
          </li>
        </ul>

        <div class="hiddenOnLaptop">
          <p class="h2">{{moreMrktNavigation.header}}</p>
          <ul class="inlineList">
            <li v-for="department in moreMrktNavigation.departments">
              <nuxt-link
                to="/"
              >
                <span
                  v-if="department.imageUrl"
                  :style="{ 'background-image': `url(${department.imageUrl}?w=112&h=112&fm=jpg)`}"
                  class="bgImage"
                />
                {{department.header}}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </grid-col>
    </grid>
    <grid :class="[
      $style.subDepartmentContainer,
      { [$style.subDepartmentActive]: state.departmentNavActive },
    ]">
      <grid-col :class="$style.subDepartmentBackground" mobile="0" laptop="12">
        <grid inner>
          <grid-col v-for="section in activeDepartment.sections" :key="section.id" :class="$style.subDepartment" laptop="3">
            <template v-if="section.type === 'navigationLinks'">
              <h3>{{section.data.header}}</h3>
              <nuxt-link v-for="link in section.data.links" :key="link.id" :to="link.url">
                <span
                  v-if="link.imageUrl"
                  :style="{ 'background-image': `url(${link.imageUrl}?w=112&h=112&fm=jpg)`}"
                  class="bgImage"
                />
                {{link.titel}}
              </nuxt-link>
            </template>
            <template v-if="section.type === 'navigationBanners'">
              <nuxt-link
                v-for="banner in section.data.banners"
                :key="banner.id"
                :to="banner.url"
                :class="$style.banner"
              >
                <image-container
                  :lazy="true"
                  :src="banner.imageUrl"
                  :width="576"
                  :height="Math.round(((1016 - (32 * section.data.banners.length)) / section.data.banners.length) - 12)"
                />
                <h2 :class="[$style.bannerText, $style[`bannerText${banner.headerColor}`]]">{{ banner.header }}</h2>
              </nuxt-link>
            </template>
          </grid-col>
        </grid>
      </grid-col>
    </grid>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import debounce from 'lodash/debounce';
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Btn from './Btn.vue';
import ImageContainer from './Image.vue';

export default {
  components: {
    Grid,
    GridCol,
    Btn,
    ImageContainer,
  },
  data() {
    return {
      activeDepartment: {},
      searchQuery: '',
      nextDepartment: null,
    };
  },
  computed: {
    ...mapState(['state', 'navigation']),
    mainNavigation() {
      return this.navigation[process.env.CTF_MAIN_NAVIGATION_ID];
    },
    myAccountNavigation() {
      return this.navigation[process.env.CTF_MY_ACCOUNT_NAVIGATION_ID];
    },
    moreMrktNavigation() {
      return this.navigation[process.env.CTF_MORE_MRKT_NAVIGATION_ID];
    },
  },
  methods: {
    ...mapActions({
      openDepartmentNav: 'state/openDepartmentNav',
      openMobileNav: 'state/openMobileNav',
    }),
    debounceOpenDepartment: debounce((openDepartment) => {
      openDepartment();
    }, 200),
    debounceOpenDepartmentFast: debounce((openDepartment) => {
      openDepartment();
    }, 50),
    openDepartment() {
      if (this.nextDepartment) {
        this.activeDepartment = this.nextDepartment;
        this.openDepartmentNav();
      }
    },
    overDepartment(department) {
      if (this.state.mobileNavActive) {
        return;
      }
      this.nextDepartment = department;
      if (this.state.departmentNavActive) {
        this.debounceOpenDepartmentFast(this.openDepartment);
      } else {
        this.debounceOpenDepartment(this.openDepartment);
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

.eyebrow {
  composes: small from global;
  line-height: 2rem;
  color: var(--color-grey-darker);
}

.eyebrow a { color: var(--color-grey-darker); }

.group {
  composes: group from global;
  white-space: nowrap;
}

.promotion {
  /*display: block;*/
  width: 100%;
}
.links {
  composes: inlineList from global;
  text-align: right;
}
.links li:not(:last-child) {
  margin: 0 1rem;
}

.main {
  background-color: var(--color-grey-darker);
  height: 3.5rem;
  color: var(--color-white);
}

.main a { color: var(--color-white); }
.main a:hover { text-decoration: none; }


.logo {
  font-size: 2rem;
  line-height: 3.35rem;
  font-weight: 700;
  margin-bottom: 0.15rem;
  margin-right: 0.5rem;
}

@media (max-width: 48rem) {
  .logo { flex-grow: 1; }
}
@media (min-width: 64rem) {
  .logo { margin-right: 1rem; }
}

.search {
  width: auto;
  flex-grow: 1;
  border: 0 !important;
  border-radius: 1.25rem;
  margin: 0 1rem;
  padding: 0 2.5rem 0 1.25rem;
}

.iconLink {
  height: 3rem;
  width: 3rem;
  text-align: center;
  position: relative;
}

@media (min-width: 64rem) {
  .iconLink { width: 4rem; }
}

.iconLink img {
  width: 1.75rem;
  height: 1.75rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}


.menu {
  width: 3rem!important;
  margin-right: 0.5rem;
}

@media (min-width: 25rem) {
  .menu { margin-right: 1rem; }
}

@media (max-width: 1023px) {
  .departments {
    font-size: 0.8125rem;
    position: fixed;
    top: 0;
    left: -20rem;
    width: 20rem;
    height: 100%;
    z-index: 100;
    background-color: var(--color-grey-lighter);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transform: translate3d(0, 0, 0);
    transition: transform 0.2s ease;
  }
  .mobileNavActive .departments {
    transform: translate3d(20rem, 0, 0);
  }
  .departments p {
    margin: 2rem 1rem 1rem;
  }
  .departments li { display: block; }
  .departments a {
    position: relative;
    display: block;
    width: 100%;
    line-height: 4rem;
    background-color: var(--color-white);
    margin: 1px 0;
    padding: 0 1rem;
    color: var(--color-black);
  }
  .departments a:after {
    content: '';
    position: absolute;
    top: 0;
    right: 1rem;
    width: 1.5rem;
    height: 4rem;
    background-image: url(/icons/ic_keyboard_arrow_right_grey_24px.svg);
    background-repeat: no-repeat;
    background-position: center;
  }
  :global(.no-touch) .departments a:hover:after {
    background-image: url(/icons/ic_keyboard_arrow_right_primary_24px.svg);
  }
  .departments a span {
    display: inline-block;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    box-shadow: 0 0 0 1px var(--color-grey-light);
    border: 0.125rem solid var(--color-grey-lighter);
    background-color: var(--color-white);
    vertical-align: middle;
    margin: 0.25rem 0.5rem 0.25rem 0;
    transition: all 0.2s ease;
  }
  :global(.no-touch) .departments a:hover span {
    box-shadow: 0 0 0 1px var(--color-primary);
  }
}

@media (min-width: 1024px) {
  .departments {
    font-weight: bold;
    position: relative;
    background-color: var(--color-grey-dark);
    color: var(--color-white);
    z-index: 100;
  }

  .departments a {
    font-size: 0.8125rem;
    display: inline-block;
    color: var(--color-white);
    line-height: 3rem;
    padding: 0 0.5rem;
  }
}
@media (min-width: 75rem) {
  .departments a {
    font-weight: normal;
    font-size: 1rem;
  }
}
@media (min-width: 90rem) {
  .departments a {
    padding: 0 1rem;
  }
}

:global(.no-touch) .departmentLink:hover {
  background-color: var(--color-grey-lighter);
  color: var(--color-grey-darker) !important;
}
.activeDepartmentLink {
  background-color: var(--color-grey-lighter);
  color: var(--color-grey-darker) !important;
}
.departments a:hover {
  text-decoration: none;
}
:global(.no-touch) .departments a:hover {
  color: var(--color-primary) !important;
}

.offers {
  color: var(--color-yellow) !important;
  font-weight: bold;
}
:global(.no-touch) .offers:hover {
  background-color: var(--color-yellow) !important;
  color: var(--color-grey-darker) !important;
}

.subDepartmentContainer {
  display: none !important;
  position: absolute;
  width: 100%;
  max-width: 90rem;
  left: 0;
}

.subDepartmentActive {
  display: block !important;
}

.subDepartmentBackground {
  background-color: var(--color-grey-lighter);
  padding: 1rem;
  z-index: 100;
  position: relative;
}
@media (min-width: 96rem) {
  .subDepartmentBackground { padding: 2rem; }
}

.subDepartment {
}

.subDepartment a, .subDepartment h3 {
  line-height: 1.75rem;
}

.subDepartment a {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-grey-darker);
  transition: all 0.2s ease;
}

.linkWithIcon {
  line-height: 3rem;
}

.subDepartment span {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  box-shadow: 0 0 0 1px var(--color-grey-light);
  border: 0.125rem solid var(--color-grey-lighter);
  background-color: var(--color-white);
  vertical-align: middle;
  margin: 0.25rem 0.5rem 0.25rem 0;
  transition: all 0.2s ease;
}

:global(.no-touch) .subDepartment a:hover {
  color: var(--color-primary);
  text-decoration: none;
}
:global(.no-touch) .subDepartment a:hover span {
  box-shadow: 0 0 0 1px var(--color-primary);
}

.banner {
  position: relative;
  display: block;
  box-shadow: 0 0 0 1px var(--color-grey-light);
  border: 0.125rem solid var(--color-grey-lighter);
}
:global(.no-touch) .banner:hover {
  box-shadow: 0 0 0 1px var(--color-primary);
}
.banner:not(:first-child) { margin-top: 1rem; }
.bannerText {
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
  top: calc(50% - 0.7rem);
  color: var(--color-black);
}
.bannerTextWhite {
  composes: bannerText;
  color: var(--color-white);
}
</style>
