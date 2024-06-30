<h1 align="center">vite-plugin-qiniu-kodo</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/vite-plugin-qiniu-kodo">
    <img src="https://img.shields.io/npm/v/vite-plugin-qiniu-kodo.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://github.com/TryBin03/vite-plugin-qiniu-kodo">
    <img src="https://img.shields.io/github/stars/TryBin03/vite-plugin-qiniu-kodo?sanitize=true" alt="Stars">
  </a>
</p>

Upload static resources to qiniu kodo during packaging

[中文文档](https://github.com/TryBin03/vite-plugin-qiniu-kodo/blob/master/README_CN.md)

# Feature

- Files that have already been uploaded will not be uploaded
- Support time path, such as `uploadPath/20230101/file` 
- The configuration is simple, using the vite outDir path, the same path as uploading to Kodo

# Preview

![preview](http://open.yiyayo.top/vite-plugin-qiniu-kodo/doc/show2.png)

# Installation

```bash
yarn add -D vite-plugin-qiniu-kodo
```

or

```bash
npm i -D vite-plugin-qiniu-kodo
```

# Basic usage

1. Register the plugin in vite.config.js
2. Set base public URL path when served in development or production.

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

3. Build Production

```
npm/yarn run build
```

The plugin will upload files of outDir path after bundle.

# options

| options          | description                                                                                     | type               | default       |
|------------------|-------------------------------------------------------------------------------------------------|--------------------|---------------|
| accessKey        | qiniu oss accessKey                                                                             | string             |               |
| secretKey        | qiniu oss secretKey                                                                             | string             |               |
| bucket           | qiniu oss bucket name                                                                           | string             |               |
| bucketDomain     | qiniu oss bucket domain                                                                         | string             |               |
| uploadPath       | qiniu oss upload storage file name						                                                        | string             |               |
| zone             | storage room name, see for details https://developer.qiniu.com/kodo/1671/region-endpoint-fq     | string             |               |
| timeAddress      | Enable the time path file `uploadPath/20230101/file`                                            | boolean            |               |
| ignore      	    | ignore file rules, silently upload all static resource files except html                        | (string or array)  | `'**/*.html'` |
| ...              | other parameters to initialize oss, see for details https://developer.qiniu.com/kodo/sdk/nodejs | any                |               |

