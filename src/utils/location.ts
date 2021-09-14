import loadScript from 'load-script'
import { localStore } from './storage'

export interface ILocation {
  cityId: string
  cityName: string
  lat: string
  lng: string
  time?: number
}

async function getH5Location(): Promise<ILocation | null> {
  /* 加载高德地图API */
  function getAMap() {
    return new Promise((resolve, reject) => {
      if (window.AMap && window.AMap.Map) {
        resolve(window.AMap)
      } else {
        loadScript(
          '//webapi.amap.com/maps?v=1.4.15&key=c740e64858e21be917b7a68d264f60bd&callback=onAMapLoaded',
          (err: any) => {
            if (err) {
              reject(null)
            } else {
              window.onAMapLoaded = () => {
                resolve(window.AMap)
              }
            }
          }
        )
      }
    })
  }
  const AMap: any | null = await getAMap()
  return new Promise((resolve, reject) => {
    try {
      if (AMap) {
        /* https://developer.amap.com/api/javascript-api/reference/location */
        const map = new AMap.Map('iCenter')
        map.plugin('AMap.Geolocation', () => {
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 5000, // 超过5秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
          })
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', (data: any) => {
            console.log(data)
            const adcode = data?.addressComponent?.adcode
            const cityId = adcode ? `${adcode.slice(0, 4)}00` : ''
            const city = data?.addressComponent?.city
            const cityName = city ? city.replace('市', '') : ''
            const lat = data?.position?.lat
            const lng = data?.position?.lng
            const obj: ILocation = {
              cityId,
              cityName,
              lat,
              lng
            }
            resolve(cityId ? obj : null)
          }) // 返回定位信息
          AMap.event.addListener(geolocation, 'error', (error: any) => {
            console.log(error)
            reject(null)
          }) // 返回定位出错信息
        })
      } else {
        resolve(null)
      }
    } catch (e) {
      console.log(e)
      reject(null)
    }
  })
}

const STORAGE_KEY_LOCATION = 'location'

export async function getLocation(cache = 30): Promise<ILocation | null> {
  try {
    const locationStorage = localStore.getItem(STORAGE_KEY_LOCATION)
    const now = Date.now()
    let res: ILocation | null
    if (locationStorage) {
      if (now - locationStorage.time < cache * 60 * 1000) {
        // 存储30分钟
        res = locationStorage
      } else {
        res = await getH5Location()
      }
    } else {
      res = await getH5Location()
    }
    if (res) {
      localStore.setItem(STORAGE_KEY_LOCATION, {
        ...res,
        time: Date.now()
      })
    }
    return res
  } catch (e) {
    return null
  }
}
