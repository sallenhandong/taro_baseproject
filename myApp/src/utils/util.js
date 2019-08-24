import Taro from '@tarojs/taro'
import { fchown } from 'fs';
export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  
  export const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  export const  isBlankString = val => {
    var re = /^[ ]+$/
    if (re.test(val) || val == '') {
      return true;
    } else {
      return false;
    }
  }
  function taroGetStorage(key) {
    return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
  }
  export  async function getStorage (key){
    const userId = await taroGetStorage('token')
    return Promise.resolve(userId);
  }
  export async function judgePermissionHasClickEvent(){
    const userId = await taroGetStorage('userType')
    if (userId == 103) {
      return Promise.reject();
    }else {
      return Promise.resolve();
    }
  }