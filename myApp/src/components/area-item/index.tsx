/**
 * @file 左滑列表项
 */

import Taro, { Component } from '@tarojs/taro';
import { View, Image,Text } from '@tarojs/components';
import { getEvents, globalEventsName } from '../../utils/events'
import addIcon from '../../images/add_area.png'
import area_delete from '../../images/area_delete.png'
import './index.scss'

export default class AreaItem extends Component {
  static defaultProps = {
    index:'',
    title: '',
    maxLength:0,
    currentIndex: '',
    onSetCurIndex: () => {},
    onClick: () => {},
    handleEditClick:() => {},
    onDragStart:()=>{},
    onClickUpClick:()=>{},
    onClickDownClick:()=>{},
    onDeleteClick:()=>{},
    onAddClick:()=>{},
    isDelete:false,
    item:{}
  }

  state = {
    hasTransition: false
  }

  componentWillMount () {
    getEvents('global').on(globalEventsName.EVENT_LISTEN_SCROLL, () => {
      this.setState({
        hasTransition: true
      })
      this.moveX = 0
    })
  }

  componentDidMount () {
    this.startX = 0
    this.currentX = 0
    this.moveX = 0
    this.moveY = 0
  }

  handleTouchStart = (obj:any,index:number,e:any) => {
    this.startX = e.touches[0].pageX
    this.startY = e.touches[0].pageY
    this.props.handleEditClick(obj,index,e)
  }

  handleTouchMove (index, e) {
    
    // 若想阻止冒泡且最外层盒子为scrollView，不可用e.stopPropogagation()，否则页面卡死
    this.currentX = e.touches[0].pageX
    this.moveX = this.currentX - this.startX
    this.moveY = e.touches[0].pageY - this.startY
    // 纵向移动时return
    if (Math.abs(this.moveY) > Math.abs(this.moveX)) {
      return
    }
    // 滑动超过一定距离时，才触发
    if (Math.abs(this.moveX) < 10 ) {
      return
    }
    else {
      // 否则没有动画效果
      this.setState({
        hasTransition: true
      })
    }
    this.props.onSetCurIndex(index)
  }

  handleTouchEnd = e => {
    // 结束时，置为true，否则render时不生效
    this.setState({
      hasTransition: true
    })
  }
  deleteEnd = () => {
    this.moveX = 0;
  }
  deleteClick = (e:any) => {
    e.stopPropagation()
  }
  render () {
    const {item,onDeleteClick,onAddClick,isDelete ,maxLength, title, currentIndex ,onClick,index,onDragStart,onClickUpClick,onClickDownClick} = this.props
    const {hasTransition } = this.state
    // 左滑时，出现del，右滑时，恢复原位，距离为操作按钮大小
    // 也可以将滑动距离作为移动距离，但是效果不太好
    const distance = this.moveX >= 0 ? 0 : -100
    const prefix = 'area-item'
    let moveStyle = {}
    // 排他性，若某一个处于滑动状态时，其他都回归原位
    if (hasTransition && currentIndex === index) {
      moveStyle.transform = `translateX(${distance}PX)`
      moveStyle.webkitTransform = `translateX(${distance}PX)`
      moveStyle.transition = 'transform 0.3s ease'
      moveStyle.WebkitTransition = 'transform 0.3s ease'
    }
    let status = null;
    if (index == maxLength) {
      status =  <View className='addArea_item' onClick={onAddClick}>
      <Image src={addIcon} className='addIcon'/>
       <Text>添加区域</Text>
   </View>
    }else {
      status =   <View
      className={`${prefix}-left`}
    >
      <View className={`${prefix}-contentContainer`} onClick={onClick}>
        <View  className='deleteView'  style={{display: isDelete?'flex':'none',marginLeft:isDelete?'20rpx':'-100rpx'}} onClick={this.deleteClick} >  
        <Image src={area_delete} className='deleteIcon' onClick={onDeleteClick}></Image>
        </View>
        <View className={`${prefix}-areaName`}>{title}</View>
        <View className={`${prefix}-contentContainer-arrowContainer`}>
        {/* <Image src={arrow_up} className={`${prefix}-arrowClass`} style={{display:(index == 0)?'none':'block'}} onClick={onClickUpClick}/>
        <Image src={arrow_down} className={`${prefix}-arrowClass`} style={{display:(index == 0)?'none':'block'}} onClick={onClickDownClick}/> */}
        </View>
      </View>
    </View>
    }

    return (
      <View className={prefix}>
        <View className={`${prefix}-wrap`} style={moveStyle}>
        {
          status
        }
    
          <View className={`${prefix}-right`} onClick={onClick} onTouchEnd={this.deleteEnd}>
            <View className={`${prefix}-del`}>删除</View>
          </View>
        </View>
      </View>
    )
  }
}
            // onTouchStart={this.handleTouchStart.bind(this,item,index)}
            // onTouchMove={this.handleTouchMove.bind(this, index)}
            // onTouchEnd={this.handleTouchEnd}
            // draggable='true'