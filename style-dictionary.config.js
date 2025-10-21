export default {
  log: {
    verbosity: 'default',
  },
  source: [
    'design-tokens/primitives.json',
    'design-tokens/spacing.json',
    'design-tokens/radius.json',
    'design-tokens/widths.json',
    'design-tokens/containers.json',
    'design-tokens/modes/light.json',
    'design-tokens/modes/dark.json',
  ],
  platforms: {
    'flutter-light': {
      transformGroup: 'flutter',
      buildPath: 'build/flutter/',
      files: [
        {
          destination: 'tokens_light.dart',
          format: 'flutter/class.dart',
          className: 'TokensLight',
          options: {
            outputReferences: true,
          },
          filter: (token) => {
            // Exclude typography tokens
            if (token.type === 'typography' || token.$type === 'typography') {
              return false;
            }
            
            // Check filePath to exclude dark mode tokens
            const filePath = token.filePath || '';
            if (filePath.includes('dark.json')) {
              return false;
            }
            
            return true;
          },
        },
      ],
    },
    'flutter-dark': {
      transformGroup: 'flutter',
      buildPath: 'build/flutter/',
      files: [
        {
          destination: 'tokens_dark.dart',
          format: 'flutter/class.dart',
          className: 'TokensDark',
          options: {
            outputReferences: true,
          },
          filter: (token) => {
            // Exclude typography tokens
            if (token.type === 'typography' || token.$type === 'typography') {
              return false;
            }
            
            // Check filePath to exclude light mode tokens
            const filePath = token.filePath || '';
            if (filePath.includes('light.json')) {
              return false;
            }
            
            return true;
          },
        },
      ],
    },
  },
};
