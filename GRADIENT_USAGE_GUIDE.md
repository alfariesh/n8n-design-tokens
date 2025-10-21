# 🎨 GRADIENT USAGE GUIDE - Flutter

## ✅ FIXED! Gradients Sekarang Ter-Export

**Status:** ✅ **31 Gradient tokens** sekarang available di Flutter!

---

## 📊 Gradient Tokens Available

### **Brand Gradients** (7 gradients)
```dart
TokensLight.colorsEffectsGradientsBrandGradient600To500Deg90
TokensLight.colorsEffectsGradientsBrandGradient700To600Deg45
TokensLight.colorsEffectsGradientsBrandGradient800To600Deg45
TokensLight.colorsEffectsGradientsBrandGradient800To600Deg90
TokensLight.colorsEffectsGradientsBrandGradient800To700Deg27
TokensLight.colorsEffectsGradientsBrandGradient900To600Deg45
TokensLight.colorsEffectsGradientsBrandGradient900To700Deg45
```

### **Gray Gradients** (15 gradients)
```dart
TokensLight.colorsEffectsGradientsGrayGradient600To500Deg90
TokensLight.colorsEffectsGradientsGrayGradient700To600Deg45
TokensLight.colorsEffectsGradientsGrayGradient800To600Deg45
TokensLight.colorsEffectsGradientsGrayGradient800To600Deg90
TokensLight.colorsEffectsGradientsGrayGradient800To700Deg27
TokensLight.colorsEffectsGradientsGrayGradient900To600Deg45
TokensLight.colorsEffectsGradientsGrayGradient900To700Deg45
TokensLight.colorsEffectsGradientsGrayGradient50ToWhiteDeg180
TokensLight.colorsEffectsGradientsGrayGradient100ToWhiteDeg180
TokensLight.colorsEffectsGradientsGrayGradient100To25Deg180
TokensLight.colorsEffectsGradientsGrayGradient100To50Deg180
TokensLight.colorsEffectsGradientsGrayGradient200To25Deg180
TokensLight.colorsEffectsGradientsGrayGradient200To50Deg180
TokensLight.colorsEffectsGradientsGrayGradient200To100Deg180
```

### **Linear Gradients** (10 decorative gradients)
```dart
TokensLight.colorsEffectsGradientsLinearGradient01  // Purple-Peach
TokensLight.colorsEffectsGradientsLinearGradient02  // Orange-Pink
TokensLight.colorsEffectsGradientsLinearGradient03  // Purple-Orange
TokensLight.colorsEffectsGradientsLinearGradient04  // Purple-Blue
TokensLight.colorsEffectsGradientsLinearGradient05  // Pink-Cyan
TokensLight.colorsEffectsGradientsLinearGradient06  // Gray-Blue
TokensLight.colorsEffectsGradientsLinearGradient07  // Beige-Cream
TokensLight.colorsEffectsGradientsLinearGradient08  // Yellow-Red
TokensLight.colorsEffectsGradientsLinearGradient09  // Pink-Yellow
TokensLight.colorsEffectsGradientsLinearGradient10  // Pink-Cream
```

### **Special**
```dart
TokensLight.colorsEffectsGradientsSkeuemorphicGradientBorder  // Subtle white overlay
```

---

## 💻 Usage Examples

### **1. Gradient Container Background**

```dart
import 'build/flutter/tokens_light.dart';

Container(
  decoration: BoxDecoration(
    // ✅ Use gradient token directly
    gradient: TokensLight.colorsEffectsGradientsBrandGradient600To500Deg90,
    borderRadius: BorderRadius.circular(TokensLight.borderRadiusLg),
  ),
  child: Padding(
    padding: EdgeInsets.all(TokensLight.spacing6),
    child: Text(
      'Gradient Background',
      style: TokensLight.typographyDisplayMdBold.copyWith(
        color: TokensLight.colorsTextWhite,
      ),
    ),
  ),
)
```

**Output:**
- 90deg gradient (left to right)
- Brand purple colors
- Smooth transition

---

### **2. Gradient Button**

```dart
class GradientButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;

  const GradientButton({
    Key? key,
    required this.label,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPressed,
      borderRadius: BorderRadius.circular(TokensLight.borderRadiusMd),
      child: Ink(
        decoration: BoxDecoration(
          // ✅ Brand gradient
          gradient: TokensLight.colorsEffectsGradientsBrandGradient800To700Deg27,
          borderRadius: BorderRadius.circular(TokensLight.borderRadiusMd),
        ),
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: TokensLight.spacing6,
            vertical: TokensLight.spacing3,
          ),
          child: Center(
            child: Text(
              label,
              style: TokensLight.typographyTextMdSemibold.copyWith(
                color: TokensLight.colorsTextWhite,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// Usage
GradientButton(
  label: 'Get Started',
  onPressed: () => print('Clicked!'),
)
```

---

### **3. Card with Gradient Overlay**

```dart
Stack(
  children: [
    // Background image
    Image.network(
      'https://example.com/image.jpg',
      fit: BoxFit.cover,
      height: 300,
      width: double.infinity,
    ),
    
    // ✅ Gradient overlay for text readability
    Container(
      height: 300,
      decoration: BoxDecoration(
        gradient: TokensLight.colorsEffectsGradientsGrayGradient900To600Deg45,
      ),
    ),
    
    // Content
    Positioned(
      bottom: TokensLight.spacing4,
      left: TokensLight.spacing4,
      right: TokensLight.spacing4,
      child: Text(
        'Beautiful Gradient Overlay',
        style: TokensLight.typographyDisplayLgBold.copyWith(
          color: TokensLight.colorsTextWhite,
        ),
      ),
    ),
  ],
)
```

---

### **4. AppBar with Gradient**

```dart
class GradientAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;

  const GradientAppBar({Key? key, required this.title}) : super(key: key);

  @override
  Size get preferredSize => Size.fromHeight(56);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        // ✅ Brand gradient horizontal
        gradient: TokensLight.colorsEffectsGradientsBrandGradient800To600Deg90,
      ),
      child: AppBar(
        title: Text(
          title,
          style: TokensLight.typographyTextLgSemibold,
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
    );
  }
}

// Usage
Scaffold(
  appBar: GradientAppBar(title: 'My App'),
  body: body,
)
```

---

### **5. Hero Section dengan Decorative Gradient**

```dart
Container(
  height: 400,
  width: double.infinity,
  decoration: BoxDecoration(
    // ✅ Decorative gradient
    gradient: TokensLight.colorsEffectsGradientsLinearGradient04,
  ),
  child: Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Welcome',
          style: TokensLight.typographyDisplay2xlBold.copyWith(
            color: TokensLight.colorsTextWhite,
          ),
        ),
        SizedBox(height: TokensLight.spacing4),
        Text(
          'Beautiful gradient backgrounds',
          style: TokensLight.typographyTextXlRegular.copyWith(
            color: TokensLight.colorsTextWhite,
          ),
        ),
      ],
    ),
  ),
)
```

---

### **6. Floating Action Button dengan Gradient**

```dart
FloatingActionButton.extended(
  onPressed: () {},
  backgroundColor: Colors.transparent,
  elevation: 0,
  label: Container(
    padding: EdgeInsets.symmetric(
      horizontal: TokensLight.spacing4,
      vertical: TokensLight.spacing2,
    ),
    decoration: BoxDecoration(
      // ✅ Brand gradient diagonal
      gradient: TokensLight.colorsEffectsGradientsBrandGradient700To600Deg45,
      borderRadius: BorderRadius.circular(TokensLight.borderRadiusFull),
    ),
    child: Row(
      children: [
        Icon(Icons.add, color: TokensLight.colorsTextWhite),
        SizedBox(width: TokensLight.spacing2),
        Text(
          'Add New',
          style: TokensLight.typographyTextMdSemibold.copyWith(
            color: TokensLight.colorsTextWhite,
          ),
        ),
      ],
    ),
  ),
)
```

---

### **7. Shimmer Loading dengan Gradient**

```dart
class ShimmerLoading extends StatefulWidget {
  @override
  _ShimmerLoadingState createState() => _ShimmerLoadingState();
}

class _ShimmerLoadingState extends State<ShimmerLoading>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 2),
    )..repeat();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Container(
          height: 100,
          decoration: BoxDecoration(
            // ✅ Subtle gradient for shimmer effect
            gradient: LinearGradient(
              begin: Alignment(-1.0 + 3 * _controller.value, 0),
              end: Alignment(3 * _controller.value, 0),
              colors: [
                TokensLight.colorsGrayLightMode200,
                TokensLight.colorsGrayLightMode100,
                TokensLight.colorsGrayLightMode200,
              ],
            ),
            borderRadius: BorderRadius.circular(TokensLight.borderRadiusMd),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

---

## 🎨 Gradient Types Explained

### **Angle Mapping:**

| CSS Angle | Flutter Alignment | Description |
|-----------|------------------|-------------|
| 0deg | bottom → top | Upward |
| 45deg | bottomLeft → topRight | Diagonal up-right |
| 90deg | left → right | Horizontal |
| 135deg | topLeft → bottomRight | Diagonal down-right |
| 180deg | top → bottom | Downward |
| 270deg | right → left | Horizontal reverse |

### **Color Stops:**
All gradients use 2 colors with stops at `[0, 1]` (0% and 100%)

---

## ✅ What Was Fixed

### **Before:**
```dart
// ❌ Gradients were skipped
// "not well-supported in Flutter constants"
// Only 868 tokens exported
```

### **After:**
```dart
// ✅ Gradients fully supported!
static const Gradient colorsEffectsGradientsBrandGradient600To500Deg90 = LinearGradient(
  begin: Alignment.centerLeft,
  end: Alignment.centerRight,
  colors: [Color(0xFF7F56D9), Color(0xFF9E77ED)],
  stops: [0, 1],
);

// ✅ 899 tokens exported (31 gradients added!)
```

---

## 🚀 Best Practices

### **1. Use Gradients for Visual Hierarchy**
```dart
// Hero sections
gradient: TokensLight.colorsEffectsGradientsLinearGradient04

// Call-to-action buttons  
gradient: TokensLight.colorsEffectsGradientsBrandGradient700To600Deg45
```

### **2. Combine with Shadows**
```dart
decoration: BoxDecoration(
  gradient: TokensLight.colorsEffectsGradientsBrandGradient800To600Deg90,
  borderRadius: BorderRadius.circular(TokensLight.borderRadiusLg),
  boxShadow: TokensLight.colorsEffectsShadowsLg,  // Add depth
)
```

### **3. Accessibility**
Pastikan text readable di atas gradient:
```dart
// ✅ Good contrast
gradient: dark gradient
text: white color

// ❌ Bad contrast
gradient: light gradient
text: light color
```

---

## 📊 Summary

**Fixed:**
- ✅ 31 gradient tokens sekarang ter-export
- ✅ CSS linear-gradient parsed ke Flutter LinearGradient
- ✅ Angle mapping otomatis (0deg, 45deg, 90deg, dll.)
- ✅ Color stops calculated correctly
- ✅ Ready to use in production

**Total Tokens:**
- Before: 868 tokens
- After: **899 tokens** (+31 gradients)

---

**Gradients sekarang fully supported di Flutter!** 🎨🚀

---

*Updated: 2025-10-21*
