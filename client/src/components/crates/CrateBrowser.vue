<template>
  <select class="form-select mb-2" v-model="id" @change="getItems">
    <option v-for="crate in crates" :key="crate.id" :value="crate.id">
      {{ crate.name }}
    </option>
  </select>
  <RecordSpinner v-if="loading" size="md" />
  <ul v-if="crate" class="list-group list-group-flush crate-browser__items">
    <li v-for="item in items" :key="item.id" class="row list-group-item">
      <div class="row">
        <div class="col-1 me-2 text-end numeral crate_item__duration">
          <TrackDuration v-if="item.track" :track="item.track" />
        </div>
        <component
          :is="getKind(item)"
          :element="item"
          class="col crate_item__details"
        />
      </div>
    </li>
  </ul>
</template>

<style>
.crate-browser__items {
  font-size: 0.875em;
}
</style>

<script>
import TrackDuration from "../music/TrackDuration.vue";
import CrateItem from "./CrateItem.vue";
import TrackItem from "./CrateItem.vue";
import AlbumItem from "./AlbumItem.vue";
import ArtistItem from "./ArtistItem.vue";
import RecordSpinner from "../RecordSpinner.vue";

export default {
  data() {
    return {
      id: null,
      loading: false,
    };
  },
  components: {
    AlbumItem,
    ArtistItem,
    CrateItem,
    RecordSpinner,
    TrackItem,
    TrackDuration,
  },
  computed: {
    crate() {
      return this.$store.getters.crate(this.id);
    },
    crates() {
      return this.$store.getters.crates;
    },
    items() {
      return this.crate.items || [];
    },
  },
  methods: {
    getKind(item) {
      return item.kind === "CrateItem" ? item.kind : `${item.kind}Item`;
    },
    async getItems() {
      if (this.items.length === 0) {
        this.loading = true;
        await this.$store.dispatch("getCrateItems", {
          crateId: this.id,
        });
        this.loading = false;
      }
    },
  },
};
</script>
