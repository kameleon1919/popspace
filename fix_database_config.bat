@echo off
echo Fixing database configuration for PopSpace V1...

echo Creating .env files...

echo # Base de données - chemin relatif vers le fichier SQLite depuis hermes/> hermes\.env
echo DATABASE_URL="file:../noodle-shared/prisma/dev.db">> hermes\.env
echo # Environnement>> hermes\.env
echo NODE_ENV=development>> hermes\.env
echo # Debug>> hermes\.env
echo DEBUG=false>> hermes\.env

echo # Base de données SQLite> noodle-shared\.env
echo DATABASE_URL="file:./prisma/dev.db">> noodle-shared\.env

echo # Base de données> noodle-api\.env
echo DATABASE_URL="file:../noodle-shared/prisma/dev.db">> noodle-api\.env
echo # LiveKit credentials (optionnel)>> noodle-api\.env
echo LIVEKIT_API_KEY="">> noodle-api\.env
echo LIVEKIT_API_SECRET="">> noodle-api\.env
echo LIVEKIT_URL="">> noodle-api\.env
echo # File upload>> noodle-api\.env
echo USER_FILES_DIRECTORY=./user-files>> noodle-api\.env
echo PUBLIC_URL=http://localhost:8889>> noodle-api\.env
echo WALLPAPERS_DIRECTORY=./wallpapers>> noodle-api\.env

echo Configuration files created successfully!
echo Now stopping PM2 services and restarting hermes...

pm2 stop hermes
timeout /t 2
pm2 delete hermes
timeout /t 2

echo Starting hermes with correct configuration...
cd hermes
npm start 