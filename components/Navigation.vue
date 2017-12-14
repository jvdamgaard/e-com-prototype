<template>
  <div>
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
          <nuxt-link to="/navigation/" class="hiddenOnLaptop" :class="[$style.iconLink, $style.menu]">
            <img src="/icons/ic_menu_white_24px.svg"/>
          </nuxt-link>
          <nuxt-link to="/" :class="$style.logo">
            <span>mrkt</span>
          </nuxt-link>
          <input type="search" placeholder="Søg efter produkter, brands, afdelinger eller inspiration" class="hiddenOnMobile visibleOnTablet" :class="$style.search">
          <nuxt-link to="/søg/" class="hiddenOnTablet" :class="$style.iconLink">
            <img src="/icons/ic_search_white_24px.svg"/>
          </nuxt-link>
          <nuxt-link to="/min-konto/" :class="$style.iconLink">
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

    <grid :class="$style.departments">
      <grid-col verticalCenter mobile="0" laptop="12">
        <ul class="inlineList">
          <li v-for="department in departments">
            <nuxt-link
              :class="{ [$style.activeDepartmentLink]: (activeDepartment.id === department.id && state.departmentNavActive)}"
              to="/"
              @mouseover.native="openDepartment(department)"
            >{{department.header}}</nuxt-link>
          </li>
        </ul>
      </grid-col>
    </grid>
    <grid :class="[
      $style.subDepartmentContainer,
      { [$style.subDepartmentActive]: state.departmentNavActive },
    ]">
      <grid-col :class="$style.subDepartmentBackground">
        <grid inner>
          <grid-col v-for="section in activeDepartment.sections" :key="section.id" :class="$style.subDepartment" laptop="3">
            <template v-if="section.type === 'navigationLinks'">
              <h3>{{section.data.header}}</h3>
              <nuxt-link v-for="link in section.data.links" :key="link.id" :to="link.url">
                <span
                  v-if="link.imageUrl"
                  :style="{ 'background-image': `url(${link.imageUrl}?w=80&h=80&fm=jpg&fit=pad)`}"
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
    };
  },
  computed: {
    ...mapState(['state', 'departments']),
  },
  methods: {
    ...mapActions({
      openDepartmentNav: 'state/openDepartmentNav',
    }),
    openDepartment(department) {
      this.activeDepartment = department;
      this.openDepartmentNav();
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

.departments {
  position: relative;
  background-color: var(--color-grey-dark);
  color: var(--color-white);
  z-index: 100;
}

.departments a {
  display: inline-block;
  color: var(--color-white);
  line-height: 3rem;
  padding: 0 0.5rem;
}
.activeDepartmentLink {
  background-color: var(--color-grey-lighter);
  color: var(--color-grey-darker) !important;
}
.departments a:hover {
  text-decoration: none;
  color: var(--color-primary) !important;
}

.offers {
  color: var(--color-yellow) !important;
  font-weight: bold;
}
.offers:hover {
  background-color: var(--color-yellow) !important;
  color: var(--color-grey-darker) !important;
}

.subDepartmentContainer {
  display: none !important;
  position: absolute;
  width: 100%;
  max-width: 85rem;
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
