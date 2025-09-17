# Installation Guide

## Quick Start

1. **Download the project**
   - Click the three dots (⋯) in the top right of the code block
   - Select "Download ZIP"
   - Extract the files to your desired location

2. **Install dependencies**
   \`\`\`bash
   cd coming-soon-ripple
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - You should see your "Coming Soon" page with interactive ripple effects!

## What's Included

✅ **Complete Next.js 15 setup** with TypeScript
✅ **Tailwind CSS v4** with custom animations
✅ **Interactive ripple effect** component
✅ **Responsive design** for all devices
✅ **Dark/light mode** support
✅ **Modern Geist font** integration
✅ **Production ready** build configuration

## Troubleshooting

If you encounter any issues:

1. **Node.js version**: Ensure you have Node.js 18+ installed
2. **Clear cache**: Try `rm -rf node_modules package-lock.json && npm install`
3. **Port conflict**: If port 3000 is busy, Next.js will automatically use the next available port

## Customization

- **Text**: Edit `components/background-ripple-effect-demo.tsx`
- **Colors**: Modify CSS variables in `app/globals.css`
- **Grid size**: Adjust `rows`, `cols`, and `cellSize` props in the BackgroundRippleEffect component

## Deployment

Ready to deploy to Vercel, Netlify, or any other hosting platform that supports Next.js!
