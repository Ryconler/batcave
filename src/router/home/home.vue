<template>
  <div>
    <search-bar></search-bar>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'
import SearchBar from '@/components/searchBar/search-bar.vue'
const homeModule = namespace('home')

@Options({
  components: {
    SearchBar
  }
})
export default class Home extends Vue {
  @homeModule.State homeData: any
}
</script>
