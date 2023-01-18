const CACHE_PREFIX = 'snake-game-cache';
const CACHE_VERSION = 'v1';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;
const TIMEOUT = 5000;


// Динамический импорт ресурсов для кэширования
// https://vitejs.dev/guide/features.html#glob-import

const modules = import.meta.glob([
  './src/index.tsx',
  './src/*.css',
  './index.html',
  './src/assets/**/*.*',
]);

const resources = Object.keys(modules);


// Добавляет ресурсы, отслеживаемые для кэширования
// -- для события install

const addResources = async (cacheName, resources) => {
  try {
    const cache = await caches.open(cacheName);
    return cache.addAll(resources);
  } catch (err) {
    console.error(err);
    throw err;
  }
}


// Удаляет старую версию кэша. Если в переменной cacheName меняется версия кэша,
// а префикс остается прежним, то старая версия заменяется на новую
// -- для событии activate

const deleteOldCache = async (cachePrefix, cacheName) => {
  const cachesKeys = await caches.keys();
  const filteredKeys = cachesKeys
    .map(key => (
      key.startsWith(cachePrefix) && key !== cacheName ?
        caches.delete(key) : null
    ))
    .filter(key => key !== null)
    
  return Promise.all(filteredKeys);
}


// Кладет данные в кэш. Дополнительная проверка в функции нужна, 
// чтобы отфильтровать данные запросов от браузерных расширений: с ними sw не работает
// https://github.com/iamshaunjp/pwa-tutorial/issues/1

const putToCache = async (request, cacheName, response) => {
  const cache = await caches.open(cacheName);
  if (request.url.startsWith('http')) {
    cache.put(request, response);
  }
}

//  Получение данных из сети
//  Если время получения данных больше timeout, промис реджектится

const getFromNetwork = (request, cacheName, timeout) => (
  new Promise((fulfill, reject) => {
    let timeoutId;
    
    const fetchAndCache = async() => {
      try {
        const response = await fetch(request);
        clearTimeout(timeoutId);
        await putToCache(request.clone(), cacheName, response.clone());
        fulfill(response);
      } catch (err) {
        reject(err);
      }
    }
    
    timeoutId = setTimeout(() => reject(new Error('No connection')), timeout);
    fetchAndCache();
  })
);


// Получение данных из кэша

const getFromCache = async (request, cacheName) => {
  try {
    const cache = await caches.open(cacheName);
    const matching = await cache.match(request);
    return matching;
  } catch (err) {
    console.error(err);
    return err;
  }
}


// Кэширование данных. Стратегия кэширования: network first
// -- для события fetch

const cacheData = async (request, cacheName, timeout) => {
  try {
    const response = await getFromNetwork(request, cacheName, timeout);
    return response;
  } catch {
    const cache = await getFromCache(request, cacheName);
    return cache;
  }
}


// Слушатели событий

self.addEventListener('install', evt => {
  evt.waitUntil(
    addResources(CACHE_NAME, resources)
  )
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    deleteOldCache(CACHE_PREFIX, CACHE_NAME)
  );
});

self.addEventListener('fetch', evt => {
  const { request } = evt;
  evt.respondWith(cacheData(request, CACHE_NAME, TIMEOUT));
});
