import Taro, { Component } from '@tarojs/taro'
import { View, Canvas} from '@tarojs/components'
import './index.scss'

export default class ChartViewStyle2 extends Component {
    static defaultProps = {
    
        maxValue:40,
        maxCurrentValue:12,
        currentValue:100,
        x:20,
        h:60,
        canvasId:'',
        unit:''
    }
    componentDidMount () {
        this.drawDisplayTimeCirle()
    }
    drawDisplayTimeCirle = () => {
        const maxValue = this.props.maxValue
        const maxCurrentValue = this.props.maxCurrentValue
        const proportionHour = maxValue/maxCurrentValue
        const resultHour = Number(this.props.currentValue) * proportionHour 
        let c = resultHour/ maxValue * 100
        c = Math.floor(c)
        let h = this.props.h
        let x = this.props.x
        let r = 50
        const ctx = Taro.createCanvasContext(this.props.canvasId, this.$scope);
        var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
        //圆环的绘制
        ctx.arc(x, h, r, -0.5 * Math.PI, num, false); //绘制的动作
        ctx.setStrokeStyle("#489B70"); //圆环线条的颜色
        ctx.setLineWidth(1);	//圆环的粗细
        ctx.setLineCap("butt");	//圆环结束断点的样式  butt为平直边缘 round为圆形线帽  square为正方形线帽
        ctx.stroke();
        ctx.closePath(); //结束画布  

     

        //小时进度刻度              
        for (var i = 0; i < maxValue; i++) {
            ctx.save();
            ctx.setLineWidth(2);
            ctx.setStrokeStyle('#489B70');
            if (i > resultHour) {
                ctx.setStrokeStyle('#C0C0C0');
            }
            ctx.translate(x, h);
            ctx.rotate(i * 2 / 40 * Math.PI);//i * 360/maxvalue * Math.PI / 180
            ctx.beginPath();
            ctx.moveTo(0, -(r));
            ctx.lineTo(0, -(r - 4));
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }

       

        //小时
        ctx.setFillStyle('#3a5463');
        ctx.setFontSize(16);
        ctx.setTextAlign('center');
        ctx.fillText(this.props.currentValue, x - 10, h);

        ctx.setFillStyle('#9B9B9B');
        ctx.setFontSize(14);
        ctx.setTextAlign('center');
        ctx.fillText(this.props.unit, x + 10, h);

        ctx.draw();
    }

    render() {

        return (
            <Canvas canvasId={this.props.canvasId} className="canvas" />
        )
    }
}

