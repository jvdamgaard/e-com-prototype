<template>
  <div :class="$style.variants" v-if="product.id === 13">
    <p><strong class="is-dimmed">Hukommelse:</strong> 8 GB</p>
    <ul class="is-inline-list" :class="$style.variantWithPrice">
      <li :class="$style.activeVariant">8 GB</li>
      <li>16 GB <span>+ 1.720,00 kr.</span></li>
      <li>32 GB <span>+ 5.160,00 kr.</span></li>
    </ul>
    <p><strong class="is-dimmed">Lagringsplads:</strong> 1 TB Fusion Drive</p>
    <ul class="is-inline-list" :class="$style.variantWithPrice">
      <li :class="$style.activeVariant">1 TB Fusion Drive</li>
      <li>2 TB Fusion Drive <span>+ 1.720,00 kr.</span></li>
      <li>256 GB SSD <span>+ 860,00 kr.</span></li>
      <li>512 GB SSD <span>+ 2.580,00 kr.</span></li>
      <li>1 TB SSD <span>+ 6.020,00 kr.</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.variants {
  margin-bottom: 2rem;
}
.variants ul {
  margin-bottom: 2rem;
}

.variantWithPrice li {
  width: 100%;
}
.variantWithPrice span {
  color: var(--color-grey-dark);
  float: right;
}

.variants li {
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid var(--color-grey-light);
  padding: 0.75rem 0.5rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.variants li:hover {
  border-color: var(--color-grey-dark);
}

.variants li.activeVariant {
  border-color: var(--color-primary);
}
</style>
