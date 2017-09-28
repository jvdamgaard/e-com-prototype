<template>
  <div class="DepartmentNavigation">
    <Grid class="has-no-top-margin has-no-bottom-margin">
      <div class="is-3-col-on-laptop is-2-col-on-desktop">
        <div class="has-white-background has-vertical-padding is-full-height">
          <NavigationItem titel="Velkommen" description="Log ind eller opret bruger" icon="/icons/login.svg" />
          <h4 class="has-padding">Afdelinger</h4>
          <NavigationItem titel="Elektronik" description="Bærbare, PC’er, Kabler" icon="/icons/electronic.png" />
          <NavigationItem titel="Mobil &amp; tablet" description="Smartphones, Power banks" icon="/icons/mobile.png" />
          <NavigationItem titel="Bøger, Film &amp; Musik" description="Literatur, Biografier" icon="/icons/books.png" />
          <NavigationItem titel="Dagligvarer" description="Skønhed, Helbred" icon="/icons/food.png" />
          <NavigationItem titel="Mode" description="Tøj, Sko, Ure, Smykker" icon="/icons/fashion.png" />
          <NavigationItem titel="Bolig &amp; indretning" description="Køkken, Møbler" icon="/icons/home.png" />
          <NavigationItem titel="Børn" description="Legetøj, Tøj, Spil, Sko" icon="/icons/children.png" />
          <NavigationItem titel="Køretøjer" description="Cykler, Biltilbehør" icon="/icons/vehicles.png" />
          <NavigationItem titel="Tilbud" description="I alle afdelinger" icon="/icons/offers.png" />
        </div>
      </div>
      <div class="is-9-col-on-laptop is-6-col-on-desktop">
        <Grid inner class="DepartmentNavigation__sub has-light-grey-background is-full-height">
          <div class="is-4-col has-vertical-padding">
            <template v-for="subDepartment in enhancedDepartments[0].col1.subDepartments">
              <h3><nuxt-link to="/" class="is-black">{{ subDepartment.titel }}</nuxt-link></h3>
              <ul v-if="subDepartment.subDepartments" class="is-unstyled-list has-small-bottom-margin">
                <li v-for="subSubs in subDepartment.subDepartments"><nuxt-link to="/" class="is-grey">{{ subSubs.titel }}</nuxt-link></li>
              </ul>
            </template>
          </div>
          <div class="is-4-col has-vertical-padding">
            <template v-for="subDepartment in enhancedDepartments[0].col2.subDepartments">
              <h3><nuxt-link to="/" class="is-black">{{ subDepartment.titel }}</nuxt-link></h3>
              <ul v-if="subDepartment.subDepartments" class="is-unstyled-list has-small-bottom-margin">
                <li v-for="subSubs in subDepartment.subDepartments"><nuxt-link to="/" class="is-grey">{{ subSubs.titel }}</nuxt-link></li>
              </ul>
            </template>
          </div>
          <div class="is-4-col is-bg-image" style="background-image: url('https://images.unsplash.com/photo-1494688290324-e296afa7dc45?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=')" />
        </Grid>
      </div>
    </Grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // eslint-disable-line
import Grid from './Grid.vue';
import NavigationItem from './NavigationItem.vue';

export default {
  components: {
    Grid,
    NavigationItem,
  },
  props: {
  },
  computed: {
    ...mapState(['departments']),
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
          titel: department.titel,
          col1,
          col2,
        };
      });
    },
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.DepartmentNavigation {
  background-color: var(--color-pop-over-background);
  height: 100vh;
}

.DepartmentNavigation__sub {
  margin-left: -1rem;
  padding-left: 1rem;
  border-left: 1px solid var(--color-grey-light);
}
</style>
