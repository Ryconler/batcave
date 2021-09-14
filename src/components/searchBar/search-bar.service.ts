import { http } from '@/utils/index'

export async function getSearchBarData() {
  return new Promise((resolve, reject) => {
    http
      .get('https://www.fastmock.site/mock/02bb778aca79775dcc77fddbc42380e4/batcave/searchBarData')
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
