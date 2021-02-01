<template>
  <div>
    <v-text-field
      v-model="getValue"
      :label="label"
      append-icon="mdi-magnify"
      placeholder="Press enter to search"
      hide-details
      outlined
      clearable
      @keyup.enter.native="setSearch()"
      @blur="setSearch()"
    />
  </div>
</template>

<script>
  export default {
    name: 'MealsSearch',
    props: {
      label: {
        type: String,
        default: 'Search',
      },
      value: {
        type: String,
        required: true,
      },
    },
    data: () => ({

    }),
    methods: {
      setSearch() {
        this.$emit('search');
      },
    },
    computed: {
      getValue: {
        get() {
          return this.value || '';
        },
        set(value) {
          this.$emit('input', value || '');
        },
      },
    },
  };
</script>