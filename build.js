import StyleDictionary from 'style-dictionary';
import flutterClassFormat from './formats/flutter-class.js';
import composeObjectFormat from './formats/compose-object.js';

// Register custom formats
StyleDictionary.registerFormat({
  name: 'flutter/class',
  format: flutterClassFormat,
});

StyleDictionary.registerFormat({
  name: 'compose/object',
  format: composeObjectFormat,
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
          format: 'compose/object',
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
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
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
          format: 'compose/object',
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
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
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
