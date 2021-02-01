<template>
  <div>
    <input-text
      v-model="getValue"
      :label="label"
      append-icon="mdi-magnify"
      hide-details
      @keyup.enter.native="setSearch()"
      @blur="setSearch()"
    />
  </div>
</template>

<script>

export default {
  name: 'SearchFilter',
  props: {
    label: {
      type: String,
      default: 'Pesquisar',
    },
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    getValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    setSearch() {
      this.$emit('search');
    },
  },
};
</script>
