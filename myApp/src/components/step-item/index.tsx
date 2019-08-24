import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class StepItem extends Component {
    static defaultProps = {
        number:0,
        maxNumber:10
    }
    render() {
        const {
            number,maxNumber
        } = this.props
        let status = null
        
        if (number < maxNumber/2 + 1 ) {
            status = <View className='step_modal_item' style={{textAlign:'left'}}>{number}</View>
        }else if (number  > maxNumber/2 + 1 ){
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

