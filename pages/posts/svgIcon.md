---
title: Vue3封装svg图标组件
date: 2023-11-23
description: 
tag:  Vue3
author: kakachao
---
# Vue3封装svg图标组件
## **一、新建SvgIcon组件**

1.新建components/SvgIcon/index.vue文件
```js
<template>
  <!-- 展示外部图标 -->
  <div v-if="isExternal" :style="styleExternalIcon" 
      class="svg-external-icon svg-icon" :class="className">
  </div>
  <!-- 展示内部图标 -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})

/**
 * 判断当前图标是否为外部图标
 */
function external(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const isExternal = computed(() => external(props.icon))
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

/**
 * 内部图标
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
```

## **二.使用webpack打包时**

1.新建src/assets/icons/svg文件夹（用于存放svg）

2.新建icons/index.ts文件，导入所有svg

```js
import SvgIcon from '@/components/svgicons/SvgIcon.vue'
/**
 * 导入所有 SVG文件
 */
export const svgRequire=require.context('./svg',false,/\.svg$/);

/**
 * 全局注册SvgIcon
 */
svgRequire.keys().forEach(svgIcon=>svgRequire(svgIcon));
// console.log(svgRequire)
export default (app:any)=>{
    app.component('svg-icon',SvgIcon);
}


```
**4.使用svg-sprite-loader处理svg图标**

```js
npm install --save-dev svg-sprite-loader@6.0.9
```
**5.配置vue.config.ts**

```js
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}

```
**6.在main.ts中导入并传入app参数**

```js
// 导入 svgIcon 
import installIcons from '@/icons'

installIcons(app)
```

## **三.使用vite工具时**
**1.在assets文件夹下新建svg文件夹，用来保存.svg文件**

**2.安装 *vite-plugin-svg-icons* 为开发依赖：**

```js
npm i --save-dev vite-plugin-svg-icons
```

**3.修改vite.config.ts**
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path' // 引入 path
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定 symbolId 的格式
      symbolId: 'icon-[name]'
    })
  ],
})

```
**4.修改main.ts**
```js
import 'virtual:svg-icons-register'
```
