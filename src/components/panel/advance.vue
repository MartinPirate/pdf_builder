<template>
  <div
    v-if="tab === 2"
    class="panel-wrap">
    <div class="panel-row">
      <p>Advance Section</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activeElement', 'tab']
}
</script>
