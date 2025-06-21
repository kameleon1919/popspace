@echo off
echo === Démarrage des services PopSpace ===

:: Créer les fichiers .env
echo DATABASE_URL="file:./prisma/dev.db" > noodle-shared\.env
echo DATABASE_URL="file:../noodle-shared/prisma/dev.db" > hermes\.env
echo NODE_ENV=development >> hermes\.env

:: Variables d'environnement
set NODE_OPTIONS=--openssl-legacy-provider

:: Démarrer Hermes (WebSocket)
echo Démarrage de Hermes...
start "Hermes" cmd /c "cd hermes && node index.js"

:: Attendre 3 secondes
timeout /t 3 /nobreak

:: Démarrer noodle-api
echo Démarrage de noodle-api...
start "noodle-api" cmd /c "cd noodle-api && node index.js"

echo === Services démarrés ===
echo Hermes: http://localhost:8890
echo noodle-api: http://localhost:8889
echo Frontend: http://localhost:8888
pause
