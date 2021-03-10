# mock-delete-loader
> 一个低风险的mock规范和工具

## 背景
在开发中，常出现这样的状况: 发布之前，团队成员的偶尔会不严谨地忘了删除mock代码，将mock数据发到线上的情况。这种情况非常危险，却非常普遍。这里面有mock方式不规范的原因，也有代码审查不严格的过失。

但依赖代码审核作为最后一道防线来规避问题，人力和效率成本往往比较高。因此我们倡导梳堵结合的思想，提供了一个简单的规范和webpack loader，用于在指定环境打包的时候自动删除mock代码。


## 安装
```shell
$ yarn add -D mock-delete-loader
```

## 配置loader
```js
// webpack.conf.js

module.exports = {
// ...
  module: {
    rules: [
      // ...
      {
          test: /\.js$/,
          include: [resolve('src')],
          use: [
            'babel-loader',
            {
              loader: 'mock-delete-loader',
              options: {
                // includeMode 指定要删除mock数据的打包环境，不写则默认值： ['production']
                includeMode: ['production'],
              }
            }
          ],
        },
    ]
  }
}

```

### options说明
- includeMode
  用来指定要删除mock数据的打包环境，接收一个数组，数组的元素与webpack 的 mode对应。默认值为 `['production']`

## 在代码中使用mock

- 在代码中使用 `// #mock` 和 `// #end` 包裹mock代码块
- 使用变量重新赋值的方式来写mock数据。即使用mock数据，将真实数据覆盖掉，而不是直接改原始代码
```js
// index.js
let numberA = Api.getNumberA()  

// #mock
  numberA = 12 // 用指定标识包裹mock代码
// #end

console.log(numberA) // development环境输出12,   production环境会输出Api返回的数据  

```
> tips： 包裹标识中，#号和mock、end之间不要有空格


## 
