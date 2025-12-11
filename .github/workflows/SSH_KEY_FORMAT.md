# Format de la Clé SSH pour GitHub Secrets

## ⚠️ Important : Format de la Clé SSH

Pour que le déploiement VPS fonctionne, la clé SSH privée doit être correctement formatée dans GitHub Secrets.

## 📋 Instructions

### 1. Générer une clé SSH (si vous n'en avez pas)

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_deploy
```

Ou avec RSA (si ed25519 n'est pas supporté) :
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/github_actions_deploy
```

### 2. Copier la clé privée COMPLÈTE

```bash
cat ~/.ssh/github_actions_deploy
```

**Important :** Copiez TOUTE la clé, y compris :
- `-----BEGIN OPENSSH PRIVATE KEY-----` (ou `-----BEGIN RSA PRIVATE KEY-----`)
- Toutes les lignes de la clé
- `-----END OPENSSH PRIVATE KEY-----` (ou `-----END RSA PRIVATE KEY-----`)

### 3. Ajouter la clé publique au serveur VPS

```bash
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub user@your-vps-host
```

Ou manuellement :
```bash
cat ~/.ssh/github_actions_deploy.pub | ssh user@your-vps-host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 4. Ajouter le secret dans GitHub

1. Allez dans votre repository GitHub
2. Settings → Secrets and variables → Actions
3. New repository secret
4. Nom : `SSH_PRIVATE_KEY`
5. Valeur : Collez la clé privée COMPLÈTE (avec les lignes BEGIN et END)

### 5. Format correct

La clé doit ressembler à ceci :

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACD...
(multiplies lignes)
...
-----END OPENSSH PRIVATE KEY-----
```

## ❌ Erreurs courantes

1. **Clé tronquée** : Ne pas copier les lignes BEGIN/END
2. **Espaces supplémentaires** : Ajouter des espaces avant/après
3. **Saut de ligne manquant** : La clé doit avoir des retours à la ligne
4. **Clé publique au lieu de privée** : Utiliser `.pub` par erreur

## ✅ Vérification

Le workflow vérifie automatiquement le format de la clé. Si le format est incorrect, vous verrez :
```
❌ SSH key format invalid. Key must start with '-----BEGIN'
```

## 🔒 Sécurité

- Ne partagez JAMAIS votre clé privée
- Utilisez une clé SSH dédiée pour GitHub Actions
- Limitez les permissions de la clé sur le serveur
- Utilisez `ssh-keygen -t ed25519` pour une meilleure sécurité

