# Optimize images in-place (recommend running a backup first)
# Requires ImageMagick (magick) and cwebp (optional) installed and available in PATH.
# Usage: Open PowerShell in project root and run: .\scripts\optimize-images.ps1

$src = "images"
Get-ChildItem -Path $src -Recurse -Include *.jpg,*.jpeg,*.png | ForEach-Object {
    $file = $_.FullName
    Write-Host "Optimizing: $file"
    # Recompress PNG (if magick present)
    if (Get-Command magick -ErrorAction SilentlyContinue) {
        magick convert "$file" -strip -quality 85 -define png:compression-level=9 "$file"
    }
    # Optional: create WebP alongside
    if (Get-Command cwebp -ErrorAction SilentlyContinue) {
        $webp = [System.IO.Path]::ChangeExtension($file, '.webp')
        cwebp -q 80 "$file" -o "$webp" | Out-Null
    }
}

Write-Host "Done. Review optimized images in the 'images' folder."