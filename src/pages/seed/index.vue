<template>
  <div class="c_cla">
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
