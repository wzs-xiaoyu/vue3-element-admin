/**loadBMap */

import { reject, resolve } from "core-js/fn/promise";

/**
 * @description 加载百度地图相关资源js
 * @param {string} ak
 */
export function loadBMap(ak) {
  return new Promise((resolve, reject) => {
    // 聚合API依赖基础库，因此先加载基础库再加载聚合API
    asyncLoadBaiduJs(ak)
      .then(() => {
        asyncLoadJs("http://api.map.baidu.com/library/TextIconoverlay/1.2/src/TextIconoverlay.js")
          .then(() => {
            asyncLoadJs("http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js")
              .then(() => {
                resolve();
                return true;
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * @description 加载百度地图基础组件js
 * @param {string} ak
 */
export function asyncLoadBaiduJs(ak) {
  return new Promise((resolve, reject) => {
    // window.onload=function(){
    //   resolve(BMap)
    // }
    window.onBMapCallback = function () {
      resolve(BMap);
    };
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=onBMapCallback";
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
/**
 * @description 加载第三方组件js公共方法
 * @param {string} url
 */
export function asyncLoadJs(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.head.appendChild(script);
    script.onload = () => {
      resolve;
    };
    script.onerror = reject;
  });
}
