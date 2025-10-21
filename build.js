import StyleDictionary from 'style-dictionary';
import flutterClassFormat from './formats/flutter-class.js';
import composeObjectFormat from './formats/compose-object.js';
import cssVariablesFormat from './formats/css-variables.js';
import androidFormats from './formats/android-xml.js';

// Register custom formats
StyleDictionary.registerFormat({
  name: 'flutter/class',
  format: flutterClassFormat,
});

StyleDictionary.registerFormat({
  name: 'compose/kotlin-object',
  format: composeObjectFormat,
});

StyleDictionary.registerFormat({
  name: 'css/custom-variables',
  format: cssVariablesFormat,
});

// Register Android XML formats
StyleDictionary.registerFormat({
  name: 'android/colors',
  format: androidFormats['android/colors'],
});

StyleDictionary.registerFormat({
  name: 'android/custom-dimens',
  format: androidFormats['android/dimens'],
});

StyleDictionary.registerFormat({
  name: 'android/custom-integers',
  format: androidFormats['android/integers'],
});

StyleDictionary.registerFormat({
  name: 'android/custom-strings',
  format: androidFormats['android/strings'],
});

// Build Light Theme - Multi-platform
console.log('🚀 Building Light Theme tokens...\n');
const sdLight = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/primitives.json',
    'design-tokens/spacing.json',
    'design-tokens/radius.json',
    'design-tokens/widths.json',
    'design-tokens/containers.json',
    'design-tokens/typography.json',
    'design-tokens/modes/light.json',
  ],
  platforms: {
    // Flutter
    'flutter': {
      transformGroup: 'flutter',
      buildPath: 'build/flutter/',
      files: [
        {
          destination: 'tokens_light.dart',
          format: 'flutter/class',
          className: 'TokensLight',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // Jetpack Compose (Android)
    'compose': {
      transformGroup: 'compose',
      buildPath: 'build/compose/',
      files: [
        {
          destination: 'TokensLight.kt',
          format: 'compose/kotlin-object',
          filter: (token) => {
            // Skip tokens with object/array values, boxShadow, and typography
            const tokenType = token.type || token.$type;
            const rawValue = token.value;
            
            if (typeof rawValue === 'object' && rawValue !== null) {
              return false;
            }
            
            if (typeof rawValue === 'string' && rawValue.includes('linear-gradient')) {
              return false;
            }
            
            if (tokenType === 'boxShadow' || tokenType === 'shadow' || tokenType === 'typography') {
              return false;
            }
            
            return true;
          },
          options: {
            outputReferences: true,
            className: 'TokensLight',
            packageName: 'com.app.tokens',
          },
        },
      ],
    },
    // CSS
    'css': {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens-light.css',
          format: 'css/custom-variables',
          filter: (token) => {
            // Skip tokens with object/array values, boxShadow, and typography
            const tokenType = token.type || token.$type;
            const rawValue = token.value;
            
            if (typeof rawValue === 'object' && rawValue !== null) {
              return false;
            }
            
            if (tokenType === 'boxShadow' || tokenType === 'shadow' || tokenType === 'typography') {
              return false;
            }
            
            return true;
          },
          options: {
            outputReferences: true,
            theme: 'Light',
          },
        },
      ],
    },
    // Android XML
    'android': {
      transformGroup: 'android',
      buildPath: 'build/android/values/',
      files: [
        {
          destination: 'colors.xml',
          format: 'android/colors',
        },
        {
          destination: 'dimens.xml',
          format: 'android/custom-dimens',
        },
        {
          destination: 'integers.xml',
          format: 'android/custom-integers',
        },
        {
          destination: 'strings.xml',
          format: 'android/custom-strings',
        },
      ],
    },
  },
});

await sdLight.buildAllPlatforms();

// Build Dark Theme - Multi-platform
console.log('\n🚀 Building Dark Theme tokens...\n');
const sdDark = new StyleDictionary({
  log: { verbosity: 'default' },
  source: [
    'design-tokens/primitives.json',
    'design-tokens/spacing.json',
    'design-tokens/radius.json',
    'design-tokens/widths.json',
    'design-tokens/containers.json',
    'design-tokens/typography.json',
    'design-tokens/modes/dark.json',
  ],
  platforms: {
    // Flutter
    'flutter': {
      transformGroup: 'flutter',
      buildPath: 'build/flutter/',
      files: [
        {
          destination: 'tokens_dark.dart',
          format: 'flutter/class',
          className: 'TokensDark',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // Jetpack Compose (Android)
    'compose': {
      transformGroup: 'compose',
      buildPath: 'build/compose/',
      files: [
        {
          destination: 'TokensDark.kt',
          format: 'compose/kotlin-object',
          filter: (token) => {
            // Skip tokens with object/array values, boxShadow, and typography
            const tokenType = token.type || token.$type;
            const rawValue = token.value;
            
            if (typeof rawValue === 'object' && rawValue !== null) {
              return false;
            }
            
            if (typeof rawValue === 'string' && rawValue.includes('linear-gradient')) {
              return false;
            }
            
            if (tokenType === 'boxShadow' || tokenType === 'shadow' || tokenType === 'typography') {
              return false;
            }
            
            return true;
          },
          options: {
            outputReferences: true,
            className: 'TokensDark',
            packageName: 'com.app.tokens',
          },
        },
      ],
    },
    // CSS
    'css': {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens-dark.css',
          format: 'css/custom-variables',
          filter: (token) => {
            // Skip tokens with object/array values, boxShadow, and typography
            const tokenType = token.type || token.$type;
            const rawValue = token.value;
            
            if (typeof rawValue === 'object' && rawValue !== null) {
              return false;
            }
            
            if (tokenType === 'boxShadow' || tokenType === 'shadow' || tokenType === 'typography') {
              return false;
            }
            
            return true;
          },
          options: {
            outputReferences: true,
            theme: 'Dark',
            selector: '.dark, [data-theme="dark"]',
          },
        },
      ],
    },
    // Android XML
    'android': {
      transformGroup: 'android',
      buildPath: 'build/android/values-night/',
      files: [
        {
          destination: 'colors.xml',
          format: 'android/colors',
        },
        {
          destination: 'dimens.xml',
          format: 'android/custom-dimens',
        },
        {
          destination: 'integers.xml',
          format: 'android/custom-integers',
        },
        {
          destination: 'strings.xml',
          format: 'android/custom-strings',
        },
      ],
    },
  },
});

await sdDark.buildAllPlatforms();

console.log('\n✅ Build completed successfully!');
console.log('📦 Generated:');
console.log('   - Flutter: build/flutter/');
console.log('   - Compose: build/compose/');
console.log('   - CSS: build/css/');
console.log('   - Android XML: build/android/values/ and build/android/values-night/');
