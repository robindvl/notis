param(
    [string]$RootPath = "$(Get-Location)/../..",
    [string]$CorePath = "microservices/core",
    [string]$GatewayPath = "apps/api",
    [string]$YamlFile = "openapi.yaml"
)

# Normalize paths
$RootPath = [System.IO.Path]::GetFullPath($RootPath)

Write-Host "Generating Server in $CorePath..."
docker run --rm `
    -v "${RootPath}:/local" `
    openapitools/openapi-generator-cli `
    generate `
    -i "/local/${CorePath}/${YamlFile}" `
    -g typescript-nestjs-server `
    -o "/local/${CorePath}/src/@generated"

Write-Host "Generating Client in $GatewayPath/src/@generated/core.api..."
docker run --rm `
    -v "${RootPath}:/local" `
    openapitools/openapi-generator-cli `
    generate `
    -i "/local/${CorePath}/${YamlFile}" `
    -g typescript-fetch `
    -o "/local/${GatewayPath}/src/@generated/core.api" `
    --additional-properties=typescriptThreePlus=true,useSingleParameter=true
