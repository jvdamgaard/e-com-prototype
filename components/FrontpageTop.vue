<template>
  <div>
    <!-- Mobile-tablet top -->
    <div :class="$style.mobile">
      <section>
        <banner :lazy="false" :banners="[{
            id: 87248725,
            image: {
              url: 'https://images.contentful.com/n8ckv2qtuzei/2NagGNTirugKgYQWUeIIs0/2ab3908af971d35c1dbfd4eb56ce9f6e/1067349_us_wireless-products_iphone-event_1800x360_desktop_r2.jpg',
              width: 900,
              height: 360,
            },
          }]"
        />
      </section>
      <section>
        <grid :class="$style.container">
          <grid-col><h2>Afdelinger</h2></grid-col>
          <grid-col
            v-for="department in departments"
            mobile="3"
            phablet="2"
            :class="$style.item"
            :key="department.titel"
          >
            <div
              :class="$style.icon"
              :style="{'background-image': `url('${department.iconSrc}')`,}"
            />
            {{department.titel}}
          </grid-col>
        </grid>
      </section>
      <section>
        <product-slider
          :initProducts="user.lastSeen"
          :lazy="false"
          header="Fortsæt hvor du slap"
        />
      </section>
      <section>
        <grid>
          <grid-col>
            <grid inner :class="$style.login">
              <grid-col
                mobile="4"
                phablet="3"
                tablet="2"
              >
                <div
                  :class="$style.icon"
                  :style="{'background-image': `url('https://jvdamgaard.github.io/e-com-prototype/icons/login.svg')`}"
                />
              </grid-col>
              <grid-col
                mobile="8"
                phablet="9"
                tablet="10"
                verticalCenter
              >
                <p>Log ind eller opret bruger</p>
                <p class="dimmed small">Opret dig få en bedre og hurtigere købsoplevelse.</p>
              </grid-col>
            </grid>
          </grid-col>
        </grid>
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
            :lazy="false"
          />
        </grid-col>
        <grid-col laptop="9" desktop="10">
          <nuxt-link to="/">
            <image-container
              :lazy="false"
              src="https://images.contentful.com/n8ckv2qtuzei/2NagGNTirugKgYQWUeIIs0/2ab3908af971d35c1dbfd4eb56ce9f6e/1067349_us_wireless-products_iphone-event_1800x360_desktop_r2.jpg"
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
  computed: mapState(['user', 'departments']),
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
@import '../assets/css/variables.css';

.container {
  background-color: var(--color-white);
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.item {
  composes: small from global;
  text-align: center;
}
.icon {
  composes: bgImage from global;
  composes: round from global;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 0.5rem;
}

@media (min-width: 48rem) {
  .icon {
    width: 4rem;
    padding-bottom: 4rem;
    margin-left: auto;
    margin-right: auto;
  }
}

.login {
  background-color: var(--color-white);
  padding: 2rem 1rem;
}
.login .icon {
  margin-bottom: 0;
}

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
