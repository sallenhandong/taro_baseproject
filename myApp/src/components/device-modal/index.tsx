import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import searchIcon from '../../images/search.png'
import './index.scss'

export default class DeviceModal extends Component {
    static defaultProps = {
        isShow: false,
        onClickSeach: () => { },
        onClickDetail: () => { },
        handleDeviceNumber: () => { },
        onDismissDeviceModal:() => {},
        number: '',
        title: '',
        icon: '',
        isShowContent: false,
        loadingStatus:'0',
        inputNumber:''
    }
    state = {

    }
    OnDeviceNumberChange = (e: any) => {
        const value = e.detail.value;
        this.props.handleDeviceNumber(value);
    }
    clickContent = (e:any) => {
        e.stopPropagation()
    }
    render() {
        const {
            isShow, onClickSeach, onClickDetail, title,
            number,
            icon, isShowContent, loadingStatus,onDismissDeviceModal,inputNumber
        } = this.props
        return (
            <View className={isShow ? 'device_modal_wrapper_show' : 'device_modal_wrapper_hidden'} onClick={onDismissDeviceModal}>
                <View className='content' onClick={this.clickContent}>
                    <View className='title'>
                        <View className='tips'>请输入编号添加设备</View>
                        <Input placeholder='请输入设备编号或者设备昵称' className='searchInput' placeholderStyle='color:#ffffff;font-size:15px;' onInput={this.OnDeviceNumberChange} value={inputNumber}/>
                    </View>
                    <View className='line'></View>
                    {/* <View>
                        {
                            {
                                '0': <View className='content_detail' onClick={onClickDetail} style={{ display: isShowContent ? "flex" : "none" }}>
                                    <Image src={icon} className='content_detail-icon' />
                                    <Text className='content_detail-title'>{title}</Text>
                                    <Text className='content_detail-number'>{number}</Text>
                                </View>,
                                '1': <View className='content_detail_other' style={{ display: isShowContent ? "flex" : "none" }}>
                                    已归属其他公司,请联系厂家
                                </View>,
                                '2': <View className='content_detail_other' style={{ display: isShowContent ? "flex" : "none" }}>
                                    暂无内容
                            </View>
                            }[loadingStatus]
                        }
                    </View> */}
                    <View className='content_detail'>
                    <Image src={icon} className='content_detail-icon' />
                    
                    </View>
                
                    <View className='addDevice' onClick={onClickDetail}>添入设备</View>

                </View>
            </View>
        )
    }
}

