# Vercel Environment Variables Setup Script
# Run this script to automatically set environment variables in Vercel

Write-Host "Setting up Vercel Environment Variables..." -ForegroundColor Cyan

# Check if vercel CLI is installed
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Vercel CLI is not installed." -ForegroundColor Red
    Write-Host "Install it with: npm i -g vercel" -ForegroundColor Yellow
    exit 1
}

# Load environment variables from .env
$envFile = Get-Content .env
$envVars = @{}

foreach ($line in $envFile) {
    if ($line -match "^([^#][^=]+)=(.*)$") {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        $envVars[$key] = $value
    }
}

Write-Host "\nFound $($envVars.Count) environment variables" -ForegroundColor Green

# Set each environment variable in Vercel
foreach ($key in $envVars.Keys) {
    Write-Host "Setting $key..." -ForegroundColor Yellow
    $value = $envVars[$key]
    
    # Set for production, preview, and development
    vercel env add $key production --force
    Write-Output $value | vercel env add $key production --force
}

Write-Host "\n✅ Environment variables setup complete!" -ForegroundColor Green
Write-Host "\nYou can now deploy with: npm run deploy" -ForegroundColor Cyan
