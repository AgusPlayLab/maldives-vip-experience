$base = "https://febogdjpoxbyfhetwgip.supabase.co/functions/v1"
$fn   = "$base/submit-maldives-feedback"

Write-Host "`n=== TEST: submit-maldives-feedback ===" -ForegroundColor Cyan

$payload = '{"passenger_name":"TestJovi","experience_rating":5,"favorite_activity":"Snorkeling","fun_level":"Muy divertido","would_repeat":"Si","comment":"Test de conectividad","source":"powershell-test","user_agent":"PowerShell","honeypot":""}'

try {
    $r = Invoke-WebRequest -Uri $fn -Method Post -ContentType "application/json" -Body $payload -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Status: $($r.StatusCode)" -ForegroundColor Green
    $r.Content | ConvertFrom-Json | Format-List
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    Write-Host "❌ Status: $code" -ForegroundColor Red
    $body = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
    if ($body) { $body | Format-List } else { Write-Host $_.ErrorDetails.Message }
}
