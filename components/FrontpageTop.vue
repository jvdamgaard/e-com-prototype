<template>
  <div>
    <!-- Mobile-tablet top -->
    <div :class="$style.mobile">
      <section>
        <banner :lazy="false" :banners="[{
            id: 87248725,
            image: {
              url: 'https://jvdamgaard.github.io/e-com-prototype/images/top-banner.jpg',
              width: 900,
              height: 360,
            },
          }]"
        />
      </section>
      <section>
        <product-slider
          :products="user.lastSeen"
          :lazy="false"
          header="Fortsæt hvor du slap"
        />
      </section>
    </div>

    <!-- Laptop-desktop top -->
    <div :class="$style.desktop">
      <grid :class="$style.desktopGrid">
        <grid-col laptop="3" desktop="2" rowOnLaptop="3">
          <main-departments
            :departments="departments"
            :expandDepartment="expandDepartment"
            :setNextDepartment="setNextDepartment"
            :activeDepartment="null"
          />
        </grid-col>
        <grid-col laptop="9" desktop="10">
          <nuxt-link to="/">
            <image-container
              :lazy="false"
              src="https://images-na.ssl-images-amazon.com/images/G/01/img17/consumer-electronics/desktop/1067349_us_wireless-products_iphone-event_1800x360_desktop_r2.jpg"
              :width="1800"
              :height="360"
            />
          </nuxt-link>
        </grid-col>
        <grid-col laptop="5" :class="$style.topMargin">
          <h2>Fortsæt hvor du slap</h2>
        </grid-col>
        <grid-col laptop="4" desktop="5" :class="$style.lastSeen">
          <nuxt-link to="/" :class="$style.lastSeenLink">vis hele historikken</nuxt-link>
        </grid-col>
        <grid-col
          v-for="(product, i) in user.lastSeen.slice(0,5)"
          :key="product.id"
          :laptop="i>2 ? '0' : '3'"
          desktop="2"
        >
          <product-card :product="product" :lazy="false" />
        </grid-col>
      </grid>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // eslint-disable-line
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import ImageContainer from './Image.vue';
import NavigationItem from './NavigationItem.vue';
import ProductCard from './ProductCard.vue';
import ProductSlider from './ProductSlider.vue';
import MainDepartments from './DepartmentNavigationMainDepartments.vue';
import Banner from './Banner.vue';

export default {
  components: {
    Grid,
    GridCol,
    ImageContainer,
    NavigationItem,
    ProductCard,
    ProductSlider,
    Banner,
    MainDepartments,
  },
  props: {},
  data() {
    return {
      departments: require('../static/json/departments.json'), //eslint-disable-line
    };
  },
  computed: mapState(['user']),
  methods: {
    expandDepartment(department) {
      // eslint-disable-next-line
      console.log('Should expand', department);
    },
    setNextDepartment(department) {
      // eslint-disable-next-line
      console.log('Should set next', department);
    },
  },
};
</script>


<style module>

.mobile {
  composes: hiddenOnLaptop from global;
}

.desktop {
  composes: hiddenOnMobile from global;
  composes: visibleOnLaptop from global;
}

.desktopGrid { margin-top: 1rem; }

.topMargin {
  margin-top: 2rem;
}

.lastSeen {
  margin-top: 2rem;
  text-align: right;
}
.lastSeenLink {
  composes: small from global;
  color: var(--color-grey-darker);
}
</style>
