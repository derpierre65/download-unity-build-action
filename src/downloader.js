const axios = require('axios');
const fs = require('fs');

function getBuild(options, page = 1) {
	const perPage = 25;

	return axios
		.get(`https://build-api.cloud.unity3d.com/api/v1/orgs/${options.organizationId}/projects/${options.projectId}/buildtargets/${options.buildTarget}/builds/`, {
			params: {
				per_page: perPage,
				platform: options.searchPlatform || '',
			},
			headers: {
				Authorization: 'Basic ' + options.apiKey,
			},
		})
		.then(({ data }) => {
			if (options.searchLabel) {
				const build = data.find((build) => build.label === options.searchLabel);
				if (build) {
					return build;
				}

				if (data.length < perPage) {
					return null;
				}

				return getBuild(options, page + 1);
			}
			else {
				return data[0] || null;
			}
		});
}

module.exports = function (options) {
	for (const key of ['apiKey', 'organizationId', 'projectId', 'buildTarget', 'downloadContext']) {
		if (!options[key] || typeof options[key] !== 'string' && !options[key].length) {
			throw new Error('Invalid value for ' + key);
		}
	}

	console.log('Searching build...');

	return getBuild(options)
		.then((build) => {
			if (!build || typeof build !== 'object') {
				throw new Error('Build not found.');
			}

			console.log('Downloading build...');

			const writer = fs.createWriteStream(options.downloadContext);

			return axios
				.get(build.links.download_primary.href, { responseType: 'stream' })
				.then(({ data }) => {
					return new Promise((resolve, reject) => {
						data.pipe(writer);

						let downloadError = null;
						writer.on('error', (error) => {
							downloadError = error;
							writer.close();
							reject(error);
						});
						writer.on('close', () => {
							if (!downloadError) {
								resolve();
							}
						});
					});
				})
				.then(() => {
					if (!options.unzipContext) {
						return;
					}

					const AdmZip = require('adm-zip');
					const zip = new AdmZip(options.downloadContext, {});
					zip.extractAllTo(options.unzipContext, true, false);

					if (options.deleteAfterUnzip) {
						fs.unlinkSync(options.downloadContext);
					}
				});
		});
};