<template>
  <div class="row g-1">
    <div class="col h-100 overflow-scroll">
      <div class="row g-1 mb-3 pb-2 border-bottom">
        <div class="d-flex text-end col-auto me-auto">
          <span class="font-sans me-2">ON AIR</span>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="onAirCheck"
              v-model="onAir"
            />
          </div>
        </div>
        <CratesToggleButton
          class="h-50 col-auto"
          :class="addButtonClasses"
          :open="crates"
          @click="toggleCrates"
        />
      </div>
      <div class="row g-1 mb-2">
        <div class="col-4 col-lg-2">
          <LoadingButton
            class="w-100"
            icon="rotate-right"
            label="Update"
            :outline="true"
            :loading="loading"
            @click="update"
          />
        </div>
        <div class="col-4 col-lg-2">
          <LoadingButton
            class="w-100"
            :class="addButtonClasses"
            icon="play"
            label="Add track"
            @click="addTrack"
          />
        </div>
        <div class="col-4 col-lg-2">
          <LoadingButton
            class="w-100"
            :class="addButtonClasses"
            icon="plus"
            label="Add break"
            :loading="adding"
            @click="addBreak"
          />
        </div>
        <TagTotals class="col-12 col-lg-6 mt-2 mt-lg-auto text-lg-end" />
      </div>
      <ol class="list-group list-group-flush list-unstyled">
        <li v-for="event in sorted" :key="event.id">
          <component :is="getComponent(event)" :track="event" class="py-2" />
        </li>
      </ol>
    </div>
    <div class="col-5 h-100 overflow-scroll" v-if="showCrates">
      <CrateBrowser />
    </div>
    <AddTrackModal ref="addTrackModal" />
  </div>
</template>

<style>
.on-air__label {
  font-size: 0.875rem;
}
</style>

<script>
import AddTrackModal from "../../components/playlist/AddTrackModal.vue";
import LoadingButton from "../../components/LoadingButton.vue";
import PlaylistBreak from "../../components/playlist/PlaylistBreak.vue";
import PlaylistTrack from "../../components/playlist/PlaylistTrack.vue";
import TagTotals from "../../components/playlist/TagTotals.vue";
import updateTitle from "../../mixins/updateTitle";
import CratesToggleButton from "../../components/playlist/CratesToggleButton.vue";
import CrateBrowser from "../../components/crates/CrateBrowser.vue";

export default {
  components: {
    AddTrackModal,
    LoadingButton,
    PlaylistBreak,
    PlaylistTrack,
    TagTotals,
    CratesToggleButton,
    CrateBrowser,
  },
  data() {
    return {
      adding: false,
      loading: false,
      crates: false,
    };
  },
  computed: {
    addButtonClasses() {
      return this.onAir ? { visible: true } : { invisible: true };
    },
    events() {
      return this.$store.getters.events;
    },
    lastUpdated() {
      return this.$store.getters.lastUpdated;
    },
    onAir: {
      get() {
        return this.$store.getters.onAir;
      },
      set(value) {
        this.$store.commit("onAir", value);
      },
    },
    showCrates() {
      return this.onAir && this.crates;
    },
    sorted() {
      const copy = [...this.events];
      return copy.sort((a, b) => {
        if (a.established < b.established) {
          return 1;
        }

        return -1;
      });
    },
  },
  mixins: [updateTitle],
  created: async function () {
    this.updateTitle("Playlist");
    if (this.events.length === 0) {
      this.update();
    }
  },
  methods: {
    getComponent(event) {
      if (event.class.includes("PlaylistBreak")) {
        return "PlaylistBreak";
      } else if (event.class.includes("PlaylistTrack")) {
        return "PlaylistTrack";
      }
    },
    async update() {
      this.loading = true;
      await this.$store.dispatch("getPlaylistEvents", {
        start: this.lastUpdated,
      });
      this.loading = false;
    },
    async addBreak() {
      this.adding = true;
      await this.$store.dispatch("addBreak");
      this.adding = false;
    },
    addTrack() {
      this.$refs.addTrackModal.show();
    },
    toggleCrates() {
      this.crates = !this.crates;
    },
  },
};
</script>
