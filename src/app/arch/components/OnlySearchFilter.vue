<template>
  <search-filter
    v-model="search"
    :label="getLabel"
    @search="submit()"
  />
</template>

<script>
import SearchFilter from 'Arch/components/crud/components/SearchFilter.vue';
import RouterMixin from 'Arch/mixins/RouterMixin';

const defaultOptions = {
  label: 'Pesquisar',
  searchAttribute: 'search',
};

export default {
  name: 'OnlySearchFilter',
  components: {
    SearchFilter,
  },
  mixins: [RouterMixin],
  props: {
    options: {
      type: Object,
      default() {
        return defaultOptions;
      },
    },
  },
  data: () => ({
    search: '',
  }),
  computed: {
    getLabel() {
      return this.options.label || defaultOptions.label;
    },
    getSearchAttribute() {
      return this.options.searchAttribute || defaultOptions.searchAttribute;
    },
  },
  created() {
    const { query } = this.$route;
    this.search = query[this.getSearchAttribute] || '';
  },
  methods: {
    submit() {
      const param = {};
      param[this.getSearchAttribute] = this.search || undefined;
      this.updateQueryParams(param);
    },
  },
};
</script>
