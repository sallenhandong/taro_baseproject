import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import './index.scss'

export default class PickerModal extends Component {
    static defaultProps = {
        isShow: false,
        name: '',
        title: '',
        OndismissModal: () => { },
        handleClickIndex: () => { },
        pickList: []
    }
    state = {
        maxLength: 40,
        areaName: ''
    }
    detailClick = (e: any) => {
        e.stopPropagation()
        console.log(this.props.pickList)
    }
    ItemClick = (index: number) => {
        this.props.handleClickIndex(index);
    }
    render() {
        const {
            isShow, OndismissModal, pickList
        } = this.props
        return (
            <View className={isShow ? 'picker_modal_wrapper_show' : 'picker_modal_wrapper_hidden'} onClick={OndismissModal}>
                <View className='content' onClick={this.detailClick} style={{height: (pickList.length == 2) ? "90px" : "135px"}}>
                    {pickList.map((group, index) => (
                        <View key={index}>
                            <Text className='item' onClick={this.ItemClick.bind(this, index)}>{group.title}</Text>
                            <View className='line'></View>
                        </View>
                    ))}
                </View>
            </View>
        )
    }
}

