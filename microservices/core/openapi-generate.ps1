param(
    [string]$ProjectPath = $(Get-Location),
    [string]$YamlFile = "api.yaml",
    [string]$OutputDir = "src/@generated"
)

docker run --rm `
    -v "${ProjectPath}:/local" `
    openapitools/openapi-generator-cli `
    generate `
    -i "/local/${YamlFile}" `
    -g typescript-nestjs-server `
    -o "/local/${OutputDir}"
