<template>
  <div class="city-choose">
    <div v-if="hotCitys.length > 0" class="hot-city">
      <h2 class="hot-city-title">热门城市</h2>
      <ul class="hot-city-items clearfix">
        <li
          v-for="(item, index) in hotCitys"
          :key="'hot-city-' + index"
          class="hot-city-item"
          @click="useHotCity(item)"
        >
          <span>{{ item.cityName }}</span>
        </li>
      </ul>
    </div>
    <div v-if="historyCitys.length > 0" class="history-city">
      <h2 class="history-city-title">
        历史访问城市<i class="delete-icon" @click="clearCity"> </i>
      </h2>
      <ul class="history-city-items clearfix">
        <li
          v-for="(item, index) in historyCitys"
          :key="'history-city-' + index"
          class="history-city-item"
          @click="useCity(item)"
        >
          <span>{{ item.cityName }}</span>
        </li>
      </ul>
    </div>
    <div class="city-list">
      <div v-for="(py, index) in cityKeys" :key="index">
        <h3 :id="py" class="city-char">{{ py }}</h3>
        <ul class="city-list-items clearfix">
          <li
            v-for="(city, index) in listCitys[py]"
            :key="'city-list-item-' + index"
            class="city-list-item"
            @click="useCity(city)"
          >
            <span>{{ city.cityName }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ICity, selectCity } from '@/utils/index'

@Options({
  components: {}
})
export default class CityChoose extends Vue {
  listCitys: any = {
    N: [{ cityName: '南京', cityId: '320100' }],
    S: [{ cityName: '上海', cityId: '310100' }]
  }
  historyCitys: any[] = [
    { cityName: '南京', cityId: '320100' },
    { cityName: '上海', cityId: '310100' }
  ]
  hotCitys: any[] = [
    { cityName: '南京', cityId: '320100' },
    { cityName: '上海', cityId: '310100' }
  ]

  get cityKeys() {
    return Object.keys(this.listCitys).sort()
  }

  get referrer(): string {
    return (this.$route.query.referrer as string) || document.referrer || ''
  }

  useHotCity(city: ICity) {
    this.useCity(city)
  }

  useCity(city: ICity) {
    console.log(city)
    selectCity(city.cityId, city.cityName)
    location.href = this.referrer
  }

  clearCity() {
    this.historyCitys = []
    // new LocalStorageSet('cache.city', 6, 'ID').clear()
  }
}
</script>

<style lang="scss" scoped>
.city-choose {
  min-height: 100vh;
  background-color: #fff;
  padding: 15px 12px;
  .hot-city,
  .history-city {
    margin-bottom: 12px;
    .hot-city-title,
    .history-city-title {
      font-size: 13px;
      color: #a1a1a1;
      margin-bottom: 12px;
    }
    .hot-city-items,
    .history-city-items {
      .hot-city-item,
      .history-city-item {
        width: 25%;
        height: 25px;
        line-height: 25px;
        border-radius: 4px;
        font-size: 13px;
        text-align: center;
        background: #f6f6f6;
        color: #333333;
        float: left;
        margin-right: 12px;
        margin-bottom: 12px;
      }
    }
  }

  .history-city {
    position: relative;
    .delete-icon {
      width: 13px;
      height: 13px;
      background: url(./icon-delete.png) no-repeat center center/13px 13px;
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .city-list {
    .city-char {
      color: #a1a1a1;
      font-size: 13px;
      padding: 12px 0;
    }
    .city-list-items {
      margin-bottom: 15px;
      .city-list-item {
        color: #333333;
        font-size: 14px;
        padding: 12px 0;
        border-bottom: 1px solid #e4e3e8;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
