<template>
  <div class="main_class">
  </div>
</template>
<script>
// import card from '@/components/card'
import t from 't'
// import asList from '../../AngryShell/src/list';
export default {
  components: {
    // asList,

  },
  data() {
    return {
      userInfo: {}
    }
  },

  computed: {},
  async onReady(e) {},
  async onShow() {
    // t.toast('show')
  },
  methods: {
    async onShow() {},
  },
  async onLoad(query) {},
  async created() {
    ctx = this
    await this.onShow()

  }
}

</script>
<style scoped>
.main_class {}

</style>
