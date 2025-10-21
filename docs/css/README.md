# CSS Design Tokens Documentation

Complete guide untuk menggunakan design tokens di web aplikasi Anda dengan CSS custom properties.

## 📦 Installation

### 1. Copy Token Files

```bash
# Copy ke project Anda
cp build/css/tokens-light.css src/styles/
cp build/css/tokens-dark.css src/styles/
```

### 2. Import di HTML

```html
<!-- Light theme (default) -->
<link rel="stylesheet" href="styles/tokens-light.css">

<!-- Dark theme -->
<link rel="stylesheet" href="styles/tokens-dark.css" media="(prefers-color-scheme: dark)">
```

### 3. Import di CSS/SCSS

```css
/* In your main CSS file */
@import './tokens-light.css';

/* Optional: Dark mode */
@media (prefers-color-scheme: dark) {
  @import './tokens-dark.css';
}
```

### 4. Import di JavaScript/TypeScript

```javascript
// React, Vue, Angular, etc.
import '../styles/tokens-light.css';
import '../styles/tokens-dark.css';
```

---

## 🎨 Token Categories

### Colors (668 tokens)

```css
/* Base Colors */
var(--colors-base-white)        /* #FFFFFF */
var(--colors-base-black)        /* #000000 */

/* Brand Colors */
var(--colors-brand-600)         /* Primary brand */
var(--colors-brand-700)         /* Darker variant */
var(--colors-brand-500)         /* Lighter variant */

/* Semantic Colors */
var(--colors-text-primary-900)           /* Primary text */
var(--colors-text-secondary-700)         /* Secondary text */
var(--colors-background-primary)         /* Background */
var(--colors-border-primary)             /* Border */

/* Status Colors */
var(--colors-error-600)         /* Error */
var(--colors-warning-600)       /* Warning */
var(--colors-success-600)       /* Success */
```

### Typography (Font Properties)

```css
/* Font Families */
var(--typography-font-family-body)      /* "Inter" */
var(--typography-font-family-display)   /* "Bricolage Grotesque" */

/* Font Sizes */
var(--typography-font-size-2xl)    /* 72px (Display) */
var(--typography-font-size-xl)     /* 60px */
var(--typography-font-size-lg)     /* 48px */
var(--typography-font-size-md)     /* 36px */
var(--typography-font-size-sm)     /* 30px */
var(--typography-font-size-xs)     /* 24px */

/* Font Weights */
var(--typography-font-weight-regular)    /* 400 */
var(--typography-font-weight-medium)     /* 500 */
var(--typography-font-weight-semibold)   /* 700 */
var(--typography-font-weight-bold)       /* 900 */

/* Line Heights */
var(--typography-line-height-2xl)   /* 90px */
var(--typography-line-height-xl)    /* 72px */
var(--typography-line-height-lg)    /* 60px */
var(--typography-line-height-md)    /* 44px */

/* Letter Spacing */
var(--typography-letter-spacing-2xl)  /* 0px */
var(--typography-letter-spacing-xl)   /* 0px */
```

### Spacing (17 tokens)

```css
var(--spacing-none)     /* 0px */
var(--spacing-xxs)      /* 2px */
var(--spacing-xs)       /* 4px */
var(--spacing-sm)       /* 6px */
var(--spacing-md)       /* 8px */
var(--spacing-lg)       /* 12px */
var(--spacing-xl)       /* 16px */
var(--spacing-2xl)      /* 20px */
var(--spacing-3xl)      /* 24px */
var(--spacing-4xl)      /* 32px */
var(--spacing-5xl)      /* 40px */
var(--spacing-6xl)      /* 48px */
var(--spacing-7xl)      /* 64px */
var(--spacing-8xl)      /* 80px */
var(--spacing-9xl)      /* 96px */
var(--spacing-10xl)     /* 128px */
var(--spacing-11xl)     /* 160px */
```

### Border Radius (11 tokens)

```css
var(--border-radius-none)    /* 0px */
var(--border-radius-xxs)     /* 2px */
var(--border-radius-xs)      /* 4px */
var(--border-radius-sm)      /* 6px */
var(--border-radius-md)      /* 8px */
var(--border-radius-lg)      /* 10px */
var(--border-radius-xl)      /* 12px */
var(--border-radius-2xl)     /* 16px */
var(--border-radius-3xl)     /* 20px */
var(--border-radius-4xl)     /* 24px */
var(--border-radius-full)    /* 9999px (circle) */
```

### Border Widths

```css
var(--border-width-hairline)   /* 0.5px */
var(--border-width-thin)       /* 1px */
var(--border-width-thick)      /* 2px */
var(--border-width-heavy)      /* 4px */
```

### Container Sizes

```css
var(--container-max-width-mobile)      /* 480px */
var(--container-max-width-tablet)      /* 768px */
var(--container-max-width-desktop)     /* 1024px */
var(--container-max-width-wide)        /* 1280px */

var(--container-padding-mobile)        /* 16px */
var(--container-padding-desktop)       /* 24px */
```

---

## 💻 Usage Examples

### 1. Basic Card Component

```css
.card {
  background-color: var(--colors-background-primary);
  border: var(--border-width-thin) solid var(--colors-border-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-4);
  margin: var(--spacing-3);
}

.card__title {
  font-size: var(--typography-font-size-lg);
  font-weight: var(--typography-font-weight-semibold);
  color: var(--colors-text-primary-900);
  margin-bottom: var(--spacing-2);
}

.card__subtitle {
  font-size: var(--typography-font-size-sm);
  font-weight: var(--typography-font-weight-regular);
  color: var(--colors-text-secondary-700);
}
```

```html
<div class="card">
  <h2 class="card__title">Card Title</h2>
  <p class="card__subtitle">Card subtitle with tokens</p>
</div>
```

### 2. Button System

```css
.btn {
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--border-radius-md);
  font-size: var(--typography-font-size-md);
  font-weight: var(--typography-font-weight-semibold);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn--primary {
  background-color: var(--colors-background-brand-solid);
  color: var(--colors-text-white);
}

.btn--primary:hover {
  background-color: var(--colors-brand-700);
}

.btn--secondary {
  background-color: var(--colors-background-secondary);
  color: var(--colors-text-primary-900);
  border: var(--border-width-thin) solid var(--colors-border-primary);
}

.btn--error {
  background-color: var(--colors-error-600);
  color: var(--colors-text-white);
}
```

### 3. Typography System

```css
/* Display hierarchy */
.display-2xl {
  font-family: var(--typography-font-family-display);
  font-size: var(--typography-font-size-2xl);
  font-weight: var(--typography-font-weight-bold);
  line-height: var(--typography-line-height-2xl);
  letter-spacing: var(--typography-letter-spacing-2xl);
}

.display-lg {
  font-family: var(--typography-font-family-display);
  font-size: var(--typography-font-size-lg);
  font-weight: var(--typography-font-weight-bold);
  line-height: var(--typography-line-height-lg);
}

/* Text hierarchy */
.text-md {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-md);
  font-weight: var(--typography-font-weight-regular);
  line-height: var(--typography-line-height-md);
}

.text-sm {
  font-family: var(--typography-font-family-body);
  font-size: var(--typography-font-size-sm);
  line-height: var(--typography-line-height-sm);
}
```

### 4. Dark Mode Support

```css
/* Light mode (default) */
:root {
  --surface-color: var(--colors-background-primary);
  --text-color: var(--colors-text-primary-900);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --surface-color: var(--colors-background-primary);
    --text-color: var(--colors-text-primary-900);
  }
}

/* Apply theme */
body {
  background-color: var(--surface-color);
  color: var(--text-color);
}
```

### 5. Layout Container

```css
.container {
  max-width: var(--container-max-width-desktop);
  margin: 0 auto;
  padding: var(--spacing-4);
}

@media (max-width: 768px) {
  .container {
    max-width: var(--container-max-width-mobile);
    padding: var(--container-padding-mobile);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: var(--container-max-width-wide);
    padding: var(--container-padding-desktop);
  }
}
```

### 6. Status Indicators

```css
.badge {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--border-radius-full);
  font-size: var(--typography-font-size-xs);
  font-weight: var(--typography-font-weight-medium);
}

.badge--success {
  background-color: var(--colors-background-success);
  color: var(--colors-text-success-primary-600);
}

.badge--error {
  background-color: var(--colors-background-error);
  color: var(--colors-text-error-primary-600);
}

.badge--warning {
  background-color: var(--colors-background-warning);
  color: var(--colors-text-warning-primary-600);
}
```

### 7. Form Elements

```css
.input {
  padding: var(--spacing-3) var(--spacing-4);
  border: var(--border-width-thin) solid var(--colors-border-primary);
  border-radius: var(--border-radius-md);
  font-size: var(--typography-font-size-md);
  font-family: var(--typography-font-family-body);
  background-color: var(--colors-background-primary);
  color: var(--colors-text-primary-900);
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--colors-brand-600);
  box-shadow: 0 0 0 3px var(--colors-background-brand-subtle);
}

.input::placeholder {
  color: var(--colors-text-placeholder);
}

.input--error {
  border-color: var(--colors-error-600);
}
```

### 8. React/JSX Example

```jsx
// Use CSS modules or styled-components
import './tokens-light.css';

function Card({ title, description }) {
  return (
    <div style={{
      backgroundColor: 'var(--colors-background-primary)',
      borderRadius: 'var(--border-radius-lg)',
      padding: 'var(--spacing-4)',
      border: `var(--border-width-thin) solid var(--colors-border-primary)`
    }}>
      <h2 style={{
        fontSize: 'var(--typography-font-size-lg)',
        fontWeight: 'var(--typography-font-weight-semibold)',
        color: 'var(--colors-text-primary-900)',
        marginBottom: 'var(--spacing-2)'
      }}>
        {title}
      </h2>
      <p style={{
        fontSize: 'var(--typography-font-size-sm)',
        color: 'var(--colors-text-secondary-700)'
      }}>
        {description}
      </p>
    </div>
  );
}
```

### 9. Tailwind CSS Integration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand': 'var(--colors-brand-600)',
        'brand-hover': 'var(--colors-brand-700)',
        'text-primary': 'var(--colors-text-primary-900)',
        'text-secondary': 'var(--colors-text-secondary-700)',
        'bg-primary': 'var(--colors-background-primary)',
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
      },
      borderRadius: {
        'sm': 'var(--border-radius-sm)',
        'md': 'var(--border-radius-md)',
        'lg': 'var(--border-radius-lg)',
        'xl': 'var(--border-radius-xl)',
      }
    }
  }
}
```

### 10. CSS-in-JS (styled-components)

```javascript
import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--colors-background-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-4);
  border: var(--border-width-thin) solid var(--colors-border-primary);
`;

const Title = styled.h2`
  font-size: var(--typography-font-size-lg);
  font-weight: var(--typography-font-weight-semibold);
  color: var(--colors-text-primary-900);
  margin-bottom: var(--spacing-2);
`;

const Button = styled.button`
  background-color: var(--colors-background-brand-solid);
  color: var(--colors-text-white);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--border-radius-md);
  border: none;
  font-weight: var(--typography-font-weight-semibold);
  
  &:hover {
    background-color: var(--colors-brand-700);
  }
`;
```

---

## 🎯 Best Practices

### 1. Never Hardcode Values

❌ **Bad:**
```css
.card {
  padding: 16px;
  background-color: #7F56D9;
  border-radius: 8px;
}
```

✅ **Good:**
```css
.card {
  padding: var(--spacing-4);
  background-color: var(--colors-brand-600);
  border-radius: var(--border-radius-md);
}
```

### 2. Create Semantic Aliases

```css
:root {
  /* Semantic aliases for better context */
  --primary-color: var(--colors-brand-600);
  --surface-color: var(--colors-background-primary);
  --text-color: var(--colors-text-primary-900);
  --border-color: var(--colors-border-primary);
  
  /* Component-specific */
  --card-padding: var(--spacing-4);
  --card-radius: var(--border-radius-lg);
}
```

### 3. Use Fallback Values

```css
.element {
  /* Provide fallback if token not loaded */
  color: var(--colors-text-primary-900, #000000);
  padding: var(--spacing-4, 16px);
}
```

### 4. Consistent Spacing Scale

```css
/* Use spacing tokens consistently */
.section {
  margin-bottom: var(--spacing-8xl);  /* Large section gap */
}

.component {
  padding: var(--spacing-4);          /* Component padding */
  gap: var(--spacing-2);              /* Internal spacing */
}

.label {
  margin-bottom: var(--spacing-1);   /* Tight spacing */
}
```

---

## 🌙 Dark Mode Implementation

### Method 1: Media Query (Auto)

```html
<!-- Light (default) -->
<link rel="stylesheet" href="tokens-light.css">

<!-- Dark (auto switch) -->
<link rel="stylesheet" href="tokens-dark.css" media="(prefers-color-scheme: dark)">
```

### Method 2: Class Toggle (Manual)

```javascript
// Toggle dark mode with class
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
```

```css
/* tokens-light.css is default */

/* Override with dark mode */
body.dark-mode {
  /* Import dark tokens or override */
  --colors-background-primary: #000000;
  --colors-text-primary-900: #FFFFFF;
}
```

### Method 3: Data Attribute

```html
<html data-theme="light">
```

```javascript
// Switch themes
document.documentElement.setAttribute('data-theme', 'dark');
```

```css
[data-theme="dark"] {
  @import './tokens-dark.css';
}
```

---

## 🔄 Updating Tokens

When design tokens are updated:

1. Rebuild tokens:
```bash
npm run build
```

2. Copy updated CSS files:
```bash
cp build/css/tokens-light.css src/styles/
cp build/css/tokens-dark.css src/styles/
```

3. Refresh browser - changes apply immediately!

---

## 📚 Additional Resources

- [Multi-Platform Guide](../../MULTI_PLATFORM_GUIDE.md)
- [Example Usage](../../EXAMPLE_USAGE.md)
- [Developer Audit](../../AUDIT_DEVELOPER_PERSPECTIVE.md)

---

## ❓ FAQ

**Q: Do I need to import both light and dark tokens?**  
A: No, you can use just light tokens. Dark tokens are optional for dark mode support.

**Q: Can I use tokens with preprocessors (Sass, Less)?**  
A: Yes! Import token files normally. CSS variables work in all preprocessors.

**Q: How do I access tokens in JavaScript?**  
A: Use `getComputedStyle()`:
```javascript
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--colors-brand-600');
```

**Q: Can I override token values?**  
A: Yes! CSS custom properties cascade:
```css
.special-card {
  --spacing-4: 20px; /* Override locally */
  padding: var(--spacing-4);
}
```

**Q: Why are gradients not in CSS tokens?**  
A: CSS gradients are complex. Reference Flutter/Compose gradients and recreate:
```css
.gradient {
  background: linear-gradient(90deg, 
    var(--colors-brand-800) 0%, 
    var(--colors-brand-600) 100%
  );
}
```

---

**Happy styling with CSS tokens!** 🎨
