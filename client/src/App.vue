<template>
  <NavBar />
  <router-view id="view" class="container-fluid ps-3 ps-lg-1 pe-lg-0" />
</template>

<style lang="scss">
@import "bootstrap/scss/bootstrap";

:root {
  --dark-red: #822036;
  --bright-red: #ee0032;
}

body {
  font-family: Georgia, "Times New Roman", Times, serif;
}

#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

#view {
  position: absolute;
  top: 4.5em;
  left: 0;
  bottom: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
button,
label,
legend,
th,
.btn,
.navbar,
.badge,
.breadcrumb,
.pagination,
.font-sans {
  font-family: Futura, "Trebuchet MS", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
}

a {
  color: var(--dark-red);
  text-decoration: none;
}

a:hover {
  color: var(--bright-red);
  text-decoration: underline;
}

button.btn-chirp-red {
  background-color: var(--dark-red);
  border-color: var(--dark-red);
  color: #fff;
}

button.btn-chirp-red:hover {
  background-color: var(--bright-red);
  color: #fff;
}

button.btn-link-chirp-red,
button.btn-outline-chirp-red,
a.btn-link-chirp-red {
  color: var(--dark-red);
}

button.btn-link-chirp-red:hover,
button.btn-outline-chirp-red:hover,
a.btn-link-chirp-red:hover {
  color: var(--bright-red);
}

button.btn-outline-chirp-red {
  border-color: var(--dark-red);
}

button.btn-outline-chirp-red:hover {
  border-color: var(--bright-red);
}

.form-check-input:checked {
  background-color: var(--bright-red);
  border-color: var(--bright-red);
}

.no_overflow {
  text-overflow: clip;
}

.search_result__col {
  text-overflow: ellipsis;
  overflow: hidden;
}

.numeral {
  font-family: "Times New Roman", Times, serif;
}

@media (max-width: 576px) {
  .crate_item__duration,
  .crate_item__details {
    font-size: 0.9rem;
  }

  .crate_item__details {
    word-break: break-word;
  }

  .crate_item__duration {
    padding: 0;
  }
}

</style>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {
    NavBar,
  },
};
</script>
