<template>
  <div class="component-StatsBarChart">
    <ul class="stat-list">
      <li v-for="(category, index) in categories" :key="index" class="stat-item">
        <div class="stat-item-field -label">
          <h3 class="label">{{ category.name }}</h3>
        </div>
        <div class="stat-item-field -value">
          <div class="value" :style="'width:' + (category.dappCount / maxCount) * 100 + '%;'">          
            <p class="count">{{ category.dappCount | abbreviateNumber(2) || 0 }}</p>
          </div>
        </div>
        <div class="spacer"/>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '~/helpers/axios'

export default {
  computed: {
    maxCount () {
      let count = 0
      let categoryCounts = []
      for (var category of this.categories) {
        categoryCounts.push(category.dappCount)
      }
      count = Math.max(...categoryCounts)
      return count
    }
  },
  data () {
    return {
      categories: []
    }
  },
  mounted () {
    axios
      .get('categories')
      .then(response => {
        const data = response.data
        this.categories = data.items
      })
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.count {
  @include title;
  margin: 0;
  font-size: 2.5rem;
  line-height: 50px;
  padding: 0 10px;
  text-align: right;
}

.label {
  font-weight: 300;
  margin: 5px 0;
  font-size: 1.2rem;
  letter-spacing: normal;
  @include tweakpoint('min-width', 1000px) {
    text-align: right;
    padding-right: 10px;
  }
}

.spacer {
  @include tweakpoint('min-width', 1000px) {
    width: 150px;
  }
}

.stat-item {
  margin: 16px 0;
  @include tweakpoint('min-width', 1000px) {
    display: flex;
    align-items: center;
    margin: 0;
  }
}

.stat-item-field {
   &.-label {
    @include tweakpoint('min-width', 1000px) {
      width: 150px;
    }    
  } 
  &.-value {
    @include tweakpoint('min-width', 1000px) {
      flex: 1;
      border-left: 1px solid $color--black;
      padding: 10px 0;
    }    
  }
}

.value {
  min-width: 30px;
  height: 50px;
  background: $gradient--dapp-live;
}
</style>
