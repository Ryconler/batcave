import { registerModule } from '@/store'

export default {
  path: '/',
  name: 'home',
  component: () => import('./home.vue'),
  beforeEnter: (to: any, from: any, next: () => void) => {
    import('./home.service').then(({ store }) => {
      registerModule(to, store)
      next()
    })
  }
}
