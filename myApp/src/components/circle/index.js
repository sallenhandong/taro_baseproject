import Taro, { Component } from '@tarojs/taro'
import { Canvas } from '@tarojs/components'

class Time extends Component {

  componentDidMount () {
    this.drawTime();

    setInterval(() => {
      this.drawTime();
    }, 1000);
  }

  // 绘制 针表
  drawTime = () => {
    const width = this.props.dataRes.width;
    const height = this.props.dataRes.height;

    const ctx = Taro.createCanvasContext('timeId', this.$scope);
    const R =  width/2 - 30;//圆半径

     //设置坐标轴原点
    ctx.translate(width/2, height/2);
    ctx.save();

    const t = new Date();//获取当前时间
    let h = t.getHours();//获取小时
    h = h>12?(h-12):h;//将24小时制转化为12小时制
    const m = t.getMinutes();//获取分针
    const s = t.getSeconds();//获取秒

   //绘制时针
    ctx.beginPath();
    ctx.setStrokeStyle('green')
    ctx.setLineWidth(10);
    ctx.rotate((Math.PI/6)*(h+m/60+s/3600)-Math.PI/2);
    ctx.moveTo(0,0);
    ctx.lineTo(R-90,0);
    ctx.stroke();
    ctx.restore();
    ctx.save();

    // 绘制分针
    ctx.beginPath();
    ctx.setStrokeStyle('gold')
    ctx.setLineWidth(5);
    ctx.rotate((Math.PI/30)*(m+s/3600)-Math.PI/2);
    ctx.moveTo(0,0);
    ctx.lineTo(R-60,0);
    ctx.stroke();
    ctx.restore();
    ctx.save();

    // 绘制秒针
    ctx.beginPath();
    ctx.setStrokeStyle('red')
    ctx.setLineWidth(1);
    ctx.rotate((Math.PI/30)*s-Math.PI/2);
    ctx.moveTo(0,0);
    ctx.lineTo(R-20,0);
    ctx.stroke();
    ctx.restore();
    ctx.save();


    ctx.draw();

  }

  render() {
    return (
      <Canvas canvasId='timeId' style={'width: 100%;height:'+this.props.dataRes.height+'px'} />
    )
  }
}

export default Time;
