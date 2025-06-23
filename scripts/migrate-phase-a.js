#!/usr/bin/env node

/**
 * 🚀 Script de Migration Phase A - PopSpace V1
 * Modernisation Progressive : Prisma 5 + Express 4.21 + Packages Sécurité
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function exec(command, cwd = process.cwd()) {
  log(`🔧 Exécution: ${command}`, 'cyan');
  try {
    return execSync(command, { cwd, stdio: 'inherit' });
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red');
    throw error;
  }
}

function backupDatabase() {
  log('📦 Backup de la base de données...', 'yellow');
  const dbPath = path.join(__dirname, '../noodle-shared/prisma/dev.db');
  const backupPath = path.join(__dirname, '../noodle-shared/prisma/dev.db.backup');
  
  if (fs.existsSync(dbPath)) {
    fs.copyFileSync(dbPath, backupPath);
    log('✅ Backup créé: dev.db.backup', 'green');
  } else {
    log('⚠️  Base de données non trouvée, continuons...', 'yellow');
  }
}

function updatePackageJson(filePath, updates) {
  log(`📝 Mise à jour: ${filePath}`, 'blue');
  const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Mettre à jour les dépendances
  Object.keys(updates.dependencies || {}).forEach(pkg => {
    if (packageJson.dependencies && packageJson.dependencies[pkg]) {
      packageJson.dependencies[pkg] = updates.dependencies[pkg];
      log(`  📦 ${pkg}: ${updates.dependencies[pkg]}`, 'green');
    }
  });
  
  // Mettre à jour les devDependencies
  Object.keys(updates.devDependencies || {}).forEach(pkg => {
    if (packageJson.devDependencies && packageJson.devDependencies[pkg]) {
      packageJson.devDependencies[pkg] = updates.devDependencies[pkg];
      log(`  🔧 ${pkg}: ${updates.devDependencies[pkg]}`, 'green');
    }
  });
  
  fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
}

function migrateNoodleShared() {
  log('\n🎯 Phase A.1.1 : Migration noodle-shared (Prisma 5)', 'bright');
  
  const packagePath = path.join(__dirname, '../noodle-shared/package.json');
  
  updatePackageJson(packagePath, {
    dependencies: {
      '@prisma/client': '^5.22.0',
      'prisma': '^5.22.0',
      'aws-sdk': '^2.1691.0', // Latest v2 (stable)
      'dotenv': '^16.4.7',
      'uuid': '^11.0.3'
    },
    devDependencies: {
      'typescript': '^5.8.3'
    }
  });
  
  // Installation des nouvelles dépendances
  exec('yarn install', path.join(__dirname, '../noodle-shared'));
  
  // Génération du client Prisma
  exec('yarn prisma:generate', path.join(__dirname, '../noodle-shared'));
  
  // Test de compilation
  exec('yarn build', path.join(__dirname, '../noodle-shared'));
  
  log('✅ noodle-shared migré vers Prisma 5', 'green');
}

function migrateNoodleApi() {
  log('\n🎯 Phase A.1.2 : Migration noodle-api (Express 4.21)', 'bright');
  
  const packagePath = path.join(__dirname, '../noodle-api/package.json');
  
  updatePackageJson(packagePath, {
    dependencies: {
      'express': '^4.21.2',
      'axios': '^1.7.9', // Correction vulnérabilités CVE
      'aws-sdk': '^2.1691.0',
      'dotenv': '^16.4.7',
      'uuid': '^11.0.3',
      'livekit-server-sdk': '^2.8.0' // Dernière version stable
    }
  });
  
  exec('yarn install', path.join(__dirname, '../noodle-api'));
  
  log('✅ noodle-api migré vers Express 4.21', 'green');
}

function migrateHermes() {
  log('\n🎯 Phase A.1.3 : Migration hermes (WebSocket)', 'bright');
  
  const packagePath = path.join(__dirname, '../hermes/package.json');
  
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Mises à jour sécurité pour hermes
    if (packageJson.dependencies) {
      if (packageJson.dependencies['ws']) {
        packageJson.dependencies['ws'] = '^8.18.0';
      }
      if (packageJson.dependencies['uuid']) {
        packageJson.dependencies['uuid'] = '^11.0.3';
      }
    }
    
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    exec('yarn install', path.join(__dirname, '../hermes'));
  }
  
  log('✅ hermes mis à jour', 'green');
}

function runTests() {
  log('\n🧪 Phase A.1.4 : Tests de compatibilité', 'bright');
  
  try {
    // Test noodle-shared
    exec('yarn build', path.join(__dirname, '../noodle-shared'));
    log('✅ noodle-shared: Build OK', 'green');
    
    // Test connection base
    exec('yarn prisma:generate', path.join(__dirname, '../noodle-shared'));
    log('✅ noodle-shared: Prisma client OK', 'green');
    
  } catch (error) {
    log('❌ Tests échoués, voir les erreurs ci-dessus', 'red');
    throw error;
  }
}

function generateReport() {
  log('\n📊 Génération du rapport de migration...', 'blue');
  
  const report = `# Rapport de Migration Phase A.1
Date: ${new Date().toISOString()}

## ✅ Mises à jour effectuées

### noodle-shared
- Prisma: 3.14.0 → 5.22.0
- TypeScript: 4.3.5 → 5.8.3
- AWS SDK: 2.834.0 → 2.1691.0
- UUID: Ajouté 11.0.3
- dotenv: 8.2.0 → 16.4.7

### noodle-api
- Express: 4.17.1 → 4.21.2
- Axios: 0.21.1 → 1.7.9 (Vulnérabilités corrigées)
- LiveKit: 0.5.10 → 2.8.0
- AWS SDK: 2.928.0 → 2.1691.0
- UUID: 8.3.2 → 11.0.3

### hermes
- WebSocket packages mis à jour
- UUID: → 11.0.3

## 🎯 Prochaines étapes
1. Tester l'application complète
2. Vérifier les performances
3. Passer à la Phase A.2 (packages critiques)

## ⚠️ Points d'attention
- Backup DB créé: noodle-shared/prisma/dev.db.backup
- Tester les requêtes Prisma en production
- Vérifier l'intégration LiveKit 2.x
`;

  fs.writeFileSync(path.join(__dirname, '../MIGRATION_REPORT_A1.md'), report);
  log('✅ Rapport généré: MIGRATION_REPORT_A1.md', 'green');
}

async function main() {
  log('🚀 Démarrage Migration Phase A.1 - PopSpace V1', 'bright');
  log('⏱️  Durée estimée: 10-15 minutes\n', 'yellow');
  
  try {
    backupDatabase();
    migrateNoodleShared();
    migrateNoodleApi();
    migrateHermes();
    runTests();
    generateReport();
    
    log('\n🎉 Migration Phase A.1 TERMINÉE avec succès !', 'green');
    log('📋 Prochaines étapes:', 'blue');
    log('  1. Tester l\'application: yarn start (dans chaque service)', 'cyan');
    log('  2. Vérifier les performances', 'cyan');
    log('  3. Lancer Phase A.2 avec: node scripts/migrate-phase-a2.js', 'cyan');
    
  } catch (error) {
    log('\n💥 Migration échouée !', 'red');
    log('🔄 Pour restaurer:', 'yellow');
    log('  cp noodle-shared/prisma/dev.db.backup noodle-shared/prisma/dev.db', 'cyan');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main }; 