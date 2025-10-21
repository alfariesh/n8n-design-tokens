# Jetpack Compose Design Tokens Documentation

Complete guide untuk menggunakan design tokens di Jetpack Compose aplikasi Android Anda.

## 📦 Installation

### 1. Copy Tokens ke Project

```bash
# Copy token files ke Android project Anda
cp build/compose/TokensLight.kt app/src/main/java/com/yourapp/tokens/
cp build/compose/TokensDark.kt app/src/main/java/com/yourapp/tokens/
```

### 2. Update Package Name

Edit file dan ubah package name:

```kotlin
// From
package com.yourapp.tokens

// To
package com.example.yourapp.design.tokens
```

### 3. Import di Composable

```kotlin
import com.yourapp.tokens.TokensLight
import com.yourapp.tokens.TokensDark
```

---

## 🎨 Token Categories

### Colors (668 tokens)

```kotlin
// Base Colors
TokensLight.colorsBaseWhite        // Color(0xFFFFFFFF)
TokensLight.colorsBaseBlack        // Color(0xFF000000)

// Brand Colors
TokensLight.colorsBrand600         // Primary brand
TokensLight.colorsBrand700         // Darker variant
TokensLight.colorsBrand500         // Lighter variant

// Semantic Colors
TokensLight.colorsTextPrimary900          // Primary text
TokensLight.colorsTextSecondary700        // Secondary text
TokensLight.colorsBackgroundPrimary       // Background
TokensLight.colorsBorderPrimary           // Border

// Status Colors
TokensLight.colorsError600         // Error
TokensLight.colorsWarning600       // Warning
TokensLight.colorsSuccess600       // Success
```

### Spacing (17 tokens)

```kotlin
TokensLight.spacingNone      // 0.dp
TokensLight.spacingXs        // 4.dp
TokensLight.spacingSm        // 6.dp
TokensLight.spacingMd        // 8.dp
TokensLight.spacingLg        // 12.dp
TokensLight.spacingXl        // 16.dp
TokensLight.spacing2xl       // 20.dp
TokensLight.spacing3xl       // 24.dp
TokensLight.spacing4xl       // 32.dp
TokensLight.spacing5xl       // 40.dp
TokensLight.spacing6xl       // 48.dp
TokensLight.spacing7xl       // 64.dp
TokensLight.spacing8xl       // 80.dp
TokensLight.spacing9xl       // 96.dp
TokensLight.spacing10xl      // 128.dp
TokensLight.spacing11xl      // 160.dp
```

### Typography Properties

```kotlin
// Font Families
TokensLight.typographyFontFamilyBody         // "Inter"
TokensLight.typographyFontFamilyDisplay      // "Bricolage Grotesque"

// Font Sizes (with .sp)
TokensLight.typographyFontSize2xl      // 72.sp (Display)
TokensLight.typographyFontSizeXl       // 60.sp
TokensLight.typographyFontSizeLg       // 48.sp
TokensLight.typographyFontSizeMd       // 36.sp
TokensLight.typographyFontSizeSm       // 30.sp
TokensLight.typographyFontSizeXs       // 24.sp

// Font Weights
TokensLight.typographyFontWeightRegular    // FontWeight.W400
TokensLight.typographyFontWeightMedium     // FontWeight.W500
TokensLight.typographyFontWeightSemibold   // FontWeight.W700
TokensLight.typographyFontWeightBold       // FontWeight.W900

// Line Heights (relative multipliers)
TokensLight.typographyLineHeight2xl    // 1.25
TokensLight.typographyLineHeightXl     // 1.2
TokensLight.typographyLineHeightLg     // 1.25
```

### Border Radius (11 tokens)

```kotlin
TokensLight.borderRadiusNone     // 0.dp
TokensLight.borderRadiusXs       // 4.dp
TokensLight.borderRadiusSm       // 6.dp
TokensLight.borderRadiusMd       // 8.dp
TokensLight.borderRadiusLg       // 10.dp
TokensLight.borderRadiusXl       // 12.dp
TokensLight.borderRadius2xl      // 16.dp
TokensLight.borderRadius3xl      // 20.dp
TokensLight.borderRadius4xl      // 24.dp
TokensLight.borderRadiusFull     // 9999.dp (circle)
```

### Dimensions & Sizing

```kotlin
// Container Sizes
TokensLight.containerMaxWidthMobile      // 480.dp
TokensLight.containerMaxWidthTablet      // 768.dp
TokensLight.containerMaxWidthDesktop     // 1024.dp

// Padding
TokensLight.containerPaddingMobile       // 16.dp
TokensLight.containerPaddingDesktop      // 24.dp

// Border Widths
TokensLight.borderWidthHairline     // 0.5.dp
TokensLight.borderWidthThin         // 1.dp
TokensLight.borderWidthThick        // 2.dp
TokensLight.borderWidthHeavy        // 4.dp
```

---

## 💻 Usage Examples

### 1. Card Component

```kotlin
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import com.yourapp.tokens.TokensLight

@Composable
fun TokenCard(
    title: String,
    subtitle: String,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(TokensLight.borderRadiusLg))
            .background(TokensLight.colorsBackgroundPrimary)
            .border(
                width = TokensLight.borderWidthThin,
                color = TokensLight.colorsBorderPrimary,
                shape = RoundedCornerShape(TokensLight.borderRadiusLg)
            )
            .padding(TokensLight.spacing4)
    ) {
        Column {
            Text(
                text = title,
                fontSize = TokensLight.typographyFontSizeLg,
                fontWeight = TokensLight.typographyFontWeightSemibold,
                color = TokensLight.colorsTextPrimary900,
                lineHeight = TokensLight.typographyFontSizeLg * TokensLight.typographyLineHeightLg
            )
            
            Spacer(modifier = Modifier.height(TokensLight.spacing2))
            
            Text(
                text = subtitle,
                fontSize = TokensLight.typographyFontSizeSm,
                fontWeight = TokensLight.typographyFontWeightRegular,
                color = TokensLight.colorsTextSecondary700,
                lineHeight = TokensLight.typographyFontSizeSm * TokensLight.typographyLineHeightSm
            )
        }
    }
}
```

### 2. Primary Button

```kotlin
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import com.yourapp.tokens.TokensLight

@Composable
fun PrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(TokensLight.borderRadiusMd))
            .background(TokensLight.colorsBackgroundBrandSolid)
            .clickable(onClick = onClick)
            .padding(
                horizontal = TokensLight.spacing6,
                vertical = TokensLight.spacing3
            ),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = text,
            color = TokensLight.colorsTextWhite,
            fontSize = TokensLight.typographyFontSizeMd,
            fontWeight = TokensLight.typographyFontWeightSemibold
        )
    }
}
```

### 3. Custom TextStyle Helper

```kotlin
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.yourapp.tokens.TokensLight

object Typography {
    val displayLarge = TextStyle(
        fontSize = TokensLight.typographyFontSizeLg,
        fontWeight = TokensLight.typographyFontWeightBold,
        lineHeight = TokensLight.typographyFontSizeLg * TokensLight.typographyLineHeightLg,
        color = TokensLight.colorsTextPrimary900
    )
    
    val bodyMedium = TextStyle(
        fontSize = TokensLight.typographyFontSizeMd,
        fontWeight = TokensLight.typographyFontWeightRegular,
        lineHeight = TokensLight.typographyFontSizeMd * TokensLight.typographyLineHeightMd,
        color = TokensLight.colorsTextPrimary900
    )
    
    val labelSmall = TextStyle(
        fontSize = TokensLight.typographyFontSizeXs,
        fontWeight = TokensLight.typographyFontWeightMedium,
        lineHeight = TokensLight.typographyFontSizeXs * TokensLight.typographyLineHeightXs,
        color = TokensLight.colorsTextSecondary700
    )
}

// Usage
@Composable
fun StyledText() {
    Text("Display Text", style = Typography.displayLarge)
    Text("Body Text", style = Typography.bodyMedium)
    Text("Label", style = Typography.labelSmall)
}
```

### 4. Dark Theme Support

```kotlin
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import com.yourapp.tokens.TokensLight
import com.yourapp.tokens.TokensDark

@Composable
fun ThemedContainer(content: @Composable () -> Unit) {
    val isDark = isSystemInDarkTheme()
    val tokens = if (isDark) TokensDark else TokensLight
    
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(tokens.colorsBackgroundPrimary)
    ) {
        content()
    }
}
```

### 5. Material3 Theme Integration

```kotlin
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.TextStyle
import com.yourapp.tokens.TokensLight
import com.yourapp.tokens.TokensDark

private val LightColorScheme = lightColorScheme(
    primary = TokensLight.colorsBrand600,
    onPrimary = TokensLight.colorsTextWhite,
    secondary = TokensLight.colorsGrayLightMode700,
    onSecondary = TokensLight.colorsTextWhite,
    background = TokensLight.colorsBackgroundPrimary,
    onBackground = TokensLight.colorsTextPrimary900,
    surface = TokensLight.colorsBackgroundSecondary,
    onSurface = TokensLight.colorsTextPrimary900,
    error = TokensLight.colorsError600,
    onError = TokensLight.colorsTextWhite,
)

private val DarkColorScheme = darkColorScheme(
    primary = TokensDark.colorsBrand600,
    onPrimary = TokensDark.colorsTextWhite,
    secondary = TokensDark.colorsGrayDarkMode700,
    onSecondary = TokensDark.colorsTextWhite,
    background = TokensDark.colorsBackgroundPrimary,
    onBackground = TokensDark.colorsTextPrimary900,
    surface = TokensDark.colorsBackgroundSecondary,
    onSurface = TokensDark.colorsTextPrimary900,
    error = TokensDark.colorsError600,
    onError = TokensDark.colorsTextWhite,
)

@Composable
fun AppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = androidx.compose.material3.Typography(
            displayLarge = TextStyle(
                fontSize = TokensLight.typographyFontSize2xl,
                fontWeight = TokensLight.typographyFontWeightBold,
            ),
            bodyLarge = TextStyle(
                fontSize = TokensLight.typographyFontSizeMd,
                fontWeight = TokensLight.typographyFontWeightRegular,
            ),
        ),
        content = content
    )
}
```

### 6. Layout with Responsive Spacing

```kotlin
@Composable
fun ResponsiveLayout() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(TokensLight.spacing4)
    ) {
        // Header
        Text(
            "Title",
            fontSize = TokensLight.typographyFontSizeLg,
            fontWeight = TokensLight.typographyFontWeightBold,
            modifier = Modifier.padding(bottom = TokensLight.spacing3)
        )
        
        // Content sections with consistent spacing
        repeat(3) {
            TokenCard(
                title = "Item ${it + 1}",
                subtitle = "Description",
                modifier = Modifier.padding(vertical = TokensLight.spacing2)
            )
        }
    }
}
```

### 7. Status Indicators

```kotlin
@Composable
fun StatusChip(status: Status, modifier: Modifier = Modifier) {
    val (bgColor, textColor, label) = when (status) {
        Status.SUCCESS -> Triple(
            TokensLight.colorsBackgroundSuccess,
            TokensLight.colorsTextSuccessPrimary600,
            "Success"
        )
        Status.ERROR -> Triple(
            TokensLight.colorsBackgroundError,
            TokensLight.colorsTextErrorPrimary600,
            "Error"
        )
        Status.WARNING -> Triple(
            TokensLight.colorsBackgroundWarning,
            TokensLight.colorsTextWarningPrimary600,
            "Warning"
        )
    }
    
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(TokensLight.borderRadiusFull))
            .background(bgColor)
            .padding(
                horizontal = TokensLight.spacing3,
                vertical = TokensLight.spacing1
            )
    ) {
        Text(
            text = label,
            color = textColor,
            fontSize = TokensLight.typographyFontSizeXs,
            fontWeight = TokensLight.typographyFontWeightMedium
        )
    }
}
```

---

## 🎯 Best Practices

### 1. Never Hardcode Values

❌ **Bad:**
```kotlin
Box(
    modifier = Modifier
        .padding(16.dp)
        .background(Color(0xFF7F56D9))
)
```

✅ **Good:**
```kotlin
Box(
    modifier = Modifier
        .padding(TokensLight.spacing4)
        .background(TokensLight.colorsBrand600)
)
```

### 2. Create Reusable Components

```kotlin
// Create component library with tokens
object Components {
    @Composable
    fun PrimaryCard(content: @Composable () -> Unit) {
        Box(
            modifier = Modifier
                .clip(RoundedCornerShape(TokensLight.borderRadiusLg))
                .background(TokensLight.colorsBackgroundPrimary)
                .border(
                    TokensLight.borderWidthThin,
                    TokensLight.colorsBorderPrimary,
                    RoundedCornerShape(TokensLight.borderRadiusLg)
                )
                .padding(TokensLight.spacing4)
        ) {
            content()
        }
    }
}
```

### 3. Use Semantic Naming

```kotlin
// Create semantic aliases
object AppColors {
    val primary = TokensLight.colorsBrand600
    val onPrimary = TokensLight.colorsTextWhite
    val surface = TokensLight.colorsBackgroundPrimary
    val error = TokensLight.colorsError600
}
```

### 4. Consistent Spacing Scale

```kotlin
// Use consistent spacing hierarchy
Column(
    modifier = Modifier.padding(TokensLight.spacing4)  // Container padding
) {
    Text("Title", modifier = Modifier.padding(bottom = TokensLight.spacing3))
    Text("Body", modifier = Modifier.padding(bottom = TokensLight.spacing2))
    Button(modifier = Modifier.padding(top = TokensLight.spacing4))
}
```

---

## ⚠️ Limitations

### Shadows Not Included
Compose shadows berbeda dari Flutter BoxShadow, sehingga shadow tokens tidak di-generate. Gunakan `Modifier.shadow()` dengan custom values:

```kotlin
Box(
    modifier = Modifier
        .shadow(
            elevation = 8.dp,
            shape = RoundedCornerShape(TokensLight.borderRadiusLg)
        )
)
```

### Complex Typography
Full TextStyle tidak di-generate karena Compose menggunakan pendekatan berbeda. Combine font properties manually:

```kotlin
Text(
    text = "Display Text",
    fontSize = TokensLight.typographyFontSizeLg,
    fontWeight = TokensLight.typographyFontWeightBold,
    lineHeight = TokensLight.typographyFontSizeLg * TokensLight.typographyLineHeightLg
)
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
cp build/compose/TokensLight.kt app/src/main/java/com/yourapp/tokens/
cp build/compose/TokensDark.kt app/src/main/java/com/yourapp/tokens/
```

3. Rebuild project - changes apply automatically!

---

## 📚 Additional Resources

- [Multi-Platform Guide](../../MULTI_PLATFORM_GUIDE.md)
- [Example Usage](../../EXAMPLE_USAGE.md)
- [Developer Audit](../../AUDIT_DEVELOPER_PERSPECTIVE.md)

---

## ❓ FAQ

**Q: Why no gradients in Compose?**  
A: Compose gradients use Brush API yang berbeda struktur. Implement manually:
```kotlin
val gradient = Brush.linearGradient(
    colors = listOf(TokensLight.colorsBrand600, TokensLight.colorsBrand700)
)
```

**Q: Can I modify generated token files?**  
A: No! They are auto-generated. Modify source files in `design-tokens/` and rebuild.

**Q: How do I add custom tokens?**  
A: Add to `design-tokens/*.json`, run `npm run build`, copy new Kotlin files.

**Q: Do tokens work with Compose Multiplatform?**  
A: Yes! These are standard Kotlin/Compose code.

---

**Happy coding with Jetpack Compose tokens!** 🚀
