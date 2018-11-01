<template>
  <div class="component-ranking-table">
    <table class="table">
      <thead class="table-header">
        <tr class="table-row">
          <th class="table-head">Name</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr
          v-for="(dapp, index) in dapps"
          :key="index"
          class="table-row">
          <td class="table-data">{{ dapp.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    dapps: Array,
    required: true
  }
}
</script>
