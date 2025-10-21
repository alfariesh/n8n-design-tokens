/**
 * Custom Flutter class format for Style Dictionary v5
 */
export default function flutterClassFormat({ dictionary, options, file }) {
  const className = file.className || options.className || 'Tokens';
  
  // Helper to convert token name to camelCase and sanitize
  const toCamelCase = (str) => {
    // Replace special characters with ASCII equivalents
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
    str = str.replace(/[éèêë]/g, 'e')
              .replace(/[áàâä]/g, 'a')
              .replace(/[íìîï]/g, 'i')
              .replace(/[óòôö]/g, 'o')
              .replace(/[úùûü]/g, 'u');
    return str.replace(/[-_.](.)/g, (_, char) => char.toUpperCase());
  };

  // Helper to format color values
  const formatColor = (value) => {
    // Handle if value is already processed (e.g., from transformations)
    if (typeof value === 'string') {
      // Remove # and add 0xFF prefix for Flutter Color
      if (value.startsWith('#')) {
        let hex = value.replace('#', '').toUpperCase();
        // Handle alpha channel
        if (hex.length === 8) {
          // Rearrange RGBA to ARGB for Flutter
          const rgb = hex.substring(0, 6);
          const alpha = hex.substring(6, 8);
          return `Color(0x${alpha}${rgb})`;
        } else if (hex.length === 6) {
          return `Color(0xFF${hex})`;
        } else if (hex.length === 3) {
          // Convert short hex to full
          hex = hex.split('').map(char => char + char).join('');
          return `Color(0xFF${hex})`;
        }
      }
      // If already in 0x format
      if (value.startsWith('0x') || value.startsWith('0X')) {
        return `Color(${value})`;
      }
    }
    return `Color(0xFF000000)`; // fallback to black
  };

  // Helper to format number values
  const formatNumber = (value) => {
    // Parse the value if it's a string
    if (typeof value === 'string') {
      // Remove 'px', 'rem', '%' etc. if present
      const numValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
      return isNaN(numValue) ? 0 : numValue;
    }
    return typeof value === 'number' ? value : 0;
  };

  // Helper to parse CSS linear-gradient to Flutter LinearGradient
  const formatGradient = (gradientString) => {
    if (!gradientString || typeof gradientString !== 'string') return null;
    
    // Parse: linear-gradient(180deg, #ffffff 0%, #fafafa 100%)
    const match = gradientString.match(/linear-gradient\(([^,]+),\s*(.+)\)/);
    if (!match) return null;
    
    const angle = match[1].trim();
    const colorStops = match[2];
    
    // Parse angle to Flutter alignment
    const angleNum = parseInt(angle);
    let begin = 'Alignment.topCenter';
    let end = 'Alignment.bottomCenter';
    
    if (angleNum === 0 || angleNum === 360) {
      begin = 'Alignment.bottomCenter';
      end = 'Alignment.topCenter';
    } else if (angleNum === 45) {
      begin = 'Alignment.bottomLeft';
      end = 'Alignment.topRight';
    } else if (angleNum === 90) {
      begin = 'Alignment.centerLeft';
      end = 'Alignment.centerRight';
    } else if (angleNum === 135) {
      begin = 'Alignment.topLeft';
      end = 'Alignment.bottomRight';
    } else if (angleNum === 180) {
      begin = 'Alignment.topCenter';
      end = 'Alignment.bottomCenter';
    } else if (angleNum === 270) {
      begin = 'Alignment.centerRight';
      end = 'Alignment.centerLeft';
    }
    
    // Parse color stops: #ffffff 0%, #fafafa 100%
    const stops = [];
    const colors = [];
    const stopRegex = /(#[0-9a-fA-F]{6,8})\s+(\d+)%/g;
    let stopMatch;
    
    while ((stopMatch = stopRegex.exec(colorStops)) !== null) {
      colors.push(formatColor(stopMatch[1]));
      stops.push(parseFloat(stopMatch[2]) / 100);
    }
    
    if (colors.length === 0) return null;
    
    return `LinearGradient(
      begin: ${begin},
      end: ${end},
      colors: [${colors.join(', ')}],
      stops: [${stops.join(', ')}],
    )`;
  };

  // Helper to format BoxShadow
  const formatBoxShadow = (shadowValue) => {
    if (!shadowValue) return 'null';
    
    // shadowValue can be single object or array
    const shadows = Array.isArray(shadowValue) ? shadowValue : [shadowValue];
    
    const shadowStrings = shadows.map(shadow => {
      const color = shadow.color ? formatColor(shadow.color) : 'Color(0x1F000000)';
      const offsetX = shadow.x || 0;
      const offsetY = shadow.y || 0;
      const blurRadius = shadow.blur || 0;
      const spreadRadius = shadow.spread || 0;
      
      return `BoxShadow(color: ${color}, offset: Offset(${offsetX}, ${offsetY}), blurRadius: ${blurRadius}, spreadRadius: ${spreadRadius})`;
    });
    
    if (shadowStrings.length === 1) {
      return `[${shadowStrings[0]}]`;
    }
    
    return `[\n      ${shadowStrings.join(',\n      ')}\n    ]`;
  };

  // Helper to format TextStyle (typography)
  const formatTextStyle = (typoValue) => {
    if (!typoValue || typeof typoValue !== 'object') return 'null';
    
    const props = [];
    
    if (typoValue.fontFamily) {
      props.push(`fontFamily: '${typoValue.fontFamily}'`);
    }
    
    let fontSize = null;
    if (typoValue.fontSize) {
      fontSize = formatNumber(typoValue.fontSize);
      props.push(`fontSize: ${fontSize}`);
    }
    
    if (typoValue.fontWeight) {
      // Convert weight number to FontWeight
      const weight = formatNumber(typoValue.fontWeight);
      
      // Map custom weights to Flutter standard weights (100-900 in steps of 100)
      let flutterWeight;
      if (weight <= 150) {
        flutterWeight = 100;
      } else if (weight <= 250) {
        flutterWeight = 200;
      } else if (weight <= 350) {
        flutterWeight = 300;
      } else if (weight <= 450) {
        flutterWeight = 400;
      } else if (weight <= 550) {
        flutterWeight = 500;
      } else if (weight <= 650) {
        flutterWeight = 600;
      } else if (weight <= 850) {
        flutterWeight = 700;
      } else if (weight <= 950) {
        flutterWeight = 800;
      } else {
        flutterWeight = 900;
      }
      
      props.push(`fontWeight: FontWeight.w${flutterWeight}`);
    }
    
    if (typoValue.lineHeight && fontSize) {
      // Flutter uses relative height (line-height / font-size)
      const lineHeight = formatNumber(typoValue.lineHeight);
      const relativeHeight = (lineHeight / fontSize).toFixed(2);
      props.push(`height: ${relativeHeight}`);
    }
    
    if (typoValue.letterSpacing) {
      const ls = typoValue.letterSpacing;
      if (typeof ls === 'string' && ls.includes('%')) {
        // Convert percentage to em value
        const percent = parseFloat(ls.replace('%', ''));
        props.push(`letterSpacing: ${(percent / 100).toFixed(2)}`);
      } else {
        props.push(`letterSpacing: ${formatNumber(ls)}`);
      }
    }
    
    if (props.length === 0) return 'null';
    
    return `TextStyle(${props.join(', ')})`;
  };

  // Helper to get token value or reference
  const getTokenValue = (token) => {
    const { value, type, $type } = token;
    const tokenType = type || $type;

    if (tokenType === 'color') {
      // Check if this is a reference to another token
      if (typeof value === 'string' && !value.startsWith('#') && !value.startsWith('0x')) {
        // It's a reference, use the name directly
        return toCamelCase(value.replace(/[{}]/g, '').replace(/\./g, ''));
      }
      return formatColor(value);
    } else if (tokenType === 'boxShadow' || tokenType === 'shadow') {
      return formatBoxShadow(value);
    } else if (tokenType === 'typography') {
      return formatTextStyle(value);
    } else if (tokenType === 'number' || tokenType === 'dimension' || tokenType === 'sizing' || tokenType === 'spacing' || tokenType === 'borderRadius' || tokenType === 'borderWidth') {
      // Check if this is a reference
      if (typeof value === 'string' && value.includes('{')) {
        return toCamelCase(value.replace(/[{}]/g, '').replace(/\./g, ''));
      }
      return formatNumber(value);
    } else if (tokenType === 'fontSizes') {
      return formatNumber(value);
    } else if (tokenType === 'letterSpacing') {
      if (typeof value === 'string' && value.includes('%')) {
        const percent = parseFloat(value.replace('%', ''));
        return (percent / 100).toFixed(2);
      }
      return formatNumber(value);
    } else if (tokenType === 'lineHeights') {
      return formatNumber(value);
    } else if (tokenType === 'fontWeights') {
      return value;
    }
    
    return value;
  };

  // Group tokens by category
  const groupedTokens = {
    colors: [],
    gradients: [],
    spacing: [],
    sizing: [],
    borderRadius: [],
    borderWidth: [],
    shadows: [],
    typography: [],
    fontSize: [],
    fontWeight: [],
    lineHeight: [],
    letterSpacing: [],
    other: []
  };

  dictionary.allTokens.forEach(token => {
    const tokenType = token.type || token.$type;
    const name = toCamelCase(token.name);
    const rawValue = token.value;
    
    // Check if it's a gradient
    if (typeof rawValue === 'string' && rawValue.includes('linear-gradient')) {
      const gradientValue = formatGradient(rawValue);
      if (gradientValue) {
        groupedTokens.gradients.push({ name, value: gradientValue, type: 'gradient' });
      }
      return;
    }
    
    const value = getTokenValue(token);
    const tokenData = { name, value, type: tokenType };

    if (tokenType === 'color') {
      groupedTokens.colors.push(tokenData);
    } else if (tokenType === 'spacing') {
      groupedTokens.spacing.push(tokenData);
    } else if (tokenType === 'sizing') {
      groupedTokens.sizing.push(tokenData);
    } else if (tokenType === 'borderRadius') {
      groupedTokens.borderRadius.push(tokenData);
    } else if (tokenType === 'borderWidth') {
      groupedTokens.borderWidth.push(tokenData);
    } else if (tokenType === 'boxShadow' || tokenType === 'shadow') {
      groupedTokens.shadows.push(tokenData);
    } else if (tokenType === 'typography') {
      groupedTokens.typography.push(tokenData);
    } else if (tokenType === 'fontSizes') {
      groupedTokens.fontSize.push(tokenData);
    } else if (tokenType === 'fontWeights') {
      groupedTokens.fontWeight.push(tokenData);
    } else if (tokenType === 'lineHeights') {
      groupedTokens.lineHeight.push(tokenData);
    } else if (tokenType === 'letterSpacing') {
      groupedTokens.letterSpacing.push(tokenData);
    } else if (tokenType === 'number' || tokenType === 'dimension') {
      groupedTokens.other.push(tokenData);
    }
  });

  // Start building the output
  let output = `//
// ${file.destination}
//

// Do not edit directly, this file was auto-generated.

import 'package:flutter/material.dart';

/// Design tokens for ${className.replace('Tokens', '')} theme
/// 
/// This class contains all design tokens including colors, spacing, sizing, and border radius.
/// Use these tokens to maintain consistency across your Flutter application.
class ${className} {
  ${className}._();

`;

  // Add color tokens
  if (groupedTokens.colors.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Color Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.colors.forEach(({ name, value }) => {
      output += `  static const Color ${name} = ${value};\n`;
    });
    output += '\n';
  }

  // Add gradient tokens
  if (groupedTokens.gradients.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Gradient Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.gradients.forEach(({ name, value }) => {
      output += `  static const Gradient ${name} = ${value};\n`;
    });
    output += '\n';
  }

  // Add spacing tokens
  if (groupedTokens.spacing.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Spacing Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.spacing.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value}.0;\n`;
    });
    output += '\n';
  }

  // Add sizing tokens
  if (groupedTokens.sizing.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Sizing Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.sizing.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value}.0;\n`;
    });
    output += '\n';
  }

  // Add border radius tokens
  if (groupedTokens.borderRadius.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Border Radius Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.borderRadius.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value}.0;\n`;
    });
    output += '\n';
  }

  // Add border width tokens
  if (groupedTokens.borderWidth.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Border Width Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.borderWidth.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value}.0;\n`;
    });
    output += '\n';
  }

  // Add shadow tokens
  if (groupedTokens.shadows.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Shadow Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.shadows.forEach(({ name, value }) => {
      output += `  static const List<BoxShadow> ${name} = ${value};\n`;
    });
    output += '\n';
  }

  // Add typography tokens
  if (groupedTokens.typography.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Typography Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.typography.forEach(({ name, value }) => {
      output += `  static const TextStyle ${name} = ${value};\n`;
    });
    output += '\n';
  }

  // Add font size tokens
  if (groupedTokens.fontSize.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Font Size Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.fontSize.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value}.0;\n`;
    });
    output += '\n';
  }

  // Add font weight tokens
  if (groupedTokens.fontWeight.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Font Weight Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.fontWeight.forEach(({ name, value }) => {
      // Map custom weights to Flutter standard weights (100-900 in steps of 100)
      let weight = parseInt(value);
      
      let flutterWeight;
      if (weight <= 150) {
        flutterWeight = 100;
      } else if (weight <= 250) {
        flutterWeight = 200;
      } else if (weight <= 350) {
        flutterWeight = 300;
      } else if (weight <= 450) {
        flutterWeight = 400;
      } else if (weight <= 550) {
        flutterWeight = 500;
      } else if (weight <= 650) {
        flutterWeight = 600;
      } else if (weight <= 850) {
        flutterWeight = 700;
      } else if (weight <= 950) {
        flutterWeight = 800;
      } else {
        flutterWeight = 900;
      }
      
      output += `  static const FontWeight ${name} = FontWeight.w${flutterWeight};\n`;
    });
    output += '\n';
  }

  // Add line height tokens
  if (groupedTokens.lineHeight.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Line Height Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.lineHeight.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value}.0;\n`;
    });
    output += '\n';
  }

  // Add letter spacing tokens
  if (groupedTokens.letterSpacing.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Letter Spacing Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.letterSpacing.forEach(({ name, value }) => {
      output += `  static const double ${name} = ${value};\n`;
    });
    output += '\n';
  }

  // Add other tokens
  if (groupedTokens.other.length > 0) {
    output += `  // ===============================================\n`;
    output += `  // Other Tokens\n`;
    output += `  // ===============================================\n\n`;
    
    groupedTokens.other.forEach(({ name, value }) => {
      output += `  static const ${name} = ${value};\n`;
    });
    output += '\n';
  }

  output += `}\n`;

  return output;
}
