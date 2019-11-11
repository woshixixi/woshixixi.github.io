# canvas

1. 基本用法：

    1. \<canvas width="150" height="150"></canvas>
    2. const ctx = canvas.getContext('2d)

2. 绘制形状：

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

            - quadraticCurveTo(cp1x, cp1y, x, y)

            - bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)

        5. 矩阵:

            - rect(x, y, width, height)

        6. 组合使用


        > 注意:
        >
        > 1. beginPath 后一般设置起点 moveTo()
        > 2. closePath 不是必须的，如果调用 fill() 会自动闭合， 而 stoke() 不会

3. 添加样式及颜色：

    1. 色彩 Colors
        - fillStyle
        - strokeStyle
    2. 透明度 Transparency
        - globalAlpha
        - rgba()
    3. 线型 Line styles
        - lineWidth
        - lineCap = type
        - lineJoin = type
        - miterLimit = value
        - getLineDash()
        - setLineDash(segments)
        - lineDashOffset = value
    4. 渐变 Gradients
        - createLinearGradient(x1, y1, x2, y2)
        - createRadialGradient(x1, y1, r1, x2, y2, r2)
        - gradient.addColorStop(position, color)
    5. 图案样式 Patterns
        - createPattern(image,type)

4. 变形：

    1. save()
    2. restore()

    3. 移动 translate(x,y)
    4. 旋转 rotate(angle)
    5. 缩放 scale(x,y)
    6. 变形 transform(m11,m21,m21,m22,dx,dy)

5. 合成与裁剪：

    1. globalCompositeOperation

        - 这个属性设定了在画新图形时采用的遮盖策略，其值是一个标识 12 种遮盖方式的字符串

    - clip() 将当前正在构建的路径转挂为当前的裁剪路径

6. 基本动画：
