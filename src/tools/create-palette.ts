import { Tool } from "@raycast/api";
type Input = {
  /**
   * The hex color code to use as the base color for the palette
   * (with or without the # prefix)
   */
  hexColor: string;
};
export default async function (input: Input) {
  // Clean up the hex color input (ensure it has # prefix)
  const baseColor = input.hexColor.startsWith("#")
    ? input.hexColor
    : `#${input.hexColor}`;
  // Validate hex color
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(baseColor)) {
    return {
      error: `Invalid hex color: ${input.hexColor}. Please provide a valid hex color like #3B82F6 or 3B82F6.`,
    };
  }
  // Generate a full Tailwind color palette
  const palette = generateTailwindPalette(baseColor);
  return {
    baseColor: baseColor,
    palette: palette,
    tailwindConfig: generateTailwindConfig(palette),
  };
}
export const confirmation: Tool.Confirmation<Input> = async (input) => {
  const baseColor = input.hexColor.startsWith("#")
    ? input.hexColor
    : `#${input.hexColor}`;
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(baseColor)) {
    return {
      message: `Invalid hex color: ${input.hexColor}. Please provide a valid hex color like #3B82F6 or 3B82F6.`,
    };
  }
  return {
    message: `Generate a Tailwind color palette based on ${baseColor}?`,
    info: [
      {
        name: "Base Color",
        value: baseColor,
      },
      {
        name: "Output",
        value: "A complete Tailwind color palette and configuration code",
      },
    ],
  };
};
function generateTailwindPalette(baseColor: string) {
  // Remove the # prefix for processing
  const hex = baseColor.replace("#", "");
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Create a palette with varying lightness levels
  const palette = {
    "50": generateShade(r, g, b, 0.95),
    "100": generateShade(r, g, b, 0.9),
    "200": generateShade(r, g, b, 0.75),
    "300": generateShade(r, g, b, 0.6),
    "400": generateShade(r, g, b, 0.45),
    "500": baseColor, // Base color
    "600": generateShade(r, g, b, -0.15),
    "700": generateShade(r, g, b, -0.3),
    "800": generateShade(r, g, b, -0.45),
    "900": generateShade(r, g, b, -0.6),
    "950": generateShade(r, g, b, -0.8),
  };
  return palette;
}
function generateShade(r: number, g: number, b: number, factor: number) {
  // Adjust the RGB values based on the factor
  // Positive factor makes it lighter, negative makes it darker
  let adjustedR, adjustedG, adjustedB;
  if (factor > 0) {
    // Lighten
    adjustedR = Math.min(255, Math.floor(r + (255 - r) * factor));
    adjustedG = Math.min(255, Math.floor(g + (255 - g) * factor));
    adjustedB = Math.min(255, Math.floor(b + (255 - b) * factor));
  } else {
    // Darken
    adjustedR = Math.max(0, Math.floor(r * (1 + factor)));
    adjustedG = Math.max(0, Math.floor(g * (1 + factor)));
    adjustedB = Math.max(0, Math.floor(b * (1 + factor)));
  }
  // Convert back to hex
  return `#${adjustedR.toString(16).padStart(2, "0")}${adjustedG
    .toString(16)
    .padStart(2, "0")}${adjustedB.toString(16).padStart(2, "0")}`;
}
function generateTailwindConfig(palette: Record<string, string>) {
  // Format the palette for Tailwind config
  return `// Add this to your tailwind.config.js file
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom': ${JSON.stringify(palette, null, 6)
          .replace(/"/g, "'")
          .replace(/,\n/g, ",\n        ")}
      }
    }
  }
}`;
}
