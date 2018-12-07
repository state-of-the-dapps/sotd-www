<template>
  <div>
    <p class="heading">Category <span class="required">(required)</span></p>
    <div class="input-wrapper">
      <div 
        class="input" 
        @click="toggleDropdown"><span class="selected-category">{{ $options.filters.capitalize(selectedCategory) || 'Select a category' }}</span></div>
      <transition name="fade">
        <div 
          v-on-clickaway="toggleDropdown" 
          v-if="dropdown" 
          class="dropdown">
          <ul class="categories">
            <li
              v-for="(category, index) in categories"
              :key="index"
              class="category"
              @click="selectCategory(category.slug)">{{ category.name }}</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { getCategories } from '~/helpers/api'
import { dispatchErrors } from '~/helpers/mixins'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway: onClickaway
  },
  mixins: [dispatchErrors],
  data() {
    return {
      categories: [],
      dropdown: false
    }
  },
  computed: {
    selectedCategory() {
      return this.$store.getters['dapps/form/category']
    }
  },
  async mounted() {
    this.categories = await getCategories(this.$axios)
  },
  methods: {
    selectCategory(value) {
      const field = {
        name: 'category',
        value: value
      }
      const errors = {
        field: 'category',
        data: []
      }
      this.dispatchErrors(errors, 'dapps')
      this.$store.dispatch('dapps/form/setField', field)
      this.toggleDropdown()
    },
    toggleDropdown() {
      this.dropdown = !this.dropdown
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

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

.dropdown {
  position: absolute;
  background: $color--white;
  padding: 10px;
  box-shadow: 0 17px 70px rgba($color--black, 0.2);
  border-top: 1px solid $color--gray;
  width: 320px;
  top: 36px;
  left: 0;
  overflow: hidden;
  z-index: 10;
  @include tweakpoint('min-width', $tweakpoint--default) {
    width: 350px;
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
  background: rgba(lighten($color--gray, 100%), 0.9);
  display: flex;
  width: 100%;
  padding: 10px;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
  margin-bottom: 10px;
  position: relative;
}

.selected-category {
  text-decoration: underline;
  cursor: pointer;
}
</style>
