<template>
  <div>
    <div
      v-for="hit in results.hits"
      :key="hit._id"
      class="row border-top py-2 mx-0"
    >
      <div class="col-md-1 search-result__col no-overflow">
        <AlbumArtLink :album="hit._source" srcSize="med" />
      </div>
      <div class="col-md-2 search-result__col">
        <div v-if="hit._source.is_compilation" class="badge bg-secondary">
          Compilation
        </div>
        <ArtistLink
          v-if="!hit._source.is_compilation"
          :artist="hit._source.album_artist"
        />
      </div>
      <div class="col-md-3 search-result__col">
        <AlbumTitleLink :album="hit._source" />
        <TagList :tags="hit._source.current_tags" />
      </div>
      <div class="col-md-2 search-result__col">{{ hit._source.label }}</div>
      <div class="col-md-1 search-result__col">{{ hit._source.year }}</div>
      <div class="col-md-3 search-result__col mt-2 mt-2-sm">
        <AddToCrate :keyToAdd="hit._source.__key" />
      </div>
    </div>
  </div>
</template>

<script>
import AddToCrate from "../../../AddToCrate.vue";
import AlbumArtLink from "../../AlbumArtLink.vue";
import AlbumTitleLink from "../../AlbumTitleLink.vue";
import ArtistLink from "../../ArtistLink.vue";
import TagList from "../../TagList.vue";

export default {
  name: "AlbumResultRows",
  components: { AddToCrate, AlbumArtLink, AlbumTitleLink, ArtistLink, TagList },
  props: {
    results: {
      type: Object,
      default() {
        return {
          hits: [],
          count: undefined,
        };
      },
    },
  },
};
</script>
