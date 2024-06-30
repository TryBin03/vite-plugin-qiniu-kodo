const chalk = require('chalk')
const glob = require('glob')
const path = require('path')
const dayjs = require('dayjs')
const { normalizePath } = require('vite')
const qiniu = require('qiniu')

export default function vitePluginQiniuKodo(options) {
	let baseConfig = '/'
	let buildConfig = ''

	if(!options.enabled) {
		return
	}

	return {
		name: 'vite-plugin-qiniu-kodo',
		enforce: 'post',
		apply: 'build',
		configResolved(config) {
			baseConfig = config.base
      		buildConfig = config.build
		},
		async closeBundle() {
			const outDirPath = normalizePath(path.resolve(normalizePath(buildConfig.outDir)))

			const uploadToken= new qiniu.rs.PutPolicy({scope: options.bucket})
				.uploadToken(new qiniu.auth.digest.Mac(options.accessKey, options.secretKey));
			const formUploader = new qiniu.form_up.FormUploader(new qiniu.conf.Config({
				regionsProvider: qiniu.httpc.Region.fromRegionId(options.zone)
			}));

			const kayPrefix = options.uploadPath + (options.timeAddress ? "/" + dayjs().format("YYYYMMDD") : '')

			console.log("\nstart upload \n");
			const startTime = new Date().getTime()

			const files = glob.sync(
				outDirPath + '/**/*',
				{
					nodir: true,
					dot: true,
					ignore: options.ignore !== undefined ? options.ignore :	'**/*.html'
				}
			)

			for (const file of files){
				const fileName = file.replace(outDirPath, '');
				const key = kayPrefix + fileName

				const putExtra = new qiniu.form_up.PutExtra();
				// 文件上传
				await formUploader.putFile(uploadToken, key, file, putExtra)
					.then(({ data, resp }) => {
						if (resp.statusCode !== 200) {
							console.log(resp.statusCode);
							console.log(data);
						} else {
							console.log(`upload successful: ${fileName} => ${options.bucketDomain}/${key}`)
						}
					})
					.catch(err => {
						console.log('failed', err);
					});
			}
			const spend = (new Date().getTime() - startTime) / 1000
			console.log(`\nupload successful :), spend ${spend.toFixed(2)}s\n`);
		}
	}
}

