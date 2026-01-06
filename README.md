# Emmanuel Afful - Portfolio

A modern, responsive portfolio website showcasing my expertise as a Backend Engineer specializing in Go, PostgreSQL, and multi-tenant SaaS architecture.

## 🚀 Features

- **Modern Tech Stack**: Vue 3 + TypeScript + Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme Support**: Light, Dark, and System theme modes
- **Performance Optimized**: Fast loading with modern build tools
- **SEO Friendly**: Structured data and meta optimization
- **Accessibility**: WCAG compliant design

## 🛠️ Tech Stack

- **Frontend**: Vue 3, TypeScript, Vite
- **Styling**: Tailwind CSS, PrimeVue
- **Animations**: Motion-V
- **Icons**: Iconify
- **Runtime**: Deno
- **Deployment**: Deno Deploy

## 🏃♂️ Quick Start

```bash
# Clone the repository
git clone https://github.com/affulk000/portfolio.git
cd portfolio

# Development
deno task dev

# Build for production
deno task build

# Preview production build
deno task preview

# Serve built files
deno task serve
```

## 📁 Project Structure

```
src/
├── components/          # Vue components
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── sections/       # Page sections
│   └── ui/            # Reusable UI components
├── composables/        # Vue composables
├── data/              # Static data and content
└── assets/            # Images and static assets
```

## 🎨 Customization

### Theme Configuration
Themes are configured in `src/style.css` with CSS custom properties:

```css
@theme {
  --color-primary-500: oklch(0.55 0.25 250);
  --color-accent-500: oklch(0.6 0.2 180);
  /* ... */
}
```

### Content Management
Update content in the `src/data/` directory:
- `projects.ts` - Project portfolio
- `experience.ts` - Work experience
- `skills.ts` - Technical skills
- `education.ts` - Educational background

## 🚀 Deployment

### Deno Deploy (Recommended)
1. Push to GitHub
2. Connect repository to [Deno Deploy](https://dash.deno.com)
3. Set entrypoint to `main.ts`
4. Deploy automatically on push

### Manual Deployment
```bash
deno task build
# Upload dist/ folder to your hosting provider
```

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 🤝 Contact

- **Email**: [affulk000@gmail.com](mailto:affulk000@gmail.com)
- **GitHub**: [@affulk000](https://github.com/affulk000)
- **LinkedIn**: [Emmanuel Afful](http://linkedin.com/in/emmanuel-afful-6ba505260)

---

**Built with ❤️ using Vue 3 and Deno**