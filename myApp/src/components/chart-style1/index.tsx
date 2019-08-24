import Taro, { Component } from '@tarojs/taro'
import { View, Canvas} from '@tarojs/components'
import './index.scss'

export default class ChartStyleView extends Component {
    static defaultProps = {
        maxValue:40,
        x:20,
        h:60,
        canvasId:'',
        unit:'M3/H',
        currentValue:0
    }
    componentDidMount () {
        let that = this;
        setTimeout(() => {
            that.drawSystemBar()
        }, 500);
       
    }
    drawSystemBar() {
        let c = Number(20)/this.props.maxValue * 100
        let h = this.props.h
        let x = this.props.x
        let r = 50
        const ctx2 = Taro.createCanvasContext(this.props.canvasId, this.$scope);
        var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
        //圆环的绘制
        ctx2.arc(x, h, r, -0.5 * Math.PI, num); //绘制的动作
        ctx2.setStrokeStyle("#73EC45"); //圆环线条的颜色
        ctx2.setLineWidth(4);	//圆环的粗细
        ctx2.setLineCap("square");	//圆环结束断点的样式  butt为平直边缘 round为圆形线帽  square为正方形线帽
        ctx2.stroke();
        ctx2.closePath(); //结束画布  

        //圆形外面刻度               
        for (var i = 0; i < 100; i++) {
            ctx2.save();
            ctx2.setLineWidth(2);
            ctx2.setStrokeStyle('#C0C0C0');
            ctx2.translate(x, h);
            ctx2.rotate(i * 2 / 50 * Math.PI);//i * 360/maxvalue * Math.PI / 180
            ctx2.beginPath();
            ctx2.moveTo(0, (r + 2));
            ctx2.lineTo(0, (r - 2));
            ctx2.stroke();
            ctx2.closePath();
            ctx2.restore();
        }
        ctx2.beginPath(); //画笔开始
        ctx2.setLineWidth(1);
        ctx2.setStrokeStyle('#21ABA7'); //设置画笔的颜色 
        ctx2.arc(x, h, r, -0.5 * Math.PI, num); //绘制圆形，坐标250,250 半径200，整圆（0-360度），false表示顺时针 
        ctx2.setLineWidth(6);	//圆环的粗细
        ctx2.stroke(); //绘图    
        ctx2.closePath(); //结束画布


        ctx2.setFillStyle('#3a5463');
        ctx2.setFontSize(16);
        ctx2.setTextAlign('center');
        ctx2.fillText(this.props.currentValue,x, h - 5);

        ctx2.setFillStyle('#9B9B9B');
        ctx2.setFontSize(14);
        ctx2.setTextAlign('center');
        ctx2.fillText(this.props.unit, x, h + 20);
        ctx2.draw();
    }
    render() {

        return (
            <Canvas canvasId={this.props.canvasId} className="canvas" />
        )
    }
}

