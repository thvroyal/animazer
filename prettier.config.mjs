import vercelPrettierOptions from '@vercel/style-guide/prettier';
 
/** @type {import('prettier').Config} */
const config = {
  ...vercelPrettierOptions,
  plugins: [...vercelPrettierOptions.plugins, 'prettier-plugin-tailwindcss'],
};
 
export default config;