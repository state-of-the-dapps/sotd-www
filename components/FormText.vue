<template>
  <div class="component-form-text">
    <div class="label-remaining-wrapper">
      <BaseLabel
        :field="field"
        :label="label"
        :required="required"/>
      <span
        v-if="field.length"
        class="remaining">{{ maxLength - field.length }}</span>
    </div>
    <div class="input-wrapper">
      <textarea
        v-if="type === 'textarea'"
        :maxlength="maxLength"
        :name="field"
        :placeholder="placeholder"
        :value="value"
        :type="type"
        class="textarea"
        @input="update($event.target.value)"/>
      <input
        v-else
        :maxlength="maxLength"
        :name="field"
        :placeholder="placeholder"
        :value="value"
        :type="type"
        class="input"
        @input="update($event.target.value)">
    </div>
    <ul
      v-if="warnings.length" 
      class="warning-list">
      <li
        v-for="(warning, index) in warnings" 
        :key="index" 
        class="warning-item">{{ error }}</li>
    </ul>
    <ul
      v-if="errors.length"
      class="error-list">
      <li
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p  
      v-if="help"
      class="help">{{ help }}</p>
  </div>
</template>

<script>
import BaseLabel from './BaseLabel'

export default {
  components: {
    BaseLabel
  },
  props: {
    errors: {
      type: Array,
      default: () => []
    },
    field: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      default: 255
    },
    help: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      required: true
    },
    warnings: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    update(value) {
      this.$emit('update', value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-base-label {
  flex: 1;
}

.error-list {
  padding: 10px 15px;
  color: lighten($color--white, 100%);
  background: $color--error;
}

.error-item {
  margin: 0.2rem 0;
}

.help {
  padding: 10px 15px;
  margin: 0;
  background: none;
  background: rgba($color--white, 0.7);
  font-size: 0.9rem;
  line-height: 1.45;
}

.input,
.textarea {
  border: none;
  padding: 20px 15px;
  width: 100%;
  box-shadow: 0 10px 20px rgba($color--black, 0.075);
  background: rgba(lighten($color--white, 100%), 0.95);
  transition: background 0.2s ease;
  &:focus {
    background: rgba(lighten($color--white, 100%), 0.7);
  }
}

.label-remaining-wrapper {
  display: flex;
  align-items: center;
}

.remaining {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
</style>
