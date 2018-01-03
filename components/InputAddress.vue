<template>
  <div class="autocomplete-container">
    <input type="search" required :value="value" ref="address">
    <!-- Suggestions will appear here -->
  </div>

</template>

<script>
const dawaAutocomplete2 = require('dawa-autocomplete2');

export default {
  props: {
    changeValue: Function,
    value: String,
  },
  data() {
    return {
      autocomplete: null,
    };
  },
  mounted() {
    const { changeValue } = this;
    this.autocomplete = dawaAutocomplete2.dawaAutocomplete(this.$refs.address, {
      select(val) {
        let address = `${val.data.vejnavn} ${val.data.husnr}`;
        if (val.data.etage || val.data.dør) { address += ','; }
        if (val.data.etage) { address += ` ${val.data.etage}.`; }
        if (val.data.dør) { address += ` ${val.data.dør}.`; }
        if (val.data.supplerendebynavn) { address += `, ${val.data.supplerendebynavn}`; }

        changeValue({
          address,
          city: val.data.postnrnavn,
          postal_code: val.data.postnr,
        });
      },
    });
  },
  destroyed() {
    if (this.autocomplete) {
      this.autocomplete.destroy();
    }
  },
};
</script>

<style>
@import '../assets/css/variables.css';
.autocomplete-container {
    position: relative;
}

.dawa-autocomplete-suggestions {
    margin: 0.25rem 0 0 0;
    padding: 0;
    text-align: left;
    background: var(--color-white);
    position: absolute;
    left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: 0 0.125rem 0.75rem rgba(0,0,0,0.2);
    overflow-y: auto;
    max-height: 15rem;
}

.dawa-autocomplete-suggestions .dawa-autocomplete-suggestion {
    margin: 0;
    list-style: none;
    cursor: pointer;
    padding: 0.5em;
}

.dawa-autocomplete-suggestions .dawa-autocomplete-suggestion.dawa-selected,
.dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:hover {
    background: var(--color-grey-lighter);
}
</style>
