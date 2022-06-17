# Download Unity Build Action

![Issues](https://img.shields.io/github/license/derpierre65/download-unity-build-action)
![Issues](https://img.shields.io/github/issues/derpierre65/download-unity-build-action)
[![Discord](https://img.shields.io/discord/933758189491613707)](https://discord.gg/Zg4VQXZ7MG)

This action send the latest changelog to given webhook url.

## Inputs
### `api-key`
**Required** The API key to call the unity cloud service. You can find your key in the unity dashboard at https://dashboard.unity3d.com/ (DevOps -> Cloud Build -> Settings -> API Settings).

### `organization-id`
**Required** The id of your organization. You can find this id in the url of a project (/organizations/{organizationId}/projects/{projectId}/...

### `project-id`
**Required** The id of your project. You can find this id in the url of a project (/organizations/{organizationId}/projects/{projectId}/...

### `build-target`
**Required** Build Target of your build.

### `search-platform`
If given, only builds with this platform will be searched.

### `search-label`
If given, only builds with this label will be searched.

### `download-context`
Directory where the build zip will be saved. Default: `./build.zip`

### `unzip-context`
Directory in which the build zip should be unzipped. Default: `./build`

### `delete-after-unzip`
If `true`, the .zip file will be deleted after unzip. Default: `true`

## Example usage

```yaml
- name: Donwload latest server build
  uses: derpierre65/download-unity-build-action@main
  with:
    api-key: ${{ secrets.UNITY_CLOUD_API_KEY }}
    organization-id: ${{ secrets.UNITY_CLOUD_ORGANIZATION_ID }}
    project-id: ${{ secrets.UNITY_CLOUD_PROJECT_ID }}
    build-target: _local
    search-platform: standalonelinux64
```
