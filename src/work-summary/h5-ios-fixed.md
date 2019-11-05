# h5 页面的时候，首页顶端 fixed 头 ios 橡皮筋 下拉 不兼容

## 问题描述:

1. 整个页面从电池栏以上都为 h5 页面， UI 图如下：

![顶部UI图](https://github.com/woshixixi/woshixixi.github.io/blob/master/src/work-summary/resource/ui-header.png =300x)

2. 页面过长，上滑后，顶部的“搜索”头部需要固定:

![上滑后UI页面](https://github.com/woshixixi/woshixixi.github.io/blob/master/src/work-summary/resource/scroll-down-header.png =300x)

3. 页面通过 webview 嵌入，整个页面下拉调用原生刷新 loading 刷新

页面大致结构如下:

```html
<div class="wrapper">
    <div class="header"></div>
    <div class="body"></div>
</div>
```

```css
.wrapper {
    position: relative;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    height: 20px;
}

.body {
    padding-top: 20px;
}
```

body 高度高出一个屏幕但时候，就会 scroll, 向上滑动完全没有问题满足 条件 1，2

但条件 3 会出现兼容性问题：在 android 手机完全没有问题，在 ios 手机中自带的“橡皮筋”效果，但"header" div 并不会跟着 body 的下拉而向下移动,使用 safari 浏览器同样会出现这个问题

## 解决方案:

页面渲染两个"header"，一个 "position" 为 "fixed" ，一个 "position" 为 "absolute",监听页面的 "touchstart" "touchmove" 事件, 下拉的时候,将 "fixed" 的 header 隐藏，其他时候将 "position" 为 "absolute" 的 haeder 隐藏

修改页面结构:

```html
<div class="wrapper">
    <div :class="{'header':true,'hide-header':hideHeader,'show-header':!hideHeader}"></div>
    <div :class="{'hidden-header':true,'show-header':hideHeader,'hide-header':!hideHeader}"></div>
    <div class="body"></div>
</div>
```

```css
.wrapper {
    position: relative;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    height: 20px;
}

.hidden-header {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
}

.hide-header {
    opacity: 0;
}

.show-header {
    opacity: 1;
}

.body {
    padding-top: 20px;
}
```

页面加载后，添加监听事件：

```js
    created() {
            this.addRefresh();
    },
    destroyed() {
            this.removeRefresh();
    },
    addRefresh() {
        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchmove', this.handleTouchMove);
    },
    removeRefresh() {
        document.removeEventListener('touchstart', this.handleTouchStart);
        document.removeEventListener('touchmove', this.handleTouchMove);
    },
    handleTouchMove(e) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //处于页面顶部时下拉刷新才起作用
        if (scrollTop <= 0) {
            const touch = e.targetTouches[0]; //获取第一个触点
            //获取手指向下移动的长度距离
            const touchMoveY = Number(touch.pageY) - this.touchStartY;
            if (touchMoveY > 5) {
                this.hideHeader = true;
            }
        } else {
            this.hideHeader = false;
        }
    },
    handleTouchStart(e) {
        const touch = e.targetTouches[0]; //获取第一个触点
        this.touchStartY = Number(touch.pageY); //第一个触点的Y坐标
    },
```
