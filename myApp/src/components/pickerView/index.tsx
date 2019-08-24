import Taro, { Component } from '@tarojs/taro'
import { View, Text, PickerViewColumn, PickerView } from '@tarojs/components'
import './index.scss'

export default class SAPickerView extends Component {
    static defaultProps = {
        isShow: false,
        pickerTitle: '默认标题',
        cancelTitle: '取消',
        confirmTitle: '确定',
        values: [2],
        columnsData: [],
        columns: 1,
        handleColumnsChange:()=>{},
        confirmAction:()=>{},
        cancelAction:()=>{}
    }
    onChangePickerValues = (e:any) => {
        let arr = e.detail.value;
        if (this.props.columns == 1) {
            let index = arr[0]
            let value = this.props.columnsData[index]
            console.log(value)
            this.props.handleColumnsChange(value);
           
        }else   if (this.props.columns == 2) {
            let index1 = arr[0]
            let index2 = arr[1]
            let value1 = this.props.columnsData[0][index1]
            let value2 = this.props.columnsData[1][index2]
            this.props.handleColumnsChange(value1,value2);
        }
      
    }
    render() {
        const {
            isShow, pickerTitle, cancelTitle, confirmTitle, values, columnsData, columns,cancelAction,confirmAction
        } = this.props
        return (
            <View className={isShow ? 'picker_modal_wrapper_show' : 'picker_modal_wrapper_hidden'}>
                <View className='picker_modal_content'>
                    <View className='picker-header'>
                        {/* <Text className='cancelTitle' onClick={cancelAction}>{cancelTitle}</Text> */}
                        <Text className='title'>{pickerTitle}</Text>
                        <Text className='confirmTitle' onClick={confirmAction}>{confirmTitle}</Text>
                    </View>
                    <PickerView  value={values} onChange={this.onChangePickerValues} className='myPicker'>
                        {{
                            1: <PickerViewColumn> 
                                {columnsData.map((item, index) => {
                                    return (
                                        <View className='content' key={index}>{item}</View>
                                    )
                                })}
                            </PickerViewColumn>,
                            2: <View className='content_container'>
                                <PickerViewColumn>
                                    {columnsData[0].map((item, index) => {
                                        return (
                                            <View className='content' key={index}>{item}</View>
                                        )
                                    })}
                                </PickerViewColumn>
                                <PickerViewColumn>
                                    {columnsData[1].map((item, index) => {
                                        return (
                                            <View className='content' key={index}>{item}</View>
                                        )
                                    })}
                                </PickerViewColumn>
                            </View>
                        }[columns]}



                    </PickerView>
                </View>



            </View>
        )
    }
}

