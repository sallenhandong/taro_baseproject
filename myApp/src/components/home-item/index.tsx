import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Image} from '@tarojs/components'
import editIcon from '../../images/edit.png'
import deleteIcon from '../../images/delete.png'
import deviceBgIcon from '../../images/home_device_bg.png'
import './index.scss'

export default class HomeItem extends Component {
  static defaultProps = {
    title: '',
    number: '',
    icon: '',
    isOnline:0,
    onClick: () => {},
    onEditClick: () => {},
    onDeleteClick: () => {},
    userType:0,
    onLongPress: () => {}
  }
  editViewClick = (e:any) => {
    e.stopPropagation()
  }
  render () {
    const {
        title, number, icon, onClick,isOnline,onLongPress
      } = this.props
    return (
        <View className='home_item' onClick={onClick} onLongPress={onLongPress}  style={{backgroundColor: (isOnline== 1) ? "#FFFFFF" : "#FFFFFF",opacity:(isOnline== 1) ? 1 : 0.3}}>
           <View className='content'>
           <Image src={icon} className='icon'/>
            <Text className='title'>{title}</Text> 
           </View>
           <Text className='number'>{number}</Text>  
            {/* <View className='editView' onClick={this.editViewClick}>
              <Image  src={editIcon} className='editIcon'   onClick={onEditClick} style={{display:(userType != 103 && userType != 1)? 'inline-block' :'none'}}/>            </View> 
            <View className='deleteView' onClick={this.editViewClick}>
              <Image  src={deleteIcon} className='editIcon' onClick={onDeleteClick} style={{display:(userType == 101)? 'inline-block' :'none'}}/>
            </View>           */}
            <View className='line'></View>
            <View className='onlineDot' style={{backgroundColor: (isOnline== 1) ? "#6FCE1B" : "#D36273"}}></View>
        </View>
    )
  }
}

