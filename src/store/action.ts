// import axios from 'axios'
// import router from '../router'

// axios.defaults.withCredentials = true

// axios.interceptors.request.use(function (config) {
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })
// axios.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   if (error.response && error.response.status === 401) { // 身份认证错误
//     console.log('请登录')
//     router.push('/login')
//   } else {
//     return Promise.reject(error)
//   }
// })
// // 新建一个axios实例专门用来传multipart/form-data类型的数据
// const axiosForm = axios.create({
//   headers: {'Content-Type': 'multipart/form-data'}
// })
// axiosForm.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   if (error.response && error.response.status === 401) { // 身份认证错误
//     console.log('请登录')
//     router.push('/login')
//   } else {
//     return Promise.reject(error)
//   }
// })

// /* cookie */
// function setCookie (key, value) {
//   let date = new Date() // 获取当前时间
//   date.setTime(date.getTime() + 7 * 24 * 3600 * 1000) // 格式化为cookie识别的时间
//   document.cookie = key + '=' + encodeURI(value) + ';expires=' + date.toUTCString() // 设置cookie
// }

// function getCookie (key) {
//   let cookies = document.cookie.split(';')
//   for (let cookie of cookies) {
//     let c = cookie.trim()
//     if (c.indexOf(key + '=') !== -1) {
//       return c.slice(key.length + 1, c.length)
//     }
//   }
// }

// function delCookie (key) {
//   let date = new Date() // 获取当前时间
//   date.setTime(date.getTime() - 10000) // 将date设置为过去的时间
//   document.cookie = key + '=v; expires =' + date.toUTCString()// 设置cookie
// }

// export default {
//   likeURL ({state, commit}, rid) {
//     axios.post('/api/likes/like', {rid: rid})
//       .then(res => {
//         commit('pushMyLikeURLIds', rid)
//       })
//   },
//   unlikeURL ({state, commit}, rid) {
//     axios.delete('/api/likes/unlike/url/' + rid)
//       .then(res => {
//         let myLikeURLIds = state.myLikeURLIds
//         do {
//           myLikeURLIds.splice(myLikeURLIds.indexOf(rid), 1)
//         }
//         while (myLikeURLIds.indexOf(rid) !== -1)
//         commit('setMyLikeURLIds', myLikeURLIds)
//       })
//   },
//   deleteURL ({state}, rid) {
//     return new Promise(resolve => {
//       axios.delete('/api/urls/url/' + rid)
//         .then(res => {
//           resolve(res.data.message)
//         })
//         .catch(err => {
//         })
//     })
//   },
//   likeFile ({state, commit}, fid) {
//     axios.post('/api/likes/like', {fid: fid})
//       .then(res => {
//         commit('pushMyLikeFileIds', fid)
//       })
//   },
//   unlikeFile ({state, commit}, fid) {
//     axios.delete('/api/likes/unlike/file/' + fid)
//       .then(res => {
//         let myLikeFileIds = state.myLikeFileIds
//         do {
//           myLikeFileIds.splice(myLikeFileIds.indexOf(fid), 1)
//         }
//         while (myLikeFileIds.indexOf(fid) !== -1)
//         commit('setMyLikeFileIds', myLikeFileIds)
//       })
//   },
//   deleteFile ({state}, fid) {
//     return new Promise(resolve => {
//       axios.delete('/api/files/file/' + fid)
//         .then(res => {
//           resolve(res.data.message)
//         })
//         .catch(err => {
//         })
//     })
//   },
//   /* 首页 */
//   getHomeURLs () {
//     return new Promise((resolve, reject) => {
//       axios.get('/api/urls/home')
//         .then(res => {
//           resolve(res.data.urls)
//         })
//     })
//   },
//   getHomeFiles () {
//     return new Promise((resolve, reject) => {
//       axios.get('/api/files/home')
//         .then(res => {
//           resolve(res.data.files)
//         })
//     })
//   },
//   /* URLs页 */
//   getURLs ({}, page) {
//     return new Promise((resolve, reject) => {
//       axios.get('/api/urls/limit?page=' + page)
//         .then(res => {
//           resolve(res.data.urls)
//         })
//     })
//   },
//   getURLsCount () {
//     return new Promise((resolve, reject) => {
//       axios.get('/api/urls/count')
//         .then(res => {
//           resolve(res.data.count)
//         })
//     })
//   },
//   /* Files页 */
//   getFile ({}, id) {
//     return new Promise((resolve, reject) => {
//       axios.get('/api/files/file/' + id)
//         .then(res => {
//           resolve(res.data.file)
//         })
//         .catch(err => {
//           reject(err)
//         })
//     })
//   },
//   getFiles ({}, page) {
//     return new Promise((resolve, reject) => {
//       axios.get('/api/files/limit?page=' + page)
//         .then(res => {
//           resolve(res.data.files)
//         })
//     })
//   },
//   getFilesCount () {
//     return new Promise((resolve, reject) => {
//       axios.get('/api/files/count')
//         .then(res => {
//           resolve(res.data.count)
//         })
//     })
//   },
//   /* 登录注册 */
//   checkLog ({commit}) {
//     axios.get('/api/checkLog')
//       .then(res => {
//         if (res.data.user) {
//           localStorage.setItem('login', 'yes')
//           commit('setUser', res.data.user)
//           axios.get('/api/likes/urls/id')
//             .then(res => {
//               commit('setMyLikeURLIds', res.data.likes)
//             })
//           axios.get('/api/likes/files/id')
//             .then(res => {
//               commit('setMyLikeFileIds', res.data.likes)
//             })
//         } else {
//           localStorage.setItem('login', 'no')
//           commit('setUser', null)
//           delCookie('username')
//           delCookie('password')
//         }
//       })
//   },
//   logout ({commit}) {
//     delCookie('username')
//     delCookie('password')
//     localStorage.setItem('login', 'no')
//     commit('setUser', null)
//     commit('clearMyLikeURLIds')
//     commit('clearMyLikFileIds')
//     axios.get('/api/logout')
//       .then(res => {
//         router.push('/login')
//       })
//   },
//   login ({commit}, loginInfo) {
//     axios.post('/api/login', loginInfo)
//       .then(res => {
//         localStorage.setItem('login', 'yes')
//         commit('setUser', res.data.user)
//         commit('clearErrMsg')
//         setCookie('username', loginInfo.username)
//         setCookie('password', loginInfo.password)
//         router.go(-1)
//         axios.get('/api/likes/urls/id')
//           .then(res => {
//             commit('setMyLikeURLIds', res.data.likes)
//           })
//         axios.get('/api/likes/files/id')
//           .then(res => {
//             commit('setMyLikeFileIds', res.data.likes)
//           })
//       })
//       .catch(err => {
//         commit('addErrMsg', err.response.data.message)
//       })
//   },
//   sendTmpPsw ({}, username) {
//     axios.post('/api/sendTmpPsw', {username})
//   },
//   register ({commit}, registerInfo) {
//     axios.post('/api/register', registerInfo)
//       .then(res => {
//         commit('setUser', res.data.user)
//         commit('clearErrMsg')
//         setCookie('username', registerInfo.username)
//         setCookie('password', registerInfo.password)
//         localStorage.setItem('login', 'yes')
//         router.replace('/')
//         axios.get('/api/likes/urls/id')
//           .then(res => {
//             commit('setMyLikeURLIds', res.data.likes)
//           })
//         axios.get('/api/likes/files/id')
//           .then(res => {
//             commit('setMyLikeFileIds', res.data.likes)
//           })
//       })
//       .catch(err => {
//         commit('addErrMsg', err.response.data.message)
//       })
//   },
//   changePassword ({commit}, password) {
//     axios.put('/api/change-password', {newPassword: password})
//       .then(res => {
//         alert('更改成功')
//         delCookie('username')
//         delCookie('password')
//         localStorage.setItem('login', 'no')
//         commit('setUser', null)
//         commit('clearMyLikeURLIds')
//         commit('clearMyLikFileIds')
//         axios.get('/api/logout')
//           .then(res => {
//             router.push('/login')
//           })
//       })
//   },
//   /* 我的喜欢 */
//   getMyLikeURLs ({}, page) {
//     return new Promise(resolve => {
//       axios.get('/api/likes/urls/limit?page=' + page)
//         .then(res => {
//           resolve(res.data.likes)
//         })
//     })
//   },
//   getMyLikeFiles ({}, page) {
//     return new Promise(resolve => {
//       axios.get('/api/likes/files/limit?page=' + page)
//         .then(res => {
//           resolve(res.data.likes)
//         })
//     })
//   },
//   /* 我的URL */
//   getMyURLs ({}, page) {
//     return new Promise(resolve => {
//       axios.get('/api/urls/my/limit' + '?page=' + page)
//         .then(res => {
//           resolve(res.data.urls)
//         })
//     })
//   },
//   getMyURLsCount () {
//     return new Promise(resolve => {
//       axios.get('/api/urls/my/count')
//         .then(res => {
//           resolve(res.data.count)
//         })
//     })
//   },
//   /* 我的File */
//   getMyPublicFiles ({}, page) {
//     return new Promise(resolve => {
//       axios.get('/api/files/my/public/limit' + '?page=' + page)
//         .then(res => {
//           resolve(res.data.files)
//         })
//     })
//   },
//   getMyPublicFilesCount () {
//     return new Promise(resolve => {
//       axios.get('/api/files/my/public/count')
//         .then(res => {
//           resolve(res.data.count)
//         })
//     })
//   },
//   getMyPrivateFiles ({}, page) {
//     return new Promise(resolve => {
//       axios.get('/api/files/my/private/limit' + '?page=' + page)
//         .then(res => {
//           resolve(res.data.files)
//         })
//     })
//   },
//   getMyPrivateFilesCount () {
//     return new Promise(resolve => {
//       axios.get('/api/files/my/private/count')
//         .then(res => {
//           resolve(res.data.count)
//         })
//     })
//   },
//   /* 其他人的 */
//   getOtherURLs ({}, {uid, page}) {
//     return new Promise(resolve => {
//       axios.get('/api/urls/other/limit/' + uid + '?page=' + page)
//         .then(res => {
//           resolve(res.data.urls)
//         })
//     })
//   },
//   getOtherURLsCount ({}, uid) {
//     return new Promise(resolve => {
//       axios.get('/api/urls/other/count/' + uid)
//         .then(res => {
//           resolve(res.data.count)
//         })
//     })
//   },
//   getOtherPublicFiles ({}, {uid, page}) {
//     return new Promise(resolve => {
//       axios.get('/api/files/other/public/limit/' + uid + '?page=' + page)
//         .then(res => {
//           resolve(res.data.files)
//         })
//     })
//   },
//   getOtherPublicFilesCount ({}, uid) {
//     return new Promise(resolve => {
//       axios.get('/api/files/other/public/count/' + uid)
//         .then(res => {
//           resolve(res.data.count)
//         })
//     })
//   },
//   /* 分享上传 */
//   share ({}, url) {
//     axios.post('/api/urls/url', url)
//       .then(res => {
//         router.push('/my/urls')
//       })
//   },
//   upload ({}, formData) {
//     return new Promise((resolve, reject) => {
//       axiosForm.post('/api/files/file', formData)
//         .then(res => {
//           resolve(res.data.message)
//         })
//         .catch(err => {
//           reject(err)
//         })
//     })
//   },
//   /* 留言 */
//   postRecord ({}, record) {
//     return new Promise((resolve, reject) => {
//       axios.post('/api/records/record', {content: record})
//         .then(res => resolve(res))
//         .catch(err => reject(err))
//     })
//   },
//   getRecords () {
//     return new Promise(resolve => {
//       axios.get('/api/records/home')
//         .then(res => resolve(res.data.records))
//     })
//   }

// }
