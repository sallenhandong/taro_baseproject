import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Image} from '@tarojs/components'
import addIcon from '../../images/add_area.png'
import './index.scss'

export default class AdddAreaItem extends Component {
  static defaultProps = {
    title: '',
    onClick: () => {},
  }
  render () {
    const {
        onClick
      } = this.props
    return (
        <View className='addArea_item' onClick={onClick}>
           <Image src={addIcon} className='icon'/>
            <Text>添加区域</Text>
        </View>
    )
  }
}

