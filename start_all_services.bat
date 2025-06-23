@echo off
echo ========================================
echo 🚀 DÉMARRAGE DE POPSPACE V1
echo ========================================
echo.

echo 📝 Services qui vont démarrer:
echo - Frontend (React): http://localhost:8888
echo - API (REST): http://localhost:8889
echo - Hermes (WebSocket): http://localhost:8890
echo.

echo 🔧 Vérification des dépendances...
if not exist "node_modules" (
    echo ❌ node_modules manquant dans la racine
    echo Exécutez d'abord: npm install
    pause
    exit /b 1
)

if not exist "noodle/node_modules" (
    echo ❌ node_modules manquant dans noodle
    echo Exécutez d'abord: cd noodle && yarn install
    pause
    exit /b 1
)

echo ✅ Dépendances OK
echo.

echo 🔄 Génération du client Prisma...
cd noodle-shared
call npm run prisma:generate
cd ..
echo.

echo 🚀 Démarrage des services...
echo.

echo 📱 Démarrage du Frontend (noodle)...
start "PopSpace Frontend" cmd /k "cd noodle && yarn start"

echo ⏱️ Attente de 3 secondes...
timeout /t 3 /nobreak >nul

echo 🔌 Démarrage de l'API (noodle-api)...
start "PopSpace API" cmd /k "cd noodle-api && npm run dev"

echo ⏱️ Attente de 2 secondes...
timeout /t 2 /nobreak >nul

echo 🌐 Démarrage de Hermes (WebSocket)...
start "PopSpace Hermes" cmd /k "cd hermes && npm run dev"

echo.
echo ========================================
echo ✅ TOUS LES SERVICES SONT EN COURS DE DÉMARRAGE
echo ========================================
echo.
echo 🌐 URLs d'accès:
echo - Application: http://localhost:8888
echo - API Health: http://localhost:8889/health
echo - Hermes: ws://localhost:8890
echo.
echo ⚠️  Attendez quelques secondes que tous les services se lancent
echo 📱 L'application sera accessible dans votre navigateur
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause >nul 