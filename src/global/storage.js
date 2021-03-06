import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  
  // 最大容量，默认值1000条数据循环存储
  size: '1000',  

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
  
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是在任何时候，直接对storage.sync进行赋值修改
  // 或是写到另一个文件里，这里require引入
  // sync: require('你可以另外写一个文件专门处理sync')
})

const local = {
  /**
   * 设置缓存
   * @params key  必传 唯一标识
   * @params data  数据  type：string || object
   * @params expires 过期时间  不传默认永久  单位：ms
   * @params id  非必传 标识
   *
   * */
  
  set({ key, data, expires, id }) { 
    let setValue = JSON.stringify(data)
    const obj = {
      key: key,
      data: setValue,
      expires: expires ? expires : null
    } 
    if (id) obj.id = id
    storage.save(obj)
  },

  /**
   * 根据key 或者 key-id的到数据
   * @params key 必传
   * @params id  可为空
   *
   * */
  get({ key, id }) { 
    const obj = {
      key: key
    }
    if (id) obj.id = id
    return storage.load(obj).then((res) => { 
      // if (res) return JSON.parse(res)      
      // return res ? JSON.parse(res) : null
      return JSON.parse(res)
    }).catch(err => { 
      throw err      
    })
  },

  /**
   * 删除单个数据
   * key 必传
   * @params key 删除kay所对应的数据，必传
   *
   * @params id  删除id对应的数据 若删除的数据中有id，则必传
   */

  remove({ key, id }) { 
    const obj = {
      key: key
    }
    if (id) obj.id = id
    storage.remove(obj)
  },

  /**
   * 清空所有map，移除所有key-id数据（但会保留只有key的数据）
   * 测试 刷新之后有效，所以应该是在退出app时执行的
   * */
  clearMap() { 
    storage.clearMap()
  },

  /**
   * 清空某个key下的所有数据（仅key-id数据）
   * @paramas key
   * */
  clearMapForKey(key) { 
    storage.clearMapForKey(key)
  },

  /**
   * 获取key下的 所有数据(仅key-id数据)
   * */
  getAllDataForKey(key){
    return storage.getAllDataForKey(key).then(ret => {
      return ret
    })
  },

  /**
   * 获取某个key下的所有ID（仅key-id数据）
   * */
  getIdsForKey(key){
    return storage.getIdsForKey(key).then(ids => {
      return ids
    })
  }
}
export default local

// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用

// 对于web
// window.storage = storage;

// 对于react native
// global.storage = storage;

// 这样，在此**之后**的任意位置即可以直接调用storage
// 注意：全局变量一定是先声明，后使用
// 如果你在某处调用storage报错未定义
// 请检查global.storage = storage语句是否确实已经执行过了

// 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
// 除非你手动移除，这些数据会被永久保存，而且默认不会过期。

// -----*****************************************************-------------------------------
// storage.save({
//   key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
//   data: {
//     from: 'some other site',
//     userid: 'some userid',
//     token: 'some token'
//   },
//   expires: null
// });


// 读取
// storage.load({
//   key: 'loginState',

//   // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
//   autoSync: true,

//   // syncInBackground(默认为true)意味着如果数据过期，
//   // 在调用sync方法的同时先返回已经过期的数据。
//   // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
//   syncInBackground: true,

//   // 你还可以给sync方法传递额外的参数
//   syncParams: {
//     extraFetchOptions: {
//       // 各种参数
//     },
//     someFlag: true,
//   },
// }).then(ret => {
//   // 如果找到数据，则在then方法中返回
//   // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
//   // 你只能在then这个方法内继续处理ret数据
//   // 而不能在then以外处理
//   // 也没有办法“变成”同步返回
//   // 你也可以使用“看似”同步的async/await语法

//   console.log(ret.userid);
//   this.setState({user: ret});
// }).catch(err => {
//   //如果没有找到数据且没有sync方法，
//   //或者有其他异常，则在catch中返回
//   console.warn(err.message);
//   switch (err.name) {
//     case 'NotFoundError':
//       // TODO;
//       break;
//     case 'ExpiredError':
//       // TODO
//       break;
//   }
// })


// 使用key和id来保存数据，一般是保存同类别（key）的大量数据。
// 所有这些"key-id"数据共有一个保存上限（无论是否相同key）
// 即在初始化storage时传入的size参数。
// 在默认上限参数下，第1001个数据会覆盖第1个数据。
// 覆盖之后，再读取第1个数据，会返回catch或是相应的sync方法。
// var userA = {
//   name: 'A',
//   age: 20,
//   tags: [
//       'geek',
//       'nerd',
//       'otaku'
//   ]
// };

// storage.save({
//   key: 'user',  // 注意:请不要在key中使用_下划线符号!
//   id: '1001',   // 注意:请不要在id中使用_下划线符号!
//   data: userA,
//   expires: 1000 * 60
// });

//load 读取
// storage.load({
//   key: 'user',
//   id: '1001'
// }).then(ret => {
//   // 如果找到数据，则在then方法中返回
//   console.log(ret.userid);
// }).catch(err => {
//   // 如果没有找到数据且没有sync方法，
//   // 或者有其他异常，则在catch中返回
//   console.warn(err.message);
//   switch (err.name) {
//     case 'NotFoundError':
//       // TODO;
//       break;
//     case 'ExpiredError':
//       // TODO
//       break;
//   }
// })

// --------------------------------------------------

// 获取某个key下的所有id
// storage.getIdsForKey('user').then(ids => {
//   console.log(ids);
// });

// 获取某个key下的所有数据
// storage.getAllDataForKey('user').then(users => {
//   console.log(users);
// });

// !! 清除某个key下的所有数据
// storage.clearMapForKey('user');

// --------------------------------------------------

// 删除单个数据
// storage.remove({
//   key: 'lastPage'
// });
// storage.remove({
//   key: 'user',
//   id: '1001'
// });

// !! 清空map，移除所有"key-id"数据（但会保留只有key的数据）
// storage.clearMap();


//同步远程数据（刷新）
// storage.sync = {
//   // sync方法的名字必须和所存数据的key完全相同
//   // 方法接受的参数为一整个object，所有参数从object中解构取出
//   // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
//   user(params){
//     let {id, resolve, reject, syncParams: {extraFetchOptions, someFlag}} = params;
//     fetch('user/', {
//       method: 'GET',
//       body: 'id=' + id,
//       ...extraFetchOptions,
//     }).then(response => {
//         return response.json();
//     }).then(json => {
//       //console.log(json);
//       if (json && json.user) {
//         storage.save({
//           key: 'user',
//           id,
//           data: json.user
//         });
//         if (someFlag) {
//           // 根据syncParams中的额外参数做对应处理
//         }
//         // 成功则调用resolve
//         resolve && resolve(json.user);
//       }
//       else {
//         // 失败则调用reject
//         reject && reject(new Error('data parse error'));
//       }
//     }).catch(err => {
//       console.warn(err);
//       reject && reject(err);
//     });
//   }
// }


//有了上面这个sync方法，以后再调用storage.load时，如果本地并没有存储相应的user，那么会自动触发storage.sync.user去远程取回数据并无缝返回。

// storage.load({
//   key: 'user',
//   id: '1002'
// }).then()

//读取批量数据

// 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
// 会在需要时分别调用相应的sync方法，最后统一返回一个有序数组。
// storage.getBatchData([
//   {key: 'loginState'},
//   {key: 'checkPoint', syncInBackground: false},
//   {key: 'balance'},
//   {key: 'user', id: '1009'}
// ]).then(results => {
//   results.forEach(result => {
//       console.log(result);
//   })
// })

//根据key和一个id数组来读取批量数据
// storage.getBatchDataWithIds({
//   key: 'user',
//   ids: ['1001', '1002', '1003']
// }).then()


/*
这两个方法除了参数形式不同，还有个值得注意的差异。getBatchData会在数据缺失时挨个调用不同的sync方法(因为key不同)。
但是getBatchDataWithIds却会把缺失的数据统计起来，将它们的id收集到一个数组中，然后一次传递给对应的sync方法(避免挨个查询导致同时发起大量请求)，
所以你需要在服务端实现通过数组来查询返回，还要注意对应的sync方法的参数处理（因为id参数可能是一个字符串，也可能是一个数组的字符串）。
*/