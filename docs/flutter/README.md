# Flutter Design Tokens Documentation

Complete guide untuk menggunakan design tokens di Flutter aplikasi Anda.

## 📦 Installation

### 1. Copy Tokens ke Project

```bash
# Copy token files ke project Flutter Anda
cp build/flutter/tokens_light.dart lib/tokens/
cp build/flutter/tokens_dark.dart lib/tokens/
```

### 2. Import di Aplikasi

```dart
import 'package:your_app/tokens/tokens_light.dart';
import 'package:your_app/tokens/tokens_dark.dart';
```

---

## 🎨 Token Categories

### Colors (668 tokens)

```dart
// Base Colors
TokensLight.colorsBaseWhite     // #FFFFFF
TokensLight.colorsBaseBlack     // #000000

// Brand Colors (25-950 shades)
TokensLight.colorsBrand600      // Primary brand color
TokensLight.colorsBrand700      // Darker variant
TokensLight.colorsBrand500      // Lighter variant

// Semantic Colors
TokensLight.colorsTextPrimary900           // Primary text
TokensLight.colorsTextSecondary700         // Secondary text
TokensLight.colorsBackgroundPrimary        // Background
TokensLight.colorsBorderPrimary            // Border

// Status Colors
TokensLight.colorsError600      // Error state
TokensLight.colorsWarning600    // Warning state
TokensLight.colorsSuccess600    // Success state
```

### Typography (44 TextStyles)

```dart
// Display Hierarchy (Marketing/Hero text)
TokensLight.typographyDisplay2xlBold      // 72px, bold
TokensLight.typographyDisplayXlBold       // 60px, bold
TokensLight.typographyDisplayLgBold       // 48px, bold
TokensLight.typographyDisplayMdBold       // 36px, bold
TokensLight.typographyDisplaySmBold       // 30px, bold
TokensLight.typographyDisplayXsBold       // 24px, bold

// Text Hierarchy (Body/UI text)
TokensLight.typographyTextXlRegular       // 60px, regular
TokensLight.typographyTextLgRegular       // 48px, regular
TokensLight.typographyTextMdRegular       // 36px, regular
TokensLight.typographyTextSmRegular       // 30px, regular
TokensLight.typographyTextXsRegular       // 24px, regular

// Each size has 4 weights: Regular, Medium, Semibold, Bold
```

### Spacing (17 tokens)

```dart
TokensLight.spacingNone    // 0
TokensLight.spacingXxs     // 2
TokensLight.spacingXs      // 4
TokensLight.spacingSm      // 6
TokensLight.spacingMd      // 8
TokensLight.spacingLg      // 12
TokensLight.spacingXl      // 16
TokensLight.spacing2xl     // 20
TokensLight.spacing3xl     // 24
TokensLight.spacing4xl     // 32
TokensLight.spacing5xl     // 40
TokensLight.spacing6xl     // 48
TokensLight.spacing7xl     // 64
TokensLight.spacing8xl     // 80
TokensLight.spacing9xl     // 96
TokensLight.spacing10xl    // 128
TokensLight.spacing11xl    // 160
```

### Gradients (31 tokens)

```dart
// Brand Gradients
TokensLight.colorsEffectsGradientsBrandGradient600To500Deg90

// Gray Gradients
TokensLight.colorsEffectsGradientsGrayGradient50ToWhiteDeg180

// Decorative Gradients
TokensLight.colorsEffectsGradientsLinearGradient01 // Purple-Peach
TokensLight.colorsEffectsGradientsLinearGradient02 // Orange-Pink
```

### Shadows (11 sets)

```dart
TokensLight.colorsEffectsShadowsXs    // Subtle shadow
TokensLight.colorsEffectsShadowsSm    // Small shadow
TokensLight.colorsEffectsShadowsMd    // Medium shadow
TokensLight.colorsEffectsShadowsLg    // Large shadow
TokensLight.colorsEffectsShadowsXl    // Extra large
TokensLight.colorsEffectsShadows2xl   // 2X large
TokensLight.colorsEffectsShadows3xl   // 3X large
```

### Border Radius (11 tokens)

```dart
TokensLight.borderRadiusNone    // 0
TokensLight.borderRadiusXxs     // 2
TokensLight.borderRadiusXs      // 4
TokensLight.borderRadiusSm      // 6
TokensLight.borderRadiusMd      // 8
TokensLight.borderRadiusLg      // 10
TokensLight.borderRadiusXl      // 12
TokensLight.borderRadius2xl     // 16
TokensLight.borderRadius3xl     // 20
TokensLight.borderRadius4xl     // 24
TokensLight.borderRadiusFull    // 9999 (circle)
```

---

## 💻 Usage Examples

### 1. Simple Card Component

```dart
import 'package:flutter/material.dart';
import 'package:your_app/tokens/tokens_light.dart';

class TokenCard extends StatelessWidget {
  final String title;
  final String subtitle;
  
  const TokenCard({
    Key? key,
    required this.title,
    required this.subtitle,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(TokensLight.spacing4),
      margin: EdgeInsets.all(TokensLight.spacing3),
      decoration: BoxDecoration(
        color: TokensLight.colorsBackgroundPrimary,
        borderRadius: BorderRadius.circular(TokensLight.borderRadiusLg),
        border: Border.all(
          color: TokensLight.colorsBorderPrimary,
        ),
        boxShadow: TokensLight.colorsEffectsShadowsMd,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TokensLight.typographyTextLgSemibold.copyWith(
              color: TokensLight.colorsTextPrimary900,
            ),
          ),
          SizedBox(height: TokensLight.spacing2),
          Text(
            subtitle,
            style: TokensLight.typographyTextSmRegular.copyWith(
              color: TokensLight.colorsTextSecondary700,
            ),
          ),
        ],
      ),
    );
  }
}
```

### 2. Primary Button

```dart
class PrimaryButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;
  
  const PrimaryButton({
    Key? key,
    required this.label,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: TokensLight.colorsBackgroundBrandSolid,
        foregroundColor: TokensLight.colorsTextWhite,
        padding: EdgeInsets.symmetric(
          horizontal: TokensLight.spacing6,
          vertical: TokensLight.spacing3,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(TokensLight.borderRadiusMd),
        ),
        elevation: 0,
      ),
      child: Text(
        label,
        style: TokensLight.typographyTextMdSemibold,
      ),
    );
  }
}
```

### 3. Gradient Background

```dart
class GradientHero extends StatelessWidget {
  final Widget child;
  
  const GradientHero({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: TokensLight.colorsEffectsGradientsBrandGradient800To600Deg90,
      ),
      child: child,
    );
  }
}
```

### 4. Dark Mode Support

```dart
class ThemedContainer extends StatelessWidget {
  final Widget child;
  
  const ThemedContainer({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      color: isDark 
        ? TokensDark.colorsBackgroundPrimary 
        : TokensLight.colorsBackgroundPrimary,
      child: DefaultTextStyle(
        style: TextStyle(
          color: isDark
            ? TokensDark.colorsTextPrimary900
            : TokensLight.colorsTextPrimary900,
        ),
        child: child,
      ),
    );
  }
}
```

### 5. Theme Integration

```dart
import 'package:flutter/material.dart';
import 'package:your_app/tokens/tokens_light.dart';
import 'package:your_app/tokens/tokens_dark.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        brightness: Brightness.light,
        primaryColor: TokensLight.colorsBrand600,
        scaffoldBackgroundColor: TokensLight.colorsBackgroundPrimary,
        textTheme: TextTheme(
          displayLarge: TokensLight.typographyDisplay2xlBold,
          displayMedium: TokensLight.typographyDisplayLgBold,
          bodyLarge: TokensLight.typographyTextMdRegular,
          bodyMedium: TokensLight.typographyTextSmRegular,
        ),
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: TokensDark.colorsBrand600,
        scaffoldBackgroundColor: TokensDark.colorsBackgroundPrimary,
        textTheme: TextTheme(
          displayLarge: TokensDark.typographyDisplay2xlBold,
          displayMedium: TokensDark.typographyDisplayLgBold,
          bodyLarge: TokensDark.typographyTextMdRegular,
          bodyMedium: TokensDark.typographyTextSmRegular,
        ),
      ),
      home: HomeScreen(),
    );
  }
}
```

---

## 🎯 Best Practices

### 1. Never Hardcode Values

❌ **Bad:**
```dart
Container(
  padding: EdgeInsets.all(16),
  color: Color(0xFF7F56D9),
)
```

✅ **Good:**
```dart
Container(
  padding: EdgeInsets.all(TokensLight.spacing4),
  color: TokensLight.colorsBrand600,
)
```

### 2. Use Semantic Color Names

❌ **Bad:**
```dart
Text('Error', style: TextStyle(color: TokensLight.colorsError600))
```

✅ **Good:**
```dart
Text('Error', style: TextStyle(color: TokensLight.colorsTextErrorPrimary600))
```

### 3. Leverage Typography Tokens

❌ **Bad:**
```dart
Text(
  'Title',
  style: TextStyle(
    fontSize: 48,
    fontWeight: FontWeight.w700,
    fontFamily: 'Bricolage Grotesque',
  ),
)
```

✅ **Good:**
```dart
Text(
  'Title',
  style: TokensLight.typographyDisplayLgBold,
)
```

### 4. Responsive Spacing

```dart
class ResponsiveContainer extends StatelessWidget {
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    
    return Container(
      padding: EdgeInsets.all(
        width > 600 
          ? TokensLight.containerPaddingDesktop 
          : TokensLight.containerPaddingMobile
      ),
      constraints: BoxConstraints(
        maxWidth: TokensLight.containerMaxWidthDesktop,
      ),
      child: child,
    );
  }
}
```

---

## 🔄 Updating Tokens

When design tokens are updated:

1. Rebuild tokens:
```bash
npm run build
```

2. Copy updated files:
```bash
cp build/flutter/tokens_light.dart lib/tokens/
cp build/flutter/tokens_dark.dart lib/tokens/
```

3. Run your app - changes apply automatically!

---

## 📚 Additional Resources

- [Multi-Platform Guide](../../MULTI_PLATFORM_GUIDE.md)
- [Gradient Usage Guide](../../GRADIENT_USAGE_GUIDE.md)
- [Example Usage](../../EXAMPLE_USAGE.md)
- [Developer Audit](../../AUDIT_DEVELOPER_PERSPECTIVE.md)

---

## ❓ FAQ

**Q: Can I modify generated token files?**  
A: No! They are auto-generated. Modify source files in `design-tokens/` and rebuild.

**Q: How do I add new tokens?**  
A: Add to `design-tokens/*.json`, run `npm run build`, then copy new files.

**Q: Do tokens work with Flutter Web?**  
A: Yes! All tokens are Flutter framework tokens, they work everywhere.

**Q: Can I use gradients in Flutter Web?**  
A: Yes, LinearGradient works on all Flutter platforms.

---

**Happy coding with design tokens!** 🚀
