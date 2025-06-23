@echo off
echo === DIAGNOSTIC DES SERVICES POPSPACE ===
echo.

echo 1. Processus Node.js actifs:
powershell "Get-Process -Name node -ErrorAction SilentlyContinue | Format-Table -Property Id,ProcessName,@{N='Port';E={'N/A'}}"
echo.

echo 2. Ports en écoute:
netstat -ano | findstr "LISTENING" | findstr ":888"
echo.

echo 3. Test du frontend:
curl -s http://localhost:8888 > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Frontend accessible sur http://localhost:8888
) else (
    echo ❌ Frontend non accessible
)
echo.

echo 4. Test de l'API:
curl -s http://localhost:8889/health > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ API accessible sur http://localhost:8889
) else (
    echo ❌ API non accessible
)
echo.

echo 5. Test de Hermes:
curl -s http://localhost:8890/health > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Hermes accessible sur http://localhost:8890
) else (
    echo ❌ Hermes non accessible
)
echo.

echo 6. Base de données:
if exist "noodle-shared\prisma\dev.db" (
    echo ✅ Base de données trouvée
) else (
    echo ❌ Base de données manquante
)
echo.

echo === FIN DU DIAGNOSTIC ===
pause 