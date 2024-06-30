import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginQiniuKodo from '../../index'
const uploadPath = require('./package.json').name;

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
