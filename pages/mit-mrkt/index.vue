<template>
  <div :class="$style.container">
    <article class="theme-None">
      <section>
        <grid full-width-until="phablet">
          <grid-col tablet="4" laptop="3" desktop="2">
            <span class="small dimmed">Velkommen</span><br>
            {{ user.personalInformation.full_name }}
          </grid-col>
          <grid-col mobile="0" tablet="8" laptop="9" desktop="10">
            Tiles
          </grid-col>
        </grid>
      </section>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // eslint-disable-line
import Grid from '../../components/Grid.vue';
import GridCol from '../../components/GridCol.vue';

export default {
  components: {
    Grid,
    GridCol,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['user']),
  },
  fetch({ redirect }) {
    if (process.browser && !window.auth.currentUser()) {
      redirect('/log-ind/');
    }
  },
  beforeCreate() {
    if (process.browser && !window.auth.currentUser()) {
      this.$router.push('/log-ind/');
    }
  },
};
</script>

<style module>

</style>
