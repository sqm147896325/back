// 这里的主题色无法设置，具体还是要看官方文档
// 按需打包及更改默认主题色配置文件
const { override, fixBabelImports, addLessLoader } = require('customize-cra')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      ModifyVars: { '@primary-color': '#1DA57A' }
      // 这里写的是主题颜色
      // 还有很多可以配置，具体可以查官方文档
    }
  })
)
// 改配置需要重新启动
