# 🛡️ Phase A Ultra-Sécurisée - PopSpace V1

## 🎯 Objectif
Corriger **UNIQUEMENT** les vulnérabilités critiques sans aucun breaking change.

## 📊 État Actuel - FONCTIONNEL ✅
- ✅ **Frontend React** : Port 8888 (fonctionne)
- ✅ **API REST** : Port 8889 (25+ endpoints actifs)
- ✅ **Hermes WebSocket** : Port 8890 (PM2)
- ✅ **Base SQLite** : Prisma 3.14.0 (stable)

## 🚨 Vulnérabilités Identifiées

### 🔴 CRITIQUE - À corriger immédiatement
```json
{
  "axios": "0.21.1",           // CVE-2021-3749 (RCE)
  "express": "4.17.1",         // CVE-2022-24999
  "dotenv": "8.x",             // CVE-2021-23343
  "uuid": "8.3.2"              // Performances + Node.js 22
}
```

### 🟡 IMPORTANT - À corriger plus tard
```json
{
  "prisma": "3.14.0",          // → 4.x puis 5.x
  "aws-sdk": "2.834.0",        // → 2.1691.0
  "livekit": "0.5.10"          // → 1.x puis 2.x
}
```

## 🛠️ Plan d'Action Ultra-Sécurisé

### Étape 1 : Axios (CRITIQUE)
```bash
# noodle-api seulement
cd noodle-api
yarn add axios@^1.7.9
# Test immédiat des endpoints
```

### Étape 2 : Express (IMPORTANT)
```bash
cd noodle-api
yarn add express@^4.21.2
# Test compatibilité middleware
```

### Étape 3 : dotenv + uuid (SÉCURITÉ)
```bash
# noodle-shared + noodle-api
yarn add dotenv@^16.4.7 uuid@^10.0.0
```

### Étape 4 : Tests Complets
```bash
# Vérifier chaque service
cd noodle-api && node index.js     # Port 8889
cd noodle && yarn start            # Port 8888
cd hermes && yarn start            # Port 8890
```

## ⚠️ Ce qu'on NE FAIT PAS
- ❌ Prisma 3 → 5 (trop risqué)
- ❌ LiveKit 0.5 → 2.x (breaking changes)
- ❌ TypeScript 4 → 5 (peut casser)
- ❌ AWS SDK v2 → v3 (architecture différente)

## 🎯 Résultat Attendu
- ✅ Vulnérabilités critiques corrigées
- ✅ Application 100% fonctionnelle
- ✅ 0 breaking changes
- ✅ Prêt pour développements utilisateur

## 📋 Après cette phase
1. **Développements utilisateur** (cartes, auth, tldraw)
2. **Phase A.2** : Modernisation progressive (Prisma 4, TypeScript 5)
3. **Phase C** : Réarchitecture complète (dans 1 mois)

---

## 🚀 Commandes Exactes

### 1. Axios (CRITIQUE)
```bash
cd noodle-api
yarn add axios@1.7.9
# Test: curl http://localhost:8889/media_providers
```

### 2. Express (IMPORTANT)  
```bash
cd noodle-api
yarn add express@4.21.2
# Test: node index.js
```

### 3. Sécurité générale
```bash
cd noodle-shared
yarn add dotenv@16.4.7

cd noodle-api  
yarn add dotenv@16.4.7 uuid@10.0.0
```

### 4. Validation finale
```bash
# Tous les services doivent démarrer
cd noodle-api && timeout 5 node index.js
cd noodle && timeout 10 yarn start
cd hermes && yarn start
```

**Durée estimée : 15-20 minutes**
**Risque : TRÈS FAIBLE**
**Impact : Vulnérabilités critiques corrigées** 