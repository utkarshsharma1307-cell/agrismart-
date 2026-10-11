# PowerShell script to update all Agriii branding to AgriProtect

$projectPath = "C:\Users\acer\OneDrive\Desktop\new project agriprotect"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $projectPath -Filter "*.html" -File

Write-Host "Updating branding in $($htmlFiles.Count) HTML files..." -ForegroundColor Green

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content

    # Replace title tags
    $content = $content -replace '<title>([^<]*?)Agriii', '<title>$1AgriProtect'
    $content = $content -replace '<title data-i18n="[^"]+">([^<]*?)Agriii', '<title data-i18n="$1">$2AgriProtect'

    # Replace alt attributes
    $content = $content -replace 'alt="Agriii Logo"', 'alt="AgriProtect Logo"'
    $content = $content -replace 'alt="Agriii"', 'alt="AgriProtect"'

    # Replace sidebar brand text (but not data-i18n content, which comes from translations)
    $content = $content -replace '<div class="sidebar-brand"[^>]*>Agriii</div>', '<div class="sidebar-brand" data-i18n="appName">AgriProtect</div>'
    $content = $content -replace '<div class="sidebar-brand">Agriii</div>', '<div class="sidebar-brand" data-i18n="appName">AgriProtect</div>'

    # Replace in voice guide footer
    $content = $content -replace 'Agriii - Smart Farming Companion', 'AgriProtect - Smart Farming Companion'

    # Replace in page subtitle/descriptions
    $content = $content -replace 'Available on every page in Agriii', 'Available on every page in AgriProtect'
    $content = $content -replace 'Control Agriii with Your Voice', 'Control AgriProtect with Your Voice'

    # Only write if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  Updated: $($file.Name)" -ForegroundColor Cyan
    }
}

Write-Host "`nBranding update complete!" -ForegroundColor Green
