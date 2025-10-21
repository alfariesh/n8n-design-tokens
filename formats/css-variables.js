/**
 * Custom CSS variables format for Style Dictionary v5
 * Skips complex tokens that can't be represented as CSS variables
 */
export default function cssVariablesFormat({ dictionary, options }) {
  const selector = options?.selector || ':root';
  
  // Helper to convert token name to kebab-case
  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_.]+/g, '-')
      .toLowerCase();
  };

  // Helper to format color values for CSS
  const formatColor = (value) => {
    if (typeof value === 'string') {
      if (value.startsWith('#')) {
        let hex = value.toLowerCase();
        // Handle alpha channel for CSS
        if (hex.length === 9) {
          // Convert #RRGGBBAA to rgba()
          const r = parseInt(hex.substring(1, 3), 16);
          const g = parseInt(hex.substring(3, 5), 16);
          const b = parseInt(hex.substring(5, 7), 16);
          const a = parseInt(hex.substring(7, 9), 16) / 255;
          return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
        }
        return hex;
      }
      // Handle 0x format (convert to hex)
      if (value.startsWith('0x') || value.startsWith('0X')) {
        const hexValue = value.substring(2);
        if (hexValue.length === 8) {
          // ARGB format - convert to rgba
          const a = parseInt(hexValue.substring(0, 2), 16) / 255;
          const r = parseInt(hexValue.substring(2, 4), 16);
          const g = parseInt(hexValue.substring(4, 6), 16);
          const b = parseInt(hexValue.substring(6, 8), 16);
          return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
        }
      }
      return value;
    }
    return value;
  };

  // Helper to format dimension values
  const formatDimension = (value) => {
    if (typeof value === 'string') {
      // If already has unit, return as is
      if (value.match(/px|rem|em|%|vh|vw$/)) {
        return value;
      }
      // Parse number and add px
      const num = parseFloat(value);
      return isNaN(num) ? value : `${num}px`;
    }
    if (typeof value === 'number') {
      return `${value}px`;
    }
    return value;
  };

  // Build CSS output
  let output = `/**
 * Do not edit directly, this file was auto-generated.
 * 
 * Design Tokens - ${options.theme || 'Light'} Theme
 * 
 * Usage:
 * background-color: var(--colors-brand-600);
 * padding: var(--spacing-4);
 * border-radius: var(--border-radius-md);
 */

${selector} {\n`;

  dictionary.allTokens.forEach(token => {
    const tokenType = token.type || token.$type;
    const name = toKebabCase(token.name);
    const rawValue = token.value;
    
    // Skip tokens with object or array values (shadows, typography, complex tokens)
    if (typeof rawValue === 'object' && rawValue !== null) {
      return;
    }
    
    // Skip boxShadow and typography (handled separately or manually)
    if (tokenType === 'boxShadow' || tokenType === 'shadow' || tokenType === 'typography') {
      return;
    }
    
    let cssValue;
    
    if (tokenType === 'color') {
      cssValue = formatColor(rawValue);
    } else if (tokenType === 'spacing' || tokenType === 'sizing' || 
               tokenType === 'borderRadius' || tokenType === 'dimension' ||
               tokenType === 'borderWidth' || tokenType === 'fontSizes') {
      cssValue = formatDimension(rawValue);
    } else if (tokenType === 'fontWeights') {
      // CSS font-weight values
      const weight = parseInt(rawValue);
      if (weight <= 150) cssValue = 100;
      else if (weight <= 250) cssValue = 200;
      else if (weight <= 350) cssValue = 300;
      else if (weight <= 450) cssValue = 400;
      else if (weight <= 550) cssValue = 500;
      else if (weight <= 650) cssValue = 600;
      else if (weight <= 850) cssValue = 700;
      else if (weight <= 950) cssValue = 800;
      else cssValue = 900;
    } else if (tokenType === 'lineHeights') {
      // Line height can be unitless or with unit
      const num = parseFloat(rawValue);
      cssValue = isNaN(num) ? rawValue : num;
    } else if (tokenType === 'letterSpacing') {
      // Letter spacing
      if (typeof rawValue === 'string' && rawValue.includes('%')) {
        const percent = parseFloat(rawValue.replace('%', ''));
        cssValue = `${(percent / 100).toFixed(2)}em`;
      } else {
        cssValue = formatDimension(rawValue);
      }
    } else if (tokenType === 'number') {
      cssValue = rawValue;
    } else if (typeof rawValue === 'string') {
      // For gradient or other string values, keep as is
      cssValue = rawValue;
    } else {
      // Default case
      cssValue = rawValue;
    }
    
    if (cssValue !== undefined && cssValue !== null) {
      output += `  --${name}: ${cssValue};\n`;
    }
  });

  output += `}\n`;

  return output;
}
