const loaderUtils = require('loader-utils')

module.exports = function(source) {
  // 获取配置
  const options = loaderUtils.getOptions(this)
  let includeMode = options.includeMode || ['production']
  const reg = /#mock(\d|\D)*\#end/g
  if(includeMode.includes(this.mode)) {
    let newSource = source.replace(reg, '\n')
    return newSource
  }

  return source
}
