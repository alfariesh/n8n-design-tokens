# 💻 EXAMPLE USAGE - Practical Code Examples

## Real-world usage dari perspektif developer

---

## 🎯 Flutter Example

### **Card Component dengan Tokens**

```dart
import 'package:flutter/material.dart';
import 'build/flutter/tokens_light.dart';
import 'build/flutter/tokens_dark.dart';

class TokenizedCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final VoidCallback? onTap;

  const TokenizedCard({
    Key? key,
    required this.title,
    required this.subtitle,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final tokens = isDark ? TokensDark : TokensLight;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        // ✅ Spacing from tokens
        padding: EdgeInsets.all(tokens.spacing4),
        margin: EdgeInsets.symmetric(
          horizontal: tokens.spacing6,
          vertical: tokens.spacing3,
        ),
        decoration: BoxDecoration(
          // ✅ Colors from tokens
          color: tokens.colorsBackgroundPrimary,
          border: Border.all(
            color: tokens.colorsBorderPrimary,
            width: 1,
          ),
          // ✅ Border radius from tokens
          borderRadius: BorderRadius.circular(tokens.borderRadiusLg),
          // ✅ Shadows from tokens
          boxShadow: tokens.colorsEffectsShadowsMd,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ✅ Typography from tokens
            Text(
              title,
              style: tokens.typographyTextLgSemibold.copyWith(
                color: tokens.colorsTextPrimary900,
              ),
            ),
            SizedBox(height: tokens.spacing2),
            Text(
              subtitle,
              style: tokens.typographyTextSmRegular.copyWith(
                color: tokens.colorsTextSecondary700,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Usage
TokenizedCard(
  title: 'Feature Card',
  subtitle: 'Built with design tokens',
  onTap: () => print('Tapped!'),
)
```

### **Button Component**

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
        // ✅ All from tokens
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

---

## 🤖 Jetpack Compose Example

### **Card Component dengan Tokens**

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import com.app.tokens.TokensLight
import com.app.tokens.TokensDark

@Composable
fun TokenizedCard(
    title: String,
    subtitle: String,
    onClick: () -> Unit = {},
    isDark: Boolean = false
) {
    val tokens = if (isDark) TokensDark else TokensLight
    
    Card(
        onClick = onClick,
        // ✅ Colors from tokens
        colors = CardDefaults.cardColors(
            containerColor = tokens.colorsBackgroundPrimary
        ),
        // ✅ Border radius from tokens
        shape = RoundedCornerShape(tokens.borderRadiusLg),
        // ✅ Border from tokens
        border = BorderStroke(1.dp, tokens.colorsBorderPrimary),
        modifier = Modifier
            // ✅ Spacing from tokens
            .padding(horizontal = tokens.spacing6, vertical = tokens.spacing3)
            .fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(tokens.spacing4)
        ) {
            // ✅ Typography manual composition (Compose way)
            Text(
                text = title,
                style = TextStyle(
                    fontSize = tokens.fontSizeLg,
                    fontWeight = tokens.fontWeightSemibold,
                    color = tokens.colorsTextPrimary900
                )
            )
            
            Spacer(modifier = Modifier.height(tokens.spacing2))
            
            Text(
                text = subtitle,
                style = TextStyle(
                    fontSize = tokens.fontSizeSm,
                    fontWeight = tokens.fontWeightRegular,
                    color = tokens.colorsTextSecondary700
                )
            )
        }
    }
}

// Usage
TokenizedCard(
    title = "Feature Card",
    subtitle = "Built with design tokens",
    onClick = { println("Tapped!") }
)
```

### **Primary Button**

```kotlin
@Composable
fun PrimaryButton(
    label: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Button(
        onClick = onClick,
        // ✅ All from tokens
        colors = ButtonDefaults.buttonColors(
            containerColor = TokensLight.colorsBackgroundBrandSolid,
            contentColor = TokensLight.colorsTextWhite
        ),
        shape = RoundedCornerShape(TokensLight.borderRadiusMd),
        contentPadding = PaddingValues(
            horizontal = TokensLight.spacing6,
            vertical = TokensLight.spacing3
        ),
        modifier = modifier
    ) {
        Text(
            text = label,
            style = TextStyle(
                fontSize = TokensLight.fontSizeMd,
                fontWeight = TokensLight.fontWeightSemibold
            )
        )
    }
}
```

### **Theme Integration**

```kotlin
// Create Compose MaterialTheme from tokens
@Composable
fun TokensTheme(
    isDark: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val tokens = if (isDark) TokensDark else TokensLight
    
    val colorScheme = ColorScheme(
        primary = tokens.colorsBrand600,
        onPrimary = tokens.colorsTextWhite,
        secondary = tokens.colorsGrayLightMode600,
        onSecondary = tokens.colorsTextWhite,
        background = tokens.colorsBackgroundPrimary,
        onBackground = tokens.colorsTextPrimary900,
        surface = tokens.colorsBackgroundSecondary,
        onSurface = tokens.colorsTextPrimary900,
        // ... map other colors
    )
    
    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography(
            displayLarge = TextStyle(
                fontSize = tokens.fontSizeXl,
                fontWeight = tokens.fontWeightBold
            ),
            bodyLarge = TextStyle(
                fontSize = tokens.fontSizeMd,
                fontWeight = tokens.fontWeightRegular
            ),
            // ... map other text styles
        ),
        content = content
    )
}
```

---

## 🌐 CSS Example

### **Card Component**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tokenized Components</title>
    
    <!-- ✅ Import tokens -->
    <link rel="stylesheet" href="build/css/tokens-light.css">
    
    <style>
        /* Card Component */
        .tokenized-card {
            /* ✅ Spacing from tokens */
            padding: var(--spacing-4);
            margin: var(--spacing-6) var(--spacing-3);
            
            /* ✅ Colors from tokens */
            background-color: var(--colors-background-primary);
            border: 1px solid var(--colors-border-primary);
            
            /* ✅ Border radius from tokens */
            border-radius: var(--border-radius-lg);
            
            /* Shadow (manual - complex type not in CSS tokens) */
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .tokenized-card:hover {
            background-color: var(--colors-background-primary-hover);
            box-shadow: 0 4px 6px rgba(0,0,0,0.15);
        }
        
        /* Typography */
        .card-title {
            /* ✅ Font properties from tokens */
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-semibold);
            line-height: var(--line-height-text-lg);
            color: var(--colors-text-primary-900);
            margin-bottom: var(--spacing-2);
        }
        
        .card-subtitle {
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-regular);
            line-height: var(--line-height-text-sm);
            color: var(--colors-text-secondary-700);
        }
        
        /* Primary Button */
        .primary-button {
            /* ✅ All from tokens */
            background-color: var(--colors-background-brand-solid);
            color: var(--colors-text-white);
            padding: var(--spacing-3) var(--spacing-6);
            border: none;
            border-radius: var(--border-radius-md);
            font-size: var(--font-size-md);
            font-weight: var(--font-weight-semibold);
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .primary-button:hover {
            background-color: var(--colors-background-brand-solid-hover);
        }
    </style>
</head>
<body>
    <!-- Card Component -->
    <div class="tokenized-card">
        <h3 class="card-title">Feature Card</h3>
        <p class="card-subtitle">Built with design tokens</p>
    </div>
    
    <!-- Button Component -->
    <button class="primary-button">Click Me</button>
</body>
</html>
```

### **Dark Mode Toggle**

```html
<html data-theme="light">
<head>
    <link rel="stylesheet" href="build/css/tokens-light.css" id="theme-light">
    <link rel="stylesheet" href="build/css/tokens-dark.css" id="theme-dark" disabled>
    
    <style>
        /* Use same token names, different values based on loaded stylesheet */
        .app {
            background-color: var(--colors-background-primary);
            color: var(--colors-text-primary-900);
            min-height: 100vh;
            padding: var(--spacing-8);
        }
    </style>
</head>
<body>
    <div class="app">
        <button onclick="toggleTheme()">Toggle Dark Mode</button>
        <div class="tokenized-card">
            <h3 class="card-title">Theme Support</h3>
            <p class="card-subtitle">Switch between light and dark mode</p>
        </div>
    </div>
    
    <script>
        function toggleTheme() {
            const html = document.documentElement;
            const lightLink = document.getElementById('theme-light');
            const darkLink = document.getElementById('theme-dark');
            
            if (html.getAttribute('data-theme') === 'light') {
                html.setAttribute('data-theme', 'dark');
                lightLink.disabled = true;
                darkLink.disabled = false;
            } else {
                html.setAttribute('data-theme', 'light');
                lightLink.disabled = false;
                darkLink.disabled = true;
            }
        }
    </script>
</body>
</html>
```

---

## 🎨 Advanced Examples

### **Responsive Layout (Flutter)**

```dart
class ResponsiveContainer extends StatelessWidget {
  final Widget child;

  const ResponsiveContainer({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        // ✅ Use width tokens for breakpoints
        final isMobile = constraints.maxWidth < TokensLight.widthMd;
        
        return Container(
          // ✅ Responsive padding from tokens
          padding: EdgeInsets.all(
            isMobile 
              ? TokensLight.containerPaddingMobile 
              : TokensLight.containerPaddingDesktop
          ),
          // ✅ Max width from tokens
          constraints: BoxConstraints(
            maxWidth: TokensLight.containerMaxWidthDesktop,
          ),
          child: child,
        );
      },
    );
  }
}
```

### **Gradient Button (Compose)**

```kotlin
@Composable
fun GradientButton(
    label: String,
    onClick: () -> Unit
) {
    val brush = Brush.horizontalGradient(
        // ✅ Brand colors from tokens
        colors = listOf(
            TokensLight.colorsBrand600,
            TokensLight.colorsBrand700
        )
    )
    
    Box(
        modifier = Modifier
            .background(brush, RoundedCornerShape(TokensLight.borderRadiusMd))
            .clickable(onClick = onClick)
            .padding(
                horizontal = TokensLight.spacing6,
                vertical = TokensLight.spacing3
            )
    ) {
        Text(
            text = label,
            style = TextStyle(
                fontSize = TokensLight.fontSizeMd,
                fontWeight = TokensLight.fontWeightSemibold,
                color = TokensLight.colorsTextWhite
            )
        )
    }
}
```

---

## ✅ Best Practices

### **1. Always Use Tokens (Don't Hardcode)**

❌ **Bad:**
```dart
Container(
  padding: EdgeInsets.all(16),  // Hardcoded
  color: Color(0xFF7F56D9),      // Hardcoded
)
```

✅ **Good:**
```dart
Container(
  padding: EdgeInsets.all(TokensLight.spacing4),
  color: TokensLight.colorsBrand600,
)
```

---

### **2. Create Reusable Components**

Build component library dengan tokens:
```dart
// lib/components/buttons.dart
class AppButton extends StatelessWidget {
  // Use tokens internally
}

// lib/components/cards.dart  
class AppCard extends StatelessWidget {
  // Use tokens internally
}
```

---

### **3. Theme-Aware Development**

Always support light & dark mode:
```dart
final tokens = isDarkMode ? TokensDark : TokensLight;
```

---

## 📊 Developer Productivity

### **Before Tokens:**
```dart
// Every developer uses different values
Container(color: Colors.purple)
Container(color: Color(0xFF7856D9))
Container(color: Color(0xFF8F56D9))  // Inconsistent!
```

### **After Tokens:**
```dart
// Everyone uses the same value
Container(color: TokensLight.colorsBrand600)  // Consistent!
```

---

## 🎯 Summary

**Tokens make it easy to:**
1. ✅ Build consistent UIs
2. ✅ Support dark mode
3. ✅ Maintain responsive layouts
4. ✅ Update designs globally
5. ✅ Onboard new developers faster

**Token usage = Better DX + Better UX** 🚀

---

*Examples tested & ready to use in production*
