# Brandless CMS Frontend

A modern, responsive frontend for the Brandless CMS built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI**: Built with Radix UI primitives and Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Form Handling**: Powered by React Hook Form
- **Responsive Design**: Works on all device sizes
- **Component Library**: Reusable UI components with Radix UI

## 🛠️ Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager
- Docker (for containerized development)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file based on the `.env.example` file and update the variables as needed.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Using Docker

1. **Build and run the container**
   ```bash
   docker-compose up
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

## 🛠 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── app/         # App router pages and layouts
│   ├── components/  # Reusable UI components
│   ├── lib/         # Utility functions and API clients
│   ├── styles/      # Global styles
│   └── types/       # TypeScript type definitions
├── .env             # Environment variables
├── next.config.js   # Next.js configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## 🎨 Styling

This project uses:
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Tailwind Merge](https://github.com/dcastil/tailwind-merge) for merging Tailwind classes
- [Class Variance Authority](https://cva.style/) for type-safe component variants

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📝 API Documentation

For API integration details, please refer to the [API Guide](FRONTEND_API_GUIDE.md).
