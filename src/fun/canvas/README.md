# canvas

1. 基本用法：

    1. 绘制矩形

        - fillRect(x,y,width,height)
        - strokeRect(x,y,width,height)
        - clearRect(x,y,width,height)

    2. 绘制路径步骤： 1. 创建路径起始点 2. 画图命令画图 3. 路径封闭 4. 描边或填充

        - beginPath()
        - closePath()
        - stoke()
        - fill()

        1. 移动笔触: moveTo(x,y)
        2. 线: lineTo(x,y)
        3. 圆弧:

            - arc(x,y,radius,startAngle,endAngle,anticlockwise)
                - 画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。
                - 弧度=(Math.PI/180)\*角度。
            - arcTo(x1,y1,x2,y2,radius)
                - 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

        4. 贝塞尔曲线（二次、三次）
        5. 矩阵:
        6. 组合使用


        > 注意:
        >
        > 1. beginPath 后一般设置起点 moveTo()
        > 2. closePath 不是必须的，如果调用 fill() 会自动闭合， 而 stoke() 不会
