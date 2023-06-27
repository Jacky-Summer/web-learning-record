window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

if (!window.indexedDB) {
  alert('你的浏览器不支持IndexedDB')
  throw new Error('your browser are not support IndexedDB')
}

let db
const request = window.indexedDB.open('myIndexedDB')

request.onsuccess = (event) => {
  db = event.target.result
  console.log('打开 IndexedDB 成功')
  // add()
  // update()
  read()
  // del()
}
request.onerror = (event) => {
  console.log('打开 IndexedDB 失败')
}
request.onupgradeneeded = function (e) {
  console.log('当前数据库版本号为' + e.newVersion)
  db = e.target.result
  const objectStore = db.createObjectStore('persons', { keyPath: 'id' })
  objectStore.createIndex('name', 'name')
  objectStore.createIndex('age', 'age')
}

function add() {
  const items = [{ id: 1, name: '张三', age: 18 }]
  // 创建一个读写事务
  const transaction = db.transaction(['persons'], 'readwrite')
  // 获取对象存储区
  const objectStore = transaction.objectStore('persons')
  // 添加数据
  const request = objectStore.add(items[0])

  request.onsuccess = function (e) {
    console.log('写入数据成功')
  }

  request.onerror = function (e) {
    console.log('写入数据失败')
  }
}

function update() {
  // 创建一个读写事务
  const transaction = db.transaction(['persons'], 'readwrite')
  // 获取对象存储区
  const objectStore = transaction.objectStore('persons')
  // 更新数据
  const request = objectStore.put({ id: 1, name: '李四', age: 30 })

  request.onsuccess = function (e) {
    console.log('更新数据成功')
  }

  request.onerror = function (e) {
    console.log('更新数据失败')
  }
}

function read() {
  // 创建一个读写事务
  const transaction = db.transaction(['persons'])
  // 获取对象存储区
  const objectStore = transaction.objectStore('persons')
  // 获取存储键值为1的存储对象
  const objectStoreRequest = objectStore.get(1)
  objectStoreRequest.onsuccess = function (e) {
    // 当前数据
    const record = objectStoreRequest.result
    console.log('record', record)
  }
}

function del() {
  db.transaction(['persons'], 'readwrite').objectStore('persons').delete(1)
}
