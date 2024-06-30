<h1 align="center">vite-plugin-qiniu-kodo</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/vite-plugin-qiniu-kodo">
    <img src="https://img.shields.io/npm/v/vite-plugin-qiniu-kodo.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://github.com/TryBin03/vite-plugin-qiniu-kodo">
    <img src="https://img.shields.io/github/stars/TryBin03/vite-plugin-qiniu-kodo?sanitize=true" alt="Stars">
  </a>
</p>
在打包过程中自动上传静态资源到 Qiniu Kodo（七牛云的对象存储）

[英文文档](https://github.com/TryBin03/vite-plugin-qiniu-kodo/blob/main/README.md)

# 🎉 特性
- 已经上传的文件不会继续上传
- 支持时间路径，如 `uploadPath/20230101/文件`
- 配置简单，使用 `vite` `outDir` 路径，上传到 Kodo 的相同路径

### 感受一下

![preview](http://open.yiyayo.top/vite-plugin-qiniu-kodo/doc/show2.png)

# 安装

```bash
yarn add -D vite-plugin-qiniu-kodo
```

or

```bash
npm i -D vite-plugin-qiniu-kodo
```

# 基础使用

1. 在vite.config.js中注册这个插件
2. 当在开发或生产中提供服务时，设置基本公共URL路径。

```Javascript
// vite.config.js
import vitePluginQiniuKodo from 'vite-plugin-qiniu-kodo'

export default defineConfig(() => {

    const qiniuConfig = {
        enabled: process.env.NODE_ENV === 'production',
        accessKey: 'XXX',
        secretKey: 'XXX',
        bucket: 'XXX',
        bucketDomain: 'XXX',
        uploadPath: 'XXX',
        zone: 'z2',
        timeAddress: true,
        ignore: ['**/*.html', '**/*.map'],
    }

    return {
        base: qiniuConfig.enabled ? `${qiniuConfig.bucketDomain}`: `./`, // same with webpack public path
        plugins: [vue(), vitePluginQiniuKodo(qiniuConfig)]
    }
})
```

4. 打包

```
npm/yarn run build
```

插件将上传打包后的outDir路径的文件。

# 选项

| 名称           | 描述                                                                                       | 类型                | 默认值           |
|---------------|--------------------------------------------------------------------------------------------|-------------------|---------------|
| accessKey     | 七牛云 kodo accessKey                                                                       | string            |               |
| secretKey     | 七牛云 kodo secretKey                                                                       | string            |               |
| bucket        | 七牛云 kodo 储存空间名称                                                                      | string            |               |
| bucketDomain  | 七牛云 kodo 储存空间域名                                                                      | string            |               |
| uploadPath    | 七牛云 kodo 上传储存空间文件名						                                          | string            |               |
| zone          | 七牛云 kodo 区域名称, 详细信息请见 https://developer.qiniu.com/kodo/1671/region-endpoint-fq    | string            |               |
| timeAddress   | 开启时间路径，如 `uploadPath/20230101/文件`					                                  | boolean           |               |
| ignore      	| 文件忽略规则 默然会上传除去html以外所有静态资源文件                                                 | (string or array)  | `'**/*.html'` |
| ...           | 其他初始化 kodo 的参数，详细信息请见 https://developer.qiniu.com/kodo/sdk/nodejs                | any               |               |

