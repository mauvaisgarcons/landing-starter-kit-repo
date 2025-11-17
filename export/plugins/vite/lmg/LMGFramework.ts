import * as path from 'path';
import * as fs from 'fs';
import { Theme, LMGFrameworkConfig } from './TypeLMGFramework';
import { hexToHSL, generateColorShades } from './libs/utils';

// Main function to generate SCSS configuration
export default function LMGFramework(config: LMGFrameworkConfig) {

  return {

    name: 'lmg-js2scss',

    // Vite plugin hook to run when the build starts
    buildStart() {

      // Get the base path for the configuration file
      let configPath = path.resolve(__dirname, 'default.config.js');
      let userConfigPath = path.resolve(process.cwd(), 'theme.config.js');

      // Check if the user config file exists
      if (!fs.existsSync(userConfigPath)) {
        console.log("theme.config.js not found, using default.config.js");
      }else{
        configPath = userConfigPath;
      }
      
      // Import the configuration file
      import(configPath).then((module) => {

        // Convert the theme object to SCSS format
        const scssConfig      = convertConfigToScss(module.default.theme);
        const configFileOutput  = config.output.config || path.resolve(process.cwd(), '/resources/sass/framework/_config.scss');
        const rootFileOutput    = config.output.root || path.resolve(process.cwd(), '/resources/sass/framework/_root.scss');

        // Write the SCSS configuration to the output file
        fs.writeFileSync(process.cwd() + configFileOutput, scssConfig.config); // _config.scss
        fs.writeFileSync(process.cwd() + rootFileOutput, scssConfig.root); // _root.scss

        console.log(`SCSS configuration file generated`);
    });
    },
  };
}

// Function to convert a JavaScript object to SCSS variables
function convertConfigToScss(obj: Theme, indent = '   '): any{

  const array = {
    config: "",
    root: ":root{",
  }

  ///////////////////////////////////////////////////////
  //////////// Generate SCSS breakpoints ////////////////
  ///////////////////////////////////////////////////////
  const SCSS_BREAKPOINTS = Object.entries(obj.breakpoints)
    .map(([key, value]) => `${indent}${key}: ${value},`)
    .join('\n');
  array.config += `$breakpoints: (\n${SCSS_BREAKPOINTS}\n);\n`;

  ///////////////////////////////////////////////////////
  //////////// Generate SCSS Colors /////////////////////
  ///////////////////////////////////////////////////////
  const SCSS_COLORS = Object.entries(obj.colors)
    .map(([key, { background, foreground, shades_foreground, factors }]) => {
      
      let string = '';
      const hsl = hexToHSL(background);

      const shades2 = generateColorShades(background, factors)

      const shadeLight = [50, 100, 200,300, 400];
      const shadeDark = [600, 700, 800, 900, 950];

      // Base color variables
      string += `${indent}--${key}: ${background};\n`;
      string += `${indent}--${key}-500: ${background};\n`;
      string += `${indent}--${key}-text-foreground: ${foreground || '#000'};\n`;
      string += `${indent}--${key}-500-text-foreground: ${foreground || '#000'};\n`;

      // Generate dark shades
      const darkStep = hsl.l / 6.5;
      shadeDark.forEach((shade, index) => {
        // string += `${indent}--${key}-${shade}: hsl(var(--${key}-h), var(--${key}-s), ${hsl.l - darkStep * (index + 2)}%);\n`;
        string += `${indent}--${key}-${shade}: ${shades2[shade]};\n`;

        if(shades_foreground){
          if(shades_foreground[shade]){
              string += `${indent}--${key}-${shade}-text-foreground: ${shades_foreground[shade].foreground};\n`;
          }else{
            string += `${indent}--${key}-${shade}-text-foreground: ${foreground};\n`;
          }
        }else{
             string += `${indent}--${key}-${shade}-text-foreground: ${foreground};\n`;
        }
      });

      // Generate light shades
      const lightStep = (100 - hsl.l) / 6.5;
      shadeLight.forEach((shade, index) => {
        //string += `${indent}--${key}-${shade}: hsl(var(--${key}-h), var(--${key}-s), ${hsl.l + lightStep * (index + 2)}%);\n`;
        string += `${indent}--${key}-${shade}: ${shades2[shade]};\n`;
        if(shades_foreground){
          if(shades_foreground[shade]){
              string += `${indent}--${key}-${shade}-text-foreground: ${shades_foreground[shade].foreground};\n`;
          }else{
            string += `${indent}--${key}-${shade}-text-foreground: ${foreground};\n`;
          }
        }else{
             string += `${indent}--${key}-${shade}-text-foreground: ${foreground};\n`;
        }
       
      });

      return string;
    })
    .join('\n');
    array.root += `\n${SCSS_COLORS}\n`;


  ///////////////////////////////////////////////////////
  //////////// Generate SCSS Font base///////////////////
  ///////////////////////////////////////////////////////
  const SCSS_FONTS = Object.entries(obj.fonts.base)
  .map(([key, value]) => `${indent}${key}: ${value},`)
  .join('\n');
  array.config += `$font-base: (\n${SCSS_FONTS}\n);\n`;
  //`${SCSS_BREAKPOINTS_OUTPUT}\n${SCSS_FONTS_OUTPUT}\n${SCSS_COLORS_OUTPUT}`;
  // Combine breakpoints and colors into the final SCSS output



  ///////////////////////////////////////////////////////
  //////////// Generate Spacing /////////////////////
  ///////////////////////////////////////////////////////
  const baseSpacing = obj.spacing.base || 20;
  const spacingConverstion = {
    xxs: baseSpacing / 4,
    xs: baseSpacing / 2,
    sm: baseSpacing,
    md: baseSpacing * 2,
    lg: baseSpacing * 4,
    xl: baseSpacing * 6,
    "2xl": baseSpacing * 8,
    "3xl": baseSpacing * 10,
  }

  const SCSS_SPACINGS = Object.entries(spacingConverstion)
    .map(([key, value]) => `--space-${key}: ${value}px;`)
    .join('\n');
  
  array.root += `\n${SCSS_SPACINGS}\n`;

  array.root += `\n}\n`;
  return array;
}

