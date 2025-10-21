# Design Tokens Build Configuration Test

This folder contains build configuration files for design tokens.

## 📁 Structure

```
n8n_test/
├── build.js              # Main build script
├── package.json          # Dependencies
├── .gitignore           # Git ignore rules
├── formats/             # Custom format exporters
│   ├── android-xml.js   # Android XML resources
│   ├── css-variables.js # CSS custom properties
│   ├── compose-object.js # Jetpack Compose
│   └── flutter-class.js # Flutter classes
└── README.md            # This file
```

## 🚀 Usage

### Install Dependencies
```bash
npm install
```

### Run Build
```bash
npm run build
# or
node build.js
```

### Output
Build artifacts akan di-generate di folder `build/`:
- `build/android/` - Android XML resources (values & values-night)
- `build/css/` - CSS variables (light & dark theme)
- `build/compose/` - Jetpack Compose Kotlin objects
- `build/flutter/` - Flutter Dart classes

## 📝 Notes

- Folder `design-tokens/` berisi JSON token files (update secara terpisah)
- Build process akan membaca dari `design-tokens/` dan generate output multi-platform
- Light theme: `values/` dan dark theme: `values-night/`

## 🔄 Workflow

1. Edit token files di `design-tokens/`
2. Commit & push ke GitHub
3. n8n workflow otomatis trigger build
4. Hasil build di-deploy ke Cloudflare & notif ke WhatsApp
