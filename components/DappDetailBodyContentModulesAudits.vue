<template>
  <div class="component-DappDetailBodyContentModulesAudits">
    <h4 class="audit-title">Contract audit<span v-if="audits.length > 1">s</span></h4>
    <ul class="audit-list">
      <li 
        v-for="(audit, index) in audits"
        :key="index"
        class="audit-item">
        <a
          :href="audit.learn_more_url + '?utm_source=StateOfTheDApps'"
          class="audit-link"
          target="_blank"
          @click="trackDappContractAudit(audit.address, slug, audit.auditor_name, audit.learn_more_url)">
          <img 
            :src="audit.auditor_logo_url"
            class="audit-image"
            width="35" ><span>{{ audit.text }}</span></a>
      </li>
    </ul>
  </div>
</template>

<script>
import { trackDappContractAudit } from '~/helpers/mixpanel'

export default {
  props: {
    audits: {
      type: Array,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  methods: {
    trackDappContractAudit(contract, slug, auditorName, learnMoreUrl) {
      const action = trackDappContractAudit(
        contract,
        slug,
        auditorName,
        learnMoreUrl
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappDetailBodyContentModulesAudits {
  overflow: hidden;
}

.audit-link {
  display: flex;
  align-items: center;
}

.audit-list {
  padding-top: 10px;
}

.audit-item {
  padding-bottom: 10px;
}

.audit-image {
  margin-right: 10px;
}

.audit-title {
  margin: 0;
}
</style>
