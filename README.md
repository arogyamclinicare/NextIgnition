# Coming Soon - Interactive Ripple Effect

A beautiful "Coming Soon" page with an interactive background ripple effect built with Next.js and Tailwind CSS.

## Features

- Interactive grid background with ripple animation
- Responsive design that works on all devices
- Dark/light mode support
- Smooth hover and click animations
- Modern typography with Geist font

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Download and extract the project files
2. Navigate to the project directory:
   \`\`\`bash
   cd coming-soon-ripple
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Changing the Text
Edit `components/background-ripple-effect-demo.tsx` to update the heading and description text.

### Adjusting the Grid
Modify the `BackgroundRippleEffect` component props in the same file:
- `rows`: Number of grid rows (default: 8)
- `cols`: Number of grid columns (default: 27)  
- `cellSize`: Size of each cell in pixels (default: 56)

### Colors and Styling
Update the CSS variables in `app/globals.css` to change colors and styling.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
Build the project and deploy the `out` folder:
\`\`\`bash
npm run build
\`\`\`

## Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Geist Font](https://vercel.com/font) - Modern typeface
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

This project is open source and available under the [MIT License](LICENSE).
