<template>
  <ToggleButton class="btn-sm btn-link-chirp-red" label="Crates" :open="open" />
</template>

<script>
import ToggleButton from "../ToggleButton.vue";

export default {
  components: { ToggleButton },
  props: {
    open: Boolean,
  },
}
</script>
