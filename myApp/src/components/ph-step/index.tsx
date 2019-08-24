import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class PHItem extends Component {
    static defaultProps = {
        number:0
    }
    render() {
        const {
            number
        } = this.props
        let status = null
        if (number == 1) {
            status = <View className='step_modal_item' style={{textAlign:'left'}}>{number}</View>
        }else if (number == 14) {
            status = <View className='step_modal_item' style={{textAlign:'right'}}>{number}</View>
        }else {
            status = <View className='step_modal_item' style={{textAlign:'center'}}>{number}</View>
        }
        return (
            <View>
             {status}
            </View>
        )
    }
}

