const myChach = 'v_1'
const self = this

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(myChach).then(cache => {
      return cache.addAll([
        '/public/logo.png',
        '/public/logo192.png',
        "/public/index.html",

        "/src/App.css",
        "/src/index.css",

        '/src/Routes/User.js',
        '/src/Routes/SingleUser.js',
        '/src/Routes/blogs.js',
        '/src/Routes/SingleBlog.js',
        '/src/Routes/Nav.js',
        '/src/Routes/Home.js',

      ])
    })
  )
})

self.addEventListener('fetch', e => {
  // console.log('URL', e.request.url);
  // console.log('tttttt',e.request);
  
  e.respondWith(
    caches.match(e.request)
    .then(res => {
      if (res) {
        // console.log('tttttt',e.request.url);
        return res
      }

      return fetch(e.request).then(res => {
        return caches.open(myChach).then(cache => {
        cache.put(e.request.url, res.clone())
        return res;
        })  
      })
    })
    .cache((e) => console.log(e))
  )
})

self.addEventListener('activate', e => {
  const cacheAll = [myChach]

  e.waitUntil(
    caches.keys().then(cacheName => {
      return Promise.all(
        cacheName.map(keys => {
          console.log('keys : ',keys);
          if(cacheAll.indexOf(keys) === -1){
            return caches.delete(keys)
          }
        })
      )
    })
  )
})

