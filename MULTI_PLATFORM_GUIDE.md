# 🚀 Multi-Platform Design Tokens

Design tokens yang ter-export untuk **Flutter**, **Jetpack Compose (Android)**, dan **CSS**.

---

## 📦 Build Output

```
build/
├── flutter/
│   ├── tokens_light.dart
│   └── tokens_dark.dart
├── compose/
│   ├── TokensLight.kt
│   └── TokensDark.kt
└── css/
    ├── tokens-light.css
    └── tokens-dark.css
```

---

## 📊 Token Statistics

| Platform | Light | Dark | Format |
|----------|-------|------|--------|
| **Flutter** | 822 tokens (927 lines) | 822 tokens (927 lines) | Dart Classes |
| **Compose** | 869 tokens (882 lines) | 869 tokens (882 lines) | Kotlin Object |
| **CSS** | 869 variables (875 lines) | 869 variables (875 lines) | CSS Variables |

---

## 🎨 1. Flutter Usage

### Import
```dart
import 'build/flutter/tokens_light.dart';
import 'build/flutter/tokens_dark.dart';
```

### Colors
```dart
Container(
  color: TokensLight.colorsBrand600,
  child: Text(
    'Hello World',
    style: TextStyle(color: TokensLight.colorsBaseWhite),
  ),
)
```

### Typography
```dart
Text(
  'Display Heading',
  style: TokensLight.typographyDisplayLgBold,
)

Text(
  'Body text',
  style: TokensLight.typographyTextMdRegular,
)
```

### Spacing & Layout
```dart
Container(
  padding: EdgeInsets.all(TokensLight.spacing4),
  margin: EdgeInsets.symmetric(
    horizontal: TokensLight.spacing6,
    vertical: TokensLight.spacing3,
  ),
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(TokensLight.borderRadiusMd),
    boxShadow: TokensLight.effectsShadowsMd,
  ),
)
```

### Dark Mode
```dart
final isDark = Theme.of(context).brightness == Brightness.dark;

Text(
  'Themed Text',
  style: TextStyle(
    color: isDark 
      ? TokensDark.colorsTextPrimary900 
      : TokensLight.colorsTextPrimary900,
  ),
)
```

---

## 🤖 2. Jetpack Compose Usage

### Import
```kotlin
import com.app.tokens.TokensLight
import com.app.tokens.TokensDark
```

### Colors
```kotlin
Text(
    text = "Hello World",
    color = TokensLight.colorsBrand600
)

Surface(
    color = TokensLight.colorsBackgroundPrimary
) {
    // content
}
```

### Spacing & Dimensions
```kotlin
Box(
    modifier = Modifier
        .padding(TokensLight.spacing4)
        .size(TokensLight.sizing48)
) {
    // content
}

Card(
    shape = RoundedCornerShape(TokensLight.borderRadiusMd)
) {
    // content
}
```

### Font Sizes & Weights
```kotlin
Text(
    text = "Heading",
    fontSize = TokensLight.fontSizeXl,
    fontWeight = TokensLight.fontWeightBold
)

Text(
    text = "Body",
    fontSize = TokensLight.fontSizeMd,
    fontWeight = TokensLight.fontWeightRegular
)
```

### Dark Mode
```kotlin
val colors = if (isSystemInDarkTheme()) TokensDark else TokensLight

Text(
    text = "Themed Text",
    color = colors.colorsTextPrimary900
)
```

**Note:** Typography tokens (kompleks TextStyle) tidak di-export untuk Compose. Gunakan `fontSize`, `fontWeight`, dan token individual untuk build custom TextStyle.

---

## 🌐 3. CSS Usage

### Import
```html
<!-- Light Theme (default) -->
<link rel="stylesheet" href="build/css/tokens-light.css">

<!-- Dark Theme -->
<link rel="stylesheet" href="build/css/tokens-dark.css" media="(prefers-color-scheme: dark)">
```

### Colors
```css
.button {
  background-color: var(--colors-brand-600);
  color: var(--colors-base-white);
}

.text-primary {
  color: var(--colors-text-primary-900);
}
```

### Spacing & Layout
```css
.container {
  padding: var(--spacing-4);
  margin: var(--spacing-6) var(--spacing-3);
  border-radius: var(--border-radius-md);
}

.card {
  width: var(--width-lg);
  max-width: var(--width-paragraph-max-width);
}
```

### Typography
```css
.heading {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-display-xl);
}

.body {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-text-md);
}
```

### Dark Mode Toggle
```html
<html data-theme="light">
  <!-- Your content -->
</html>

<script>
  // Toggle dark mode
  document.documentElement.setAttribute('data-theme', 'dark');
</script>
```

```css
/* Base styles with light tokens */
:root {
  /* tokens-light.css loaded */
}

/* Override with dark tokens */
[data-theme="dark"] {
  /* Load tokens-dark.css variables here */
}
```

---

## 🔧 Build Command

Untuk rebuild semua platform:

```bash
npm run build
```

Output:
- ✅ Flutter: `build/flutter/`
- ✅ Compose: `build/compose/`
- ✅ CSS: `build/css/`

---

## 📝 Token Categories

### ✅ Exported for All Platforms

| Category | Flutter | Compose | CSS |
|----------|---------|---------|-----|
| **Colors** | 668 | 668 | 668 |
| **Spacing** | 29 | 29 | 29 |
| **BorderRadius** | 11 | 11 | 11 |
| **FontSize** | 6 | 6 | 6 |
| **FontWeight** | 4 | 4 | 4 |
| **LineHeight** | 11 | 11 | 11 |
| **Sizing** | 15 | 15 | 15 |

### ⚠️ Platform-Specific Notes

#### Flutter Only
- **Typography TextStyles**: 44 complete TextStyle objects
- **BoxShadow**: 11 shadow definitions with multiple layers

#### Compose
- **Typography**: Harus dibuild manual dari fontSize, fontWeight, lineHeight tokens
- **Shadows**: Tidak di-export (Compose tidak punya BoxShadow equivalent)

#### CSS
- **Typography**: Individual properties only (font-size, font-weight, line-height)
- **Shadows**: Tidak di-export (perlu CSS box-shadow manual)

---

## 🎯 Best Practices

### 1. **Consistency Across Platforms**
```dart
// Flutter
color: TokensLight.colorsBrand600

// Compose
color = TokensLight.colorsBrand600

// CSS
color: var(--colors-brand-600)
```

### 2. **Theme Switching**
- Flutter: Gunakan `ThemeData` dengan `brightness`
- Compose: Gunakan `isSystemInDarkTheme()`
- CSS: Gunakan `prefers-color-scheme` atau `data-theme` attribute

### 3. **Typography Composition (Compose)**
```kotlin
// Compose - build custom TextStyle
Text(
    text = "Custom",
    fontSize = TokensLight.fontSizeXl,
    fontWeight = TokensLight.fontWeightBold,
    lineHeight = TextUnit(
        TokensLight.lineHeightDisplayXl.value / TokensLight.fontSizeXl.value,
        TextUnitType.Em
    )
)
```

---

## 🔄 Update Workflow

1. Edit tokens di `design-tokens/`
2. Run `npm run build`
3. Copy generated files ke projects:
   - Flutter: Copy `build/flutter/*.dart` to `lib/tokens/`
   - Android: Copy `build/compose/*.kt` to `app/src/main/java/com/app/tokens/`
   - Web: Copy `build/css/*.css` to `public/styles/`

---

## ⚙️ Configuration

Edit `build.js` untuk customize:

```javascript
// Change package name for Compose
packageName: 'com.yourapp.design'

// Change class name
className: 'YourTokens'
```

---

## 🎉 Summary

✅ **3 Platforms** - Flutter, Compose, CSS  
✅ **869 Tokens** per platform  
✅ **Auto-generated** from single source  
✅ **Type-safe** for Flutter & Compose  
✅ **CSS Variables** for web

Semua tokens di-maintain di satu tempat (`design-tokens/`) dan otomatis ter-generate untuk semua platform!

---

*Generated by Style Dictionary v5.1.1*
