import Taro, { Component } from '@tarojs/taro'
import { View, Canvas} from '@tarojs/components'
import './index.scss'
import Charts from '../../utils/wxcharts'

export default class ColumnChart extends Component {
    static defaultProps = {
        canvasId:'',
        categoriesX:null,
        dataY:null
    }
    componentDidMount () {
        this.echartSales(this.props.categoriesX,this.props.dataY)
        
    }
    echartSales(obj, data) {
        let columnSales = new Charts({
           canvasId: this.props.canvasId,
           type: 'column',
           dataPointShape: false,
           animation: true,
           categories: obj,
           series: [{
             name: '成交量',
             data: data
           }],
           yAxis: {
             title: '',
             min: 0
           },
           xAxis: {
             disableGrid: false,
             type: 'calibration',
             axisLine: false,
           },
           extra: {
             column: {
               width: 20
             }
           },
           enableScroll: true,
           width: 215,
           height: 300,
           dataLabel: true
         });
       }
    render() {

        return (
            <Canvas canvasId={this.props.canvasId}/>
        )
    }
}

