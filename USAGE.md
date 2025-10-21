# Cara Menggunakan Tokens

## Error "Merah-merah" di IDE?

**NORMAL!** File `tokens_light.dart` dan `tokens_dark.dart` adalah **generated files** yang harus di-copy ke Flutter project.

## ✅ Cara Benar Menggunakan:

### 1. Copy ke Flutter Project

```bash
# Copy ke folder lib/tokens/ di Flutter project Anda
cp build/flutter/*.dart /path/to/your_flutter_project/lib/tokens/
```

### 2. Gunakan di Flutter Code

```dart
// Di file Flutter Anda
import 'tokens/tokens_light.dart';
import 'tokens/tokens_dark.dart';

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: TokensLight.colorsBackgroundPrimary,
      padding: EdgeInsets.all(TokensLight.spacing4),
      child: Text(
        'Hello',
        style: TextStyle(color: TokensLight.colorsTextPrimary900),
      ),
    );
  }
}
```

### 3. Selesai! ✨

Setelah di Flutter project, error merah akan hilang karena Flutter SDK tersedia.

---

## 🎯 Workflow

```
1. Edit design-tokens/*.json
   ↓
2. npm run build
   ↓
3. Copy build/flutter/*.dart ke Flutter project
   ↓
4. Import dan gunakan di Flutter
```

## ❓ FAQ

**Q: Kenapa error merah saat buka file ini?**  
A: Normal! File ini standalone, perlu di Flutter project untuk resolved.

**Q: Apakah tokens bisa digunakan?**  
A: Ya! 100% valid Flutter code, tinggal copy ke Flutter project.

**Q: Bagaimana cara test tokens?**  
A: Copy ke Flutter project, lalu `flutter analyze` akan show "No issues found!"

---

**🎉 Tokens siap digunakan di Flutter project!**
