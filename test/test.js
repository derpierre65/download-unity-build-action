const downloader = require('./../src/downloader');

downloader({
	apiKey: '',
	organizationId: '',
	projectId: '',
	buildTarget: '_local',
	downloadContext: './build.zip',
	unzipContext: './build',
	searchPlatform: '',
	searchLabel: '',
	deleteAfterUnzip: true,
})