import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import './index.scss'
import bgImageIcon from '../../images/Login-bg.png'
import { isBlankString, getStorage } from '../../utils/util'
import * as actions from '../../actions/user'
import { connect } from '@tarojs/redux'

@connect(state => state, actions)
export default class Index extends Component {
  state = {
    username: '',
    password: '',
    maxLength: 40
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: ''
  }

  componentWillMount() { }

  componentDidMount() {
    let key = 'userId';
    getStorage(key).then((data: string) => {
      if (data != '' && data != undefined) {
        Taro.switchTab({
          url: '../home/index'
        })
      }
    }).catch(() => {

    })

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  loginAction = () => {
    if (isBlankString(this.state.username)) {
      Taro.showToast({
        title: '请输入账号',
        icon: 'none'
      })
    } else if (isBlankString(this.state.password)) {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none'
      })
    } else {
      const payload = {
        UserName: this.state.username,
        Password: this.state.password
      }
      this.props.dispatchLogin(payload).then((data: any) => {

        if (data.ExtCode == "NeedCustomer") {
          Taro.navigateTo({
            url: '../regist/joinCompany/index?userId=' + data.Id
          })
        } else {
          Taro.switchTab({
            url: '../home/index'
          })
          Taro.setStorageSync('token', data.Token);
          Taro.setStorageSync('userType', data.UserType);
        }
      }).catch(() => {

      })
    }
  }
  registAction = () => {
    Taro.navigateTo({
      url: '/pages/regist/index'
    })
  }
  forgetPwdAction = () => {
    Taro.navigateTo({
      url: '/pages/regist/forgetpwd/index'
    })
  }
  OnchangeUsername = (e: any) => {
    const value = e.detail.value;
    this.state.username = value;
  }
  OnchangePassword = (e: any) => {
    const value = e.detail.value;
    this.state.password = value;
  }
  render() {
    return (
      <View className='login'>
        <Image src={bgImageIcon} className='loginBgImage'/>
        <Input placeholder='请输入账号' className='login_inputClass' placeholderStyle='color:#B9B9B8;font-size:30rpx;' maxLength={this.state.maxLength} onInput={this.OnchangeUsername} value={this.state.username} />
        <View className='login_line'></View>
        <Input placeholder='请输入密码' password className='login_inputClass' placeholderStyle='color:#B9B9B8;font-size:30rpx;' maxLength={this.state.maxLength} onInput={this.OnchangePassword} value={this.state.password} />
        <View className='login_line'></View>
        <View onClick={this.loginAction} className='login_loginBtn'>登录</View>
        <View className='login_regist_container'>
          <View onClick={this.forgetPwdAction} className='login_regist_container-registBtn'>忘记密码</View>
          <View onClick={this.registAction} className='login_regist_container-registBtn'>注册</View>
        </View>
      </View>
    )
  }
}
