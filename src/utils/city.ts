import jsCookie from 'js-cookie'

export const COOKIE_CITY = 'city'

export interface ICity {
  cityId: string | number
  cityName: string
}

export const DefaultCity: ICity = {
  cityName: '南京',
  cityId: '320100'
}

export function selectCity(citycode: string | number, cityName: string) {
  // jsCookie.set(COOKIE_CITY, `${citycode}_${cityName}`, { domain: '.wzmxx.com' })
  jsCookie.set(COOKIE_CITY, `${citycode}_${cityName}`)
}
