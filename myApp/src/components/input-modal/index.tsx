import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import searchIcon from '../../images/search.png'
import './index.scss'

export default class InputModal extends Component {
    static defaultProps = {
        isShow: false,
        name:'',
        title:'',
        OndismissModal : () => {},
        onConfimClick:() => {},
        handleAreaName:() => {},
        onCancelClick:()=>{},
        placeholder:''
    }
    state = {
        maxLength:40,
        areaName:''
    }
    OnAreaChange = (e:any) => {
        const value = e.detail.value;
        this.props.handleAreaName(value);
    }
    detailClcik = (e:any) => {
        e.stopPropagation()
    }
    render() {
        const {
            onCancelClick,isShow,name,title,OndismissModal,onConfimClick,placeholder
        } = this.props
        const {
            maxLength
        } = this.state
        return (
            <View  className={isShow ?'device_modal_wrapper_show':'device_modal_wrapper_hidden'}  onClick={OndismissModal}>
                <View className='content' onClick={this.detailClcik}>
                    <View className='title'>
                        {title}
                    </View>
                    <Input placeholder={placeholder} maxLength={maxLength} className='searchInput' placeholderStyle='font-size:30rpx;color:#B9B9B8' onInput={this.OnAreaChange} value={name}/>
                    <View className='line'></View>
                    <View className='bottomView'>
                    <View className='cancelBtn' onClick={onCancelClick}>取消</View>
                    <View className='confirmBtn' onClick={onConfimClick}>确定</View>    
                    </View>
                </View>
            </View>
        )
    }
}

