/**
 * Custom Jetpack Compose format for Style Dictionary v5
 * Generates Kotlin object with Color, Dp, TextStyle tokens
 */
export default function composeObjectFormat({ dictionary, options, file }) {
  const className = options?.className || file.options?.className || file.className || 'Tokens';
  const packageName = options?.packageName || file.options?.packageName || file.packageName || 'com.app.tokens';
  
  // Helper to convert token name to PascalCase
  const toPascalCase = (str) => {
    return str
      .replace(/[-_.](.)/g, (_, char) => char.toUpperCase())
      .replace(/^(.)/, (_, char) => char.toLowerCase());
  };

  // Helper to format color values for Compose
  const formatColor = (value) => {
    if (typeof value === 'string') {
      // If already in Compose format (from transform), return as is
      if (value.startsWith('Color(')) {
        return value;
      }
      
      if (value.startsWith('#')) {
        let hex = value.replace('#', '').toUpperCase();
        // Handle alpha channel
        if (hex.length === 8) {
          // Rearrange RGBA to ARGB for Compose
          const rgb = hex.substring(0, 6);
          const alpha = hex.substring(6, 8);
          return `Color(0x${alpha}${rgb})`;
        } else if (hex.length === 6) {
          return `Color(0xFF${hex})`;
        } else if (hex.length === 3) {
          hex = hex.split('').map(char => char + char).join('');
          return `Color(0xFF${hex})`;
        }
      }
      if (value.startsWith('0x') || value.startsWith('0X')) {
        return `Color(${value})`;
      }
    }
    
    // If it's already a number (from transforms), format it
    if (typeof value === 'number') {
      return `Color(0x${value.toString(16).padStart(8, '0').toUpperCase()})`;
    }
    
    return value; // Return as is if we don't know the format
  };

  // Helper to format number values for Dp
  const formatDp = (value) => {
    if (typeof value === 'string') {
      const numValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
      return isNaN(numValue) ? '0.dp' : `${numValue}.dp`;
    }
    return typeof value === 'number' ? `${value}.dp` : '0.dp';
  };

  // Helper to format TextStyle
  const formatTextStyle = (typoValue) => {
    if (!typoValue || typeof typoValue !== 'object') return 'null';
    
    const props = [];
    
    // FontFamily
    if (typoValue.fontFamily) {
      props.push(`fontFamily = FontFamily(Typeface.create("${typoValue.fontFamily}", Typeface.NORMAL))`);
    }
    
    // FontSize
    if (typoValue.fontSize) {
      const size = formatDp(typoValue.fontSize);
      props.push(`fontSize = ${size}.sp`);
    }
    
    // FontWeight
    if (typoValue.fontWeight) {
      const weight = formatDp(typoValue.fontWeight);
      let composeWeight;
      if (weight <= 150) composeWeight = 100;
      else if (weight <= 250) composeWeight = 200;
      else if (weight <= 350) composeWeight = 300;
      else if (weight <= 450) composeWeight = 400;
      else if (weight <= 550) composeWeight = 500;
      else if (weight <= 650) composeWeight = 600;
      else if (weight <= 850) composeWeight = 700;
      else if (weight <= 950) composeWeight = 800;
      else composeWeight = 900;
      
      props.push(`fontWeight = FontWeight.W${composeWeight}`);
    }
    
    // LineHeight
    let fontSize = null;
    if (typoValue.fontSize) {
      fontSize = formatDp(typoValue.fontSize);
    }
    if (typoValue.lineHeight && fontSize) {
      const lineHeight = formatDp(typoValue.lineHeight);
      props.push(`lineHeight = ${lineHeight}.sp`);
    }
    
    // LetterSpacing
    if (typoValue.letterSpacing) {
      const ls = typoValue.letterSpacing;
      if (typeof ls === 'string' && ls.includes('%')) {
        const percent = parseFloat(ls.replace('%', ''));
        props.push(`letterSpacing = ${(percent / 100).toFixed(2)}.em`);
      } else {
        props.push(`letterSpacing = ${formatDp(ls)}.sp`);
      }
    }
    
    if (props.length === 0) return 'null';
    
    return `TextStyle(\n        ${props.join(',\n        ')}\n    )`;
  };

  // Group tokens by category
  const groupedTokens = {
    colors: [],
    spacing: [],
    sizing: [],
    borderRadius: [],
    typography: [],
    fontSize: [],
    fontWeight: [],
    other: []
  };

  dictionary.allTokens.forEach(token => {
    const tokenType = token.type || token.$type;
    const name = toPascalCase(token.name);
    const rawValue = token.value;
    
    // Skip tokens with object or array values (shadows, typography, complex tokens)
    if (typeof rawValue === 'object' && rawValue !== null) {
      return;
    }
    
    // Skip gradients (not well-supported in Compose constants)
    if (typeof rawValue === 'string' && 
        (rawValue.includes('linear-gradient') || rawValue.includes('deg'))) {
      return;
    }
    
    // Skip boxShadow (Compose doesn't have direct BoxShadow equivalent)
    if (tokenType === 'boxShadow' || tokenType === 'shadow') {
      return;
    }
    
    // Skip typography (Compose TextStyle is complex and needs manual implementation)
    if (tokenType === 'typography') {
      return;
    }

    if (tokenType === 'color') {
      groupedTokens.colors.push({ 
        name, 
        value: formatColor(rawValue) 
      });
    } else if (tokenType === 'spacing' || tokenType === 'sizing' || 
               tokenType === 'borderRadius' || tokenType === 'dimension' ||
               tokenType === 'borderWidth') {
      const numValue = typeof rawValue === 'string' ? parseFloat(rawValue.replace(/[^0-9.-]/g, '')) : rawValue;
      groupedTokens.spacing.push({ 
        name, 
        value: `${numValue}.dp` 
      });
    } else if (tokenType === 'fontSizes') {
      const numValue = typeof rawValue === 'string' ? parseFloat(rawValue.replace(/[^0-9.-]/g, '')) : rawValue;
      groupedTokens.fontSize.push({ 
        name, 
        value: `${numValue}.sp` 
      });
    } else if (tokenType === 'fontWeights') {
      const weight = typeof rawValue === 'string' ? parseFloat(rawValue) : rawValue;
      let composeWeight;
      if (weight <= 150) composeWeight = 100;
      else if (weight <= 250) composeWeight = 200;
      else if (weight <= 350) composeWeight = 300;
      else if (weight <= 450) composeWeight = 400;
      else if (weight <= 550) composeWeight = 500;
      else if (weight <= 650) composeWeight = 600;
      else if (weight <= 850) composeWeight = 700;
      else if (weight <= 950) composeWeight = 800;
      else composeWeight = 900;
      
      groupedTokens.fontWeight.push({ 
        name, 
        value: `FontWeight.W${composeWeight}` 
      });
    } else if (tokenType === 'number') {
      const numValue = typeof rawValue === 'string' ? parseFloat(rawValue.replace(/[^0-9.-]/g, '')) : rawValue;
      groupedTokens.other.push({ 
        name, 
        value: numValue 
      });
    } else if (tokenType === 'letterSpacing') {
      // Handle letter spacing specially - skip percentage values
      if (typeof rawValue === 'string' && rawValue.includes('%')) {
        // Skip percentage values as they need context
        return;
      }
      const numValue = typeof rawValue === 'string' ? parseFloat(rawValue.replace(/[^0-9.-]/g, '')) : rawValue;
      groupedTokens.other.push({ 
        name, 
        value: `${numValue}.sp` 
      });
    }
  });

  // Build output
  let output = `// ${file.destination}
// Do not edit directly, this file was auto-generated.
// Generated by custom compose-object format

package ${packageName}

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * Design tokens for ${className.replace('Tokens', '')} theme
 * 
 * This object contains all design tokens including colors, spacing, sizing, 
 * border radius, font sizes, and font weights. Use these tokens to maintain 
 * consistency across your Compose application.
 * 
 * Usage example:
 * @sample
 * Box(
 *   modifier = Modifier
 *     .background(${className}.colorsBrand600)
 *     .padding(${className}.spacing4)
 *     .size(${className}.sizing48)
 * ) {
 *   Text(
 *     text = "Hello",
 *     color = ${className}.colorsBaseWhite,
 *     fontSize = ${className}.fontSizeMd
 *   )
 * }
 */
object ${className} {
`;

  // Add color tokens
  if (groupedTokens.colors.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Color Tokens\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.colors.forEach(({ name, value }) => {
      output += `    val ${name}: Color = ${value}\n`;
    });
  }

  // Add spacing/dimension tokens
  if (groupedTokens.spacing.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Spacing & Dimension Tokens\n`;
    output += `    // Values in density-independent pixels (Dp)\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.spacing.forEach(({ name, value }) => {
      output += `    val ${name}: Dp = ${value}\n`;
    });
  }

  // Add typography tokens
  if (groupedTokens.typography.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Typography Tokens\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.typography.forEach(({ name, value }) => {
      output += `    val ${name}: TextStyle = ${value}\n`;
    });
  }

  // Add font size tokens
  if (groupedTokens.fontSize.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Font Size Tokens\n`;
    output += `    // Values in scalable pixels (Sp)\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.fontSize.forEach(({ name, value }) => {
      output += `    val ${name}: TextUnit = ${value}\n`;
    });
  }

  // Add font weight tokens
  if (groupedTokens.fontWeight.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Font Weight Tokens\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.fontWeight.forEach(({ name, value }) => {
      output += `    val ${name}: FontWeight = ${value}\n`;
    });
  }

  // Add other tokens
  if (groupedTokens.other.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Other Tokens\n`;
    output += `    // Miscellaneous numeric values\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.other.forEach(({ name, value }) => {
      // Try to infer type from value
      const type = typeof value === 'string' && value.includes('.sp') ? 'TextUnit' :
                   typeof value === 'string' && value.includes('.dp') ? 'Dp' :
                   'Int';
      output += `    val ${name}: ${type} = ${value}\n`;
    });
  }

  output += `}\n`;

  return output;
}
