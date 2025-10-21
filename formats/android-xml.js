/**
 * Custom Android XML Resources format for Style Dictionary v5
 * Generates colors.xml, dimens.xml, and integers.xml
 */

// Helper to convert token name to snake_case
const toSnakeCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s_.]+/g, '_')
    .toLowerCase();
};

// Helper to format color values for Android
const formatAndroidColor = (value) => {
  if (typeof value === 'string') {
    if (value.startsWith('#')) {
      let hex = value.replace('#', '').toUpperCase();
      // Handle alpha channel - Android uses #AARRGGBB format
      if (hex.length === 8) {
        // If already RRGGBBAA, rearrange to AARRGGBB
        const rgb = hex.substring(0, 6);
        const alpha = hex.substring(6, 8);
        return `#${alpha}${rgb}`;
      } else if (hex.length === 6) {
        return `#FF${hex}`; // Add full opacity
      } else if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
        return `#FF${hex}`;
      }
    }
    return value;
  }
  
  if (typeof value === 'number') {
    return `#${value.toString(16).padStart(8, '0').toUpperCase()}`;
  }
  
  return value;
};

// Helper to format dimension values
const formatDimension = (value) => {
  if (typeof value === 'string') {
    // If already has a unit, return as is
    if (value.includes('dp') || value.includes('sp') || value.includes('px')) {
      return value;
    }
    const num = parseFloat(value);
    return isNaN(num) ? value : `${num}dp`;
  }
  if (typeof value === 'number') {
    return `${value}dp`;
  }
  return value;
};

// Helper to format font size values
const formatFontSize = (value) => {
  if (typeof value === 'string') {
    // If already has a unit, return as is
    if (value.includes('sp') || value.includes('dp') || value.includes('px')) {
      return value;
    }
    const num = parseFloat(value);
    return isNaN(num) ? value : `${num}sp`;
  }
  if (typeof value === 'number') {
    return `${value}sp`;
  }
  return value;
};

// Colors XML format
export function androidColorsFormat({ dictionary }) {
  const colors = dictionary.allTokens.filter(token => {
    const tokenType = token.type || token.$type;
    const rawValue = token.value;
    
    // Only include color tokens that are not objects
    return tokenType === 'color' && typeof rawValue !== 'object';
  });

  let output = `<?xml version="1.0" encoding="utf-8"?>
<!--
  Do not edit directly, this file was auto-generated.
  
  Design Tokens - Colors
  Generated from design tokens
-->
<resources>
`;

  colors.forEach(token => {
    const name = toSnakeCase(token.name);
    const value = formatAndroidColor(token.value);
    const comment = token.comment || token.description;
    
    if (comment) {
      output += `    <!-- ${comment} -->\n`;
    }
    output += `    <color name="${name}">${value}</color>\n`;
  });

  output += `</resources>\n`;
  return output;
}

// Dimens XML format (spacing, sizing, border radius)
export function androidDimensFormat({ dictionary }) {
  const allTokens = dictionary.allTokens;
  
  const dimens = allTokens.filter(token => {
    const tokenType = token.type || token.$type;
    const rawValue = token.value;
    const tokenName = token.name ? token.name.toLowerCase() : '';
    
    // Skip object/array values and complex types
    if (typeof rawValue === 'object' && rawValue !== null) {
      return false;
    }
    
    // Skip gradients, shadows, typography objects
    if (typeof rawValue === 'string' && 
        (rawValue.includes('linear-gradient') || 
         rawValue.includes('Color(') ||
         rawValue.includes('BoxShadow'))) {
      return false;
    }
    
    // Skip colors and box shadows explicitly
    if (tokenType === 'color' || tokenType === 'boxShadow' || tokenType === 'shadow') {
      return false;
    }
    
    // Skip font weights by name pattern
    if (tokenName.includes('weight') || 
        tokenName.includes('font_weight') || 
        tokenName.includes('fontweight')) {
      return false;
    }
    
    // Skip font families (those go to strings.xml)
    if (tokenType === 'fontFamilies' || tokenType === 'fontFamily') {
      return false;
    }
    
    // Skip text case and decoration (those go to strings.xml)
    if (tokenType === 'textCase' || tokenType === 'textDecoration') {
      return false;
    }
    
    // Include dimension-related types
    if (tokenType === 'spacing' || 
        tokenType === 'sizing' || 
        tokenType === 'dimension' ||
        tokenType === 'borderRadius' ||
        tokenType === 'borderWidth' ||
        tokenType === 'fontSizes' ||
        tokenType === 'fontSize' ||
        tokenType === 'lineHeights' ||
        tokenType === 'lineHeight' ||
        tokenType === 'letterSpacing' ||
        tokenType === 'paragraphSpacing' ||
        tokenType === 'paragraphIndent') {
      return true;
    }
    
    // For type "number", include all numeric dimensions except font weights
    if (tokenType === 'number') {
      const numValue = parseFloat(rawValue);
      
      // Skip if NaN
      if (isNaN(numValue)) {
        return false;
      }
      
      // Skip font weight range (typically 100-900)
      if (numValue >= 100 && numValue <= 900 && numValue % 100 === 0) {
        return false;
      }
      
      // Include all other numbers as dimensions
      return true;
    }
    
    return false;
  });

  let output = `<?xml version="1.0" encoding="utf-8"?>
<!--
  Do not edit directly, this file was auto-generated.
  
  Design Tokens - Dimensions
  Generated from design tokens
-->
<resources>
`;

  dimens.forEach(token => {
    const name = toSnakeCase(token.name);
    const tokenType = token.type || token.$type;
    const value = tokenType === 'fontSizes' ? formatFontSize(token.value) : formatDimension(token.value);
    const comment = token.comment || token.description;
    
    if (comment) {
      output += `    <!-- ${comment} -->\n`;
    }
    output += `    <dimen name="${name}">${value}</dimen>\n`;
  });

  output += `</resources>\n`;
  return output;
}

// Integers XML format (font weights, numbers)
export function androidIntegersFormat({ dictionary }) {
  const integers = dictionary.allTokens.filter(token => {
    const tokenType = token.type || token.$type;
    const rawValue = token.value;
    const tokenName = token.name ? token.name.toLowerCase() : '';
    
    // Skip object/array values
    if (typeof rawValue === 'object' && rawValue !== null) {
      return false;
    }
    
    // Explicitly include fontWeights
    if (tokenType === 'fontWeights' || tokenType === 'fontWeight') {
      return true;
    }
    
    // Skip other types - integers are primarily for font weights in Android
    return false;
  });

  let output = `<?xml version="1.0" encoding="utf-8"?>
<!--
  Do not edit directly, this file was auto-generated.
  
  Design Tokens - Integers
  Generated from design tokens
-->
<resources>
`;

  integers.forEach(token => {
    const name = toSnakeCase(token.name);
    const tokenType = token.type || token.$type;
    let value = token.value;
    
    // Map font weights to Android standard weights
    if (tokenType === 'fontWeights') {
      const weight = parseInt(value);
      if (weight <= 150) value = 100;
      else if (weight <= 250) value = 200;
      else if (weight <= 350) value = 300;
      else if (weight <= 450) value = 400;
      else if (weight <= 550) value = 500;
      else if (weight <= 650) value = 600;
      else if (weight <= 850) value = 700;
      else if (weight <= 950) value = 800;
      else value = 900;
    }
    
    const comment = token.comment || token.description;
    
    if (comment) {
      output += `    <!-- ${comment} -->\n`;
    }
    output += `    <integer name="${name}">${value}</integer>\n`;
  });

  output += `</resources>\n`;
  return output;
}

// Strings XML format (for font families and text values)
export function androidStringsFormat({ dictionary }) {
  const strings = dictionary.allTokens.filter(token => {
    const tokenType = token.type || token.$type;
    const rawValue = token.value;
    
    // Include string values like font families
    if (typeof rawValue !== 'string') {
      return false;
    }
    
    // Skip colors, gradients, and complex values
    if (rawValue.startsWith('#') || 
        rawValue.includes('gradient') ||
        rawValue.includes('Color(') ||
        rawValue.includes('BoxShadow')) {
      return false;
    }
    
    // Include font families and text-related properties
    return tokenType === 'fontFamilies' || 
           tokenType === 'fontFamily' ||
           tokenType === 'textCase' || 
           tokenType === 'textDecoration';
  });

  if (strings.length === 0) {
    return null; // Don't generate empty file
  }

  let output = `<?xml version="1.0" encoding="utf-8"?>
<!--
  Do not edit directly, this file was auto-generated.
  
  Design Tokens - Strings
  Generated from design tokens
-->
<resources>
`;

  strings.forEach(token => {
    const name = toSnakeCase(token.name);
    const value = token.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const comment = token.comment || token.description;
    
    if (comment) {
      output += `    <!-- ${comment} -->\n`;
    }
    output += `    <string name="${name}">${value}</string>\n`;
  });

  output += `</resources>\n`;
  return output;
}

// Export all formats
export default {
  'android/colors': androidColorsFormat,
  'android/dimens': androidDimensFormat,
  'android/integers': androidIntegersFormat,
  'android/strings': androidStringsFormat,
};
