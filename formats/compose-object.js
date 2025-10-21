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
    return `Color(0xFF000000)`; // fallback
  };

  // Helper to format number values for Dp
  const formatDp = (value) => {
    if (typeof value === 'string') {
      const numValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
      return isNaN(numValue) ? 0 : numValue;
    }
    return typeof value === 'number' ? value : 0;
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
    
    // Skip gradients and shadows (not well-supported in Compose constants)
    if (typeof token.value === 'string' && 
        (token.value.includes('linear-gradient') || token.value.includes('deg'))) {
      return;
    }
    
    // Skip boxShadow (Compose doesn't have direct BoxShadow equivalent)
    if (tokenType === 'boxShadow' || tokenType === 'shadow') {
      return;
    }

    if (tokenType === 'color') {
      groupedTokens.colors.push({ 
        name, 
        value: formatColor(token.value) 
      });
    } else if (tokenType === 'spacing' || tokenType === 'sizing' || 
               tokenType === 'borderRadius' || tokenType === 'dimension' ||
               tokenType === 'borderWidth') {
      groupedTokens.spacing.push({ 
        name, 
        value: `${formatDp(token.value)}.dp` 
      });
    } else if (tokenType === 'typography') {
      // Skip typography for now - Compose TextStyle is complex and needs manual implementation
      // Users can use fontSize, fontWeight, etc. separately
      return;
    } else if (tokenType === 'fontSizes') {
      groupedTokens.fontSize.push({ 
        name, 
        value: `${formatDp(token.value)}.sp` 
      });
    } else if (tokenType === 'fontWeights') {
      const weight = formatDp(token.value);
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
      groupedTokens.other.push({ 
        name, 
        value: formatDp(token.value) 
      });
    }
  });

  // Build output
  let output = `// ${file.destination}
// Do not edit directly, this file was auto-generated.

package ${packageName}

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.unit.em
import android.graphics.Typeface

/**
 * Design tokens for ${className.replace('Tokens', '')} theme
 * 
 * Usage:
 * Text(
 *   "Hello",
 *   color = ${className}.colorsBrand600,
 *   style = ${className}.typographyDisplayLgBold
 * )
 */
object ${className} {
`;

  // Add color tokens
  if (groupedTokens.colors.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Color Tokens\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.colors.forEach(({ name, value }) => {
      output += `    val ${name} = ${value}\n`;
    });
  }

  // Add spacing/dimension tokens
  if (groupedTokens.spacing.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Spacing & Dimension Tokens\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.spacing.forEach(({ name, value }) => {
      output += `    val ${name} = ${value}\n`;
    });
  }

  // Add typography tokens
  if (groupedTokens.typography.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Typography Tokens\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.typography.forEach(({ name, value }) => {
      output += `    val ${name} = ${value}\n`;
    });
  }

  // Add font size tokens
  if (groupedTokens.fontSize.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Font Size Tokens\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.fontSize.forEach(({ name, value }) => {
      output += `    val ${name} = ${value}\n`;
    });
  }

  // Add font weight tokens
  if (groupedTokens.fontWeight.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Font Weight Tokens\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.fontWeight.forEach(({ name, value }) => {
      output += `    val ${name} = ${value}\n`;
    });
  }

  // Add other tokens
  if (groupedTokens.other.length > 0) {
    output += `\n    // ===============================================\n`;
    output += `    // Other Tokens\n`;
    output += `    // ===============================================\n\n`;
    
    groupedTokens.other.forEach(({ name, value }) => {
      output += `    val ${name} = ${value}\n`;
    });
  }

  output += `}\n`;

  return output;
}
