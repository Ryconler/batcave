import { registerModule } from '@/store'

export default {
  path: '/city-choose',
  name: 'cityChoose',
  component: () => import('./city-choose.vue'),
  beforeEnter: (to: any, from: any, next: () => void) => {
    import('./city-choose.service').then(({ store }) => {
      registerModule(to, store)
      next()
    })
  }
}
