$subscriptionId = "2ead6133-2cc0-4269-b52f-e653fb4c3dae"
$resourceGroupName = "TeamsCreateMeetingApp"
$storageAccountName = "teamscreatemeetingcustom"

if($context -eq $null){ Connect-AzAccount}

$context = Get-AzSubscription -SubscriptionId $subscriptionId
Set-AzContext $context

$storageAccount =  Get-AzStorageAccount -ResourceGroupName $resourceGroupName -AccountName $storageAccountName
$ctx = $storageAccount.Context

Enable-AzStorageStaticWebsite -Context $ctx -IndexDocument "index.html"

# Setting properties of all the files to text/html is a bad hack... need to do that

Get-ChildItem -Path ../build -File -Recurse | Set-AzStorageBlobContent `
-Container "`$web" `
-Properties @{ ContentType = "text/html; charset=utf-8" } `
-Context $ctx `
-Force

$blobs = Get-AzStorageBlob -Container "`$web" -Context $ctx
foreach ($blob in $blobs)
{
    $CloudBlockBlob = [Microsoft.Azure.Storage.Blob.CloudBlockBlob] $Blob.ICloudBlob
    $CloudBlockBlob.FetchAttributes()
    if($blob.Name -like "*.svg")
    {
        $CloudBlockBlob.Properties.ContentType = "image/svg+xml"
    }elseif($blob.Name -like "*.json")
    {
        $CloudBlockBlob.Properties.ContentType = "application/json"
    }elseif($blob.Name -like "*.css")
    {
        $CloudBlockBlob.Properties.ContentType = "text/css"
    }
    elseif($blob.Name -like "*.ico")
    {
        $CloudBlockBlob.Properties.ContentType = "image/x-icon"
    }
    elseif($blob.Name -like "*.js")
    {
        $CloudBlockBlob.Properties.ContentType = "text/javascript"
    }elseif($blob.Name -like "*.txt")
    {
        $CloudBlockBlob.Properties.ContentType = "text/plain"
    }elseif($blob.Name -like "*.map")
    {
        $CloudBlockBlob.Properties.ContentType = "text/plain"
    }
    $CloudBlockBlob.SetProperties()
}
