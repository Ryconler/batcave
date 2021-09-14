<template>
  <div class="search-bar">
    <div class="city-info" @click="chooseCity">
      <div class="city-name">{{ selectCity.cityName }}</div>
      <img src="./icon-switchcity.png" />
    </div>
    <div class="search-input">
      <img src="./icon-search.png" />
      <div class="search-placeholder">{{ searchBarData.placeholder }}</div>
    </div>
    <div class="user-avatar">
      <img src="./icon-avatar.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { DefaultCity, getLocation } from '@/utils/index'
import { getSearchBarData } from './search-bar.service'

@Options({})
export default class SearchBar extends Vue {
  selectCity: any = DefaultCity
  searchBarData: any = {}

  async mounted() {
    this.searchBarData = await getSearchBarData()
    this.selectCity = (await getLocation()) || DefaultCity
  }

  chooseCity() {
    this.$router.push({
      name: 'cityChoose',
      query: {
        referrer: location.href
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.search-bar {
  width: 100%;
  height: 44px;
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
  /* 给titlebar一个超出顶部2px白色背景，解决滑动时fixed布局出现抖动导致顶部露出空隙的问题 */
  &::before {
    content: '';
    display: block;
    position: absolute;
    background: white;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: -2px;
    // 必须要设置translateZ(0),开启gpu渲染
    transform: translate3d(0, -2px, 0);
  }
  .city-info {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100px;
    height: 100%;
    padding: 0 10px;
    .city-name {
      margin-right: 4px;
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      @include ellicpsis;
    }
    img {
      width: 10px;
      height: 10px;
    }
  }
  .search-input {
    flex: 1;
    height: 30px;
    background: #f5f5f5;
    border-radius: 30px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    img {
      width: 15px;
      height: 15px;
    }
    .search-placeholder {
      font-size: 13px;
      display: flex;
      align-items: center;
      line-height: normal;
      color: #aaaaaa;
      margin-left: 5px;
    }
  }
  .user-avatar {
    width: 44px;
    height: 44px;
    padding: 10px;
    img {
      display: block;
      width: 100%;
      height: 100;
    }
  }
}
</style>
