<template>
  <div
    id="category"
    class="DappFormFieldsCategory">
    <p class="heading"><span class="checkmark"><IconCheckmark :fill="selectedCategory.length ? 'purple' : 'gray'"/></span>Category <span class="required">(required)</span></p>
    <div
      id="categoryField"
      class="input-wrapper">
      <BaseDropdown
        :important="true"
        :options="categoryOptions"
        :selected="selectedCategory ? $t(`categoryOptions.${this.$options.filters.capitalize(selectedCategory)}`) : $t('filters.chooseCategory')"
        :title="$t('filters.chooseCategory')"
        @select="selectCategory"
      />
    </div>
  </div>
</template>

<script>
import { getCategories } from '~/helpers/api'
import { directive as onClickaway } from 'vue-clickaway'
import BaseDropdown from './BaseDropdown'
import IconCheckmark from './IconCheckmark'

export default {
  components: {
    BaseDropdown,
    IconCheckmark
  },
  directives: {
    onClickaway: onClickaway
  },
  props: {
    selectedCategory: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      categoryOptions: []
    }
  },
  async mounted() {
    try {
      const categories = await getCategories(this.$axios)
      const categoryOptions = []
      categories.map(category => {
        categoryOptions.push({
          selection: category.slug,
          text: this.$t(`categoryOptions.${category.name}`)
        })
      })
      this.categoryOptions = categoryOptions
    } catch (e) {
      this.$sentry.captureException(e)
    }
  },
  methods: {
    selectCategory(value) {
      this.$emit('updateField', 'category', value)
      const errors = {
        field: 'category',
        data: []
      }
      this.$emit('updateErrors', errors)
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  cursor: pointer;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  padding: 5px 10px;
  margin: 0 -10px;
  &:hover {
    background: $color--gray;
  }
}

.heading {
  margin-top: 1.25rem !important;
  margin-bottom: 1rem !important;
}

.input {
  border: none;
  background: none;
  width: 100%;
  &::placeholder {
    color: $color--black;
  }
  &:focus::placeholder {
    color: rgba($color--black, 0.5);
  }
}

.input-wrapper {
  margin-bottom: 10px;
  position: relative;
  @include highlight;
}

.selected-category {
  text-decoration: underline;
  cursor: pointer;
}
</style>
