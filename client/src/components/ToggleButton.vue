<template>
  <button class="btn">
    <font-awesome-icon :icon="icon" />
    <span class="ms-2">{{ label }}</span>
  </button>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: "horizontal",
    },
    open: {
      type: Boolean,
      default: false,
    },
    label: String,
  },
  computed: {
    icon() {
      let name = "";
      if (this.direction === "horizontal") {
        name = this.open ? "chevron-right" : "chevron-left";
      } else if (this.direction === "vertical") {
        name = this.open ? "chevron-up" : "chevron-down";
      }

      return name;
    },
  },
};
</script>
