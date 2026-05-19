# Optimize images in-place with backup and optional WebP conversion.
# Requires ImageMagick (magick) and cwebp installed.
# Usage: Open PowerShell in project root and run: .\scripts\optimize-images.ps1

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$imageBackup = Join-Path $projectRoot "backup-images-$timestamp.zip"
$htmlBackup = Join-Path $projectRoot "backup-html-$timestamp.zip"

if (-Not (Test-Path "images")) {
    Write-Host "Folder 'images' not found. Create an 'images' folder first." -ForegroundColor Red
    exit 1
}

Write-Host "Creating backups..."
Compress-Archive -Path ".\images\*" -DestinationPath $imageBackup -Force
Compress-Archive -Path ".\*.html" -DestinationPath $htmlBackup -Force
Write-Host "Created backups: $imageBackup and $htmlBackup"

$hasMagick = Get-Command magick -ErrorAction SilentlyContinue
$hasCwebp = Get-Command cwebp -ErrorAction SilentlyContinue

Get-ChildItem -Path ".\images" -Recurse -Include *.jpg,*.jpeg,*.png | ForEach-Object {
    $file = $_.FullName
    Write-Host "Optimizing: $file"

    if ($hasMagick) {
        magick convert "$file" -strip -quality 85 -define png:compression-level=9 "$file"
    }

    if ($hasCwebp) {
        $webp = [System.IO.Path]::ChangeExtension($file, '.webp')
        cwebp -q 80 "$file" -o "$webp" | Out-Null
    }
}

if ($hasCwebp) {
    Get-ChildItem -Path ".\*.html" | ForEach-Object {
        $file = $_.FullName
        $content = Get-Content -Path $file -Raw
        $pattern = '<img\s+([^>]*?)src="([^"]+\.(?:png|jpe?g))"([^>]*?)>'

        $content = [regex]::Replace($content, $pattern, {
            param($match)
            $src = $match.Groups[2].Value
            $webpPath = [System.IO.Path]::ChangeExtension($src, '.webp')

            if (-not (Test-Path (Join-Path $projectRoot $webpPath))) {
                return $match.Value
            }

            if ($match.Value -match '<picture') {
                return $match.Value
            }

            return "<picture><source type=\"image/webp\" srcset=\"$webpPath\">$($match.Value)</picture>"
        }, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)

        Set-Content -Path $file -Value $content -Encoding utf8
    }
    Write-Host "Converted HTML img tags to picture elements where WebP files exist."
} else {
    Write-Host "cwebp not found; only image recompression ran. Install cwebp for WebP generation and HTML conversion." -ForegroundColor Yellow
}

Write-Host "Done. Review backups, optimized images, and updated HTML files."