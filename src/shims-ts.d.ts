/* 声明Window自定义的类型 */
declare interface Window {
  AMap: any
  onAMapLoaded: () => void
}

declare module 'load-script'
