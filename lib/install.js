'use strict';
const binBuild = require('bin-build');
const bin = require('.');

bin.run(['--version']).then(() => {
	console.log('jpegoptim pre-build test passed successfully');
}).catch(async error => {
	console.warn(error.message);
	console.warn('jpegoptim pre-build test failed');
	console.info('compiling from source');

	try {
		await binBuild.url('https://github.com/tjko/jpegoptim/archive/RELEASE.1.5.4.tar.gz', [
			`./configure --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
			'make install'
		]);

		console.log('jpegoptim built successfully');
	} catch (error) {
		console.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});
