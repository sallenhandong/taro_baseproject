import Taro, { Component } from '@tarojs/taro'
import { View, Image ,Text} from '@tarojs/components'
import './index.scss'
import icon_red from '../../images/status_big_r.png'
import icon_green from '../../images/status_big_green.png'
import icon_gray from '../../images/status_big_g.png'
import Index from 'src/pages/home/deviceDetail';
export default class StateItem extends Component {
    static defaultProps = {
        status:'',
        index:0
    }
    render() {
        const {
            status,index
        } = this.props

        let iconName = ''
        if (status == '1'){
            iconName = icon_red
        }else if (status == '0') {
            iconName = icon_green
        }
        
        return (
            <View className='state_item_module'>
             <View className='state_item_module_item'>
             <Image src={iconName} className='state_icon'/>
             <View className='title'>{index + 1}</View>
             </View>
            </View>
        )
    }
}

