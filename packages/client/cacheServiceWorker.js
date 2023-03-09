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

const getFromNetwork = async (request, _cacheName, timeout) => (
  new Promise((fulfill, reject) => {
    let timeoutId;
    
    const fetchData = async () => {
      try {
        const response = await fetch(request);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        clearTimeout(timeoutId);
        fulfill(response);
      } catch (err) {
        console.error(`Error fetching from network: ${err}`);
        reject(err);
      }
    }
    
    timeoutId = setTimeout(() => reject(new Error('No connection')), timeout);
    fetchData();
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
// Если соеднинение есть, берем данные с сервера и возвращаем их, предварительно положив в кэш
// Если соединения нет, берем данные из кэша
// -- для события fetch

const cacheData = async (request, cacheName, timeout) => {
  try {
    if (request.method === 'POST' || request.method === 'PUT') {
      const response = await fetch(request);
      return response;
    }
    const response = await getFromNetwork(request, cacheName, timeout);
    if (response) {
      await putToCache(request.clone(), cacheName, response.clone());
      return response;
    }
    const cache = await getFromCache(request, cacheName);
    if (cache) {
      return cache;
    }
  } catch {
    throw new Error('No response from network or cache');
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
