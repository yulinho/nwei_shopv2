<template>
  <div class="c_cla">
    <web-view src="https://eggd.heyulin.com/ghost/api/v0.1/hmbb.open.show/15515247572410.1829368117410799"></web-view>
  </div>
</template>
<script>
import t from 't'

export default {
  components: {

  },
  data() {
    return {

    }
  },
  computed: {},
  methods: {
    click(e) {
      this.$emit('click', e)
    },
  },
  async created() {

  }
}

</script>
<style scoped>
.c_cla {}

</style>
