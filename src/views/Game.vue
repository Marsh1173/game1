<template>
  <div class="game">
    <gameGrid :squares="squares"/>
  </div>
</template>

<script>
import gameGrid from '@/components/gameGrid.vue'

export default {
  name: 'Game',
  components: {
    gameGrid
  },
  computed: {
    squares() {
      return this.$root.$data.squares;
    }
  },
}
</script>
