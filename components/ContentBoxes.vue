<template>
  <grid>
    <grid-col
      mobile="0"
      :phablet="contentBoxes.length > 1 ? '0' : '3'"
      :laptop="contentBoxes.length > 1 ? '1' : '3'"
      :desktop="contentBoxes.length > 1 ? '2' : '3'"

    />
    <grid-col
      v-for="contentBox in contentBoxes"
      :key="contentBox.id"
      phablet="6"
      :laptop="contentBoxes.length > 1 ? '5' : '6'"
      :desktop="contentBoxes.length > 1 ? '4' : '6'"
    >
      <content-box v-bind="contentBox.data" :lazy="lazy" />
    </grid-col>
  </grid>
</template>

<script>
import Grid from '../components/Grid.vue';
import GridCol from '../components/GridCol.vue';
import ContentBox from '../components/ContentBox.vue';

export default {
  components: {
    Grid,
    GridCol,
    ContentBox,
  },
  props: {
    contentBoxes: Array,
    lazy: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';
</style>
