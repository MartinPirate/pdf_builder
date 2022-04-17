<template>
  <div
    v-if="activeElement.page && tab === 1"
    class="panel-wrap">
    <div
      class="panel-row"
      flex>
      <vpd-icon name="type"/>
      <div class="panel-label">Pdf Name</div>
      <div class="panel-value">
        <input
          v-model="activeElement.title"
          type="text">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <vpd-icon name="smartphone"/>
      <div class="panel-label">Page Height</div>
      <div class="panel-value">
        <input
          v-model="activeElement.height"
          type="text">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <vpd-icon name="droplet"/>
      <div class="panel-label">Bg Color</div>
      <div class="panel-value">
        <input
          v-model="activeElement.backgroundColor"
          type="color">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activeElement', 'tab']
}
</script>
