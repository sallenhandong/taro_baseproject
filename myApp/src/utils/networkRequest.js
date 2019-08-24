import Taro from '@tarojs/taro'
import md5_util from './md5'
const CODE_SUCCESS = 200
function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

/**
 * 简易封装网络请求
 * 
 * @param {*} options
 */
export default async function fetch(options) {
  const { url, payload, method = 'POST', showToast = true,ignoreToken = false,isShowLoading = true} = options
  let header = { 'Content-Type': 'application/json' };
  let timestamp = new Date().getTime();
  header.timestamp = timestamp;
  let token = '';
  if (!ignoreToken) {
    token = await getStorage('token');
  }
  header.token = token;
  const sign = md5_util.hexMD5(token + timestamp + "ShuJuCaiJi");
  header.sign = sign;
  if (isShowLoading) {
    Taro.showLoading({
      title: '加载中',
    });
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (data) => {
    if (isShowLoading) {
      Taro.hideLoading()
    }
    if (data.statusCode !== CODE_SUCCESS) {
      return Promise.reject();
    }else {
      if (data.data.IsSuccess) {
        if (data.data.Data == undefined){ 
          return Promise.resolve('');
        }
        if (data.data.Data.Data != undefined && data.data.Data.Data != null){
          return Promise.resolve(data.data.Data);
        }else{
          console.log(data.data.Data)
          return Promise.resolve(data.data.Data);
        }
      
      }else {
        wx.showToast({
          title: data.data.Message,
          icon: 'none'
        });
        return Promise.reject();
      }
    }
  })
}
