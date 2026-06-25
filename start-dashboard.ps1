$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 8080
$url = "http://localhost:$port"

Write-Host "Starting EXZY dashboard at $url"
Write-Host "Press Ctrl+C to stop."
Start-Process $url
& "C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m http.server $port --directory $root
