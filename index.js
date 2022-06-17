const core = require('@actions/core');
const downloader = require('./src/downloader');

(async () => {
	try {
		await downloader({
			apiKey: core.getInput('api-key'),
			organizationId: core.getInput('organization-id'),
			projectId: core.getInput('project-id'),
			buildTarget: core.getInput('build-target'),
			searchPlatform: core.getInput('search-platform'),
			searchLabel: core.getInput('search-label'),
			downloadContext: core.getInput('download-context'),
			unzipContext: core.getInput('unzip-context'),
			deleteAfterUnzip: core.getBooleanInput('delete-after-unzip'),
		});
	}
	catch (error) {
		core.setFailed(error.message);
	}
})();