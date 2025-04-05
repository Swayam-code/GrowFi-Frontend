# GrowFi - Investment Portfolio Manager

GrowFi is a modern web application built with Next.js, TypeScript, and Tailwind CSS that helps users manage and optimize their investment portfolios across multiple platforms including Zerodha, MF Central, and Angel One.

## Features

- **Unified Dashboard**: View all your investments in one place with detailed analytics
- **AI-Powered Insights**: Get personalized recommendations and risk assessments
- **Portfolio Comparison**: Compare different funds and stocks side by side
- **Trade Execution**: Buy, sell, or set up SIPs directly from the platform
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Animations**: CSS Transitions and Animations
- **Authentication**: JWT-based authentication (simulated for demo)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/growfi.git
   cd growfi
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
growfi/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router
│   │   ├── compare/    # Fund comparison page
│   │   ├── dashboard/  # Main portfolio dashboard
│   │   ├── login/      # Authentication pages
│   │   ├── signup/     # User registration
│   │   ├── trade/      # Buy/Sell execution
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Landing page
│   ├── components/     # Reusable UI components
│   └── styles/         # Global styles
├── tailwind.config.ts  # Tailwind CSS configuration
└── next.config.ts      # Next.js configuration
```

## Demo Access

Use the following credentials to access the demo:
- **Email**: demo@example.com
- **Password**: any password will work

## Planned Features

- Real API integration with financial platforms
- User profile management and preferences
- Advanced portfolio analysis with historical data
- Mobile app version with React Native

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Financial data is simulated for demonstration purposes
- Icons provided by Heroicons
