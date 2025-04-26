![ChatGPT Image Apr 24, 2025, 11_45_15 AM](https://github.com/user-attachments/assets/b1740e32-54ae-4b39-b2f2-9fee018e3e3f)
# clIck - AI-Powered Cross-Platform Mobile App Development

clIck is an intelligent code editor that simplifies and accelerates mobile app development through AI assistance. Build cross-platform mobile applications with natural language instructions and get instant previews of your code.

## Features

- 🤖 **AI-Powered Development** - Generate code from natural language descriptions
- 📱 **Cross-Platform Support** - Build for iOS and Android simultaneously
- 🔄 **Real-Time Preview** - See your changes instantly as you develop
- 🎨 **Smart UI Generation** - Create beautiful, responsive interfaces effortlessly
- 🔍 **Intelligent Code Suggestions** - Get context-aware code completions
- 📦 **Component Library** - Access pre-built, customizable components
- 🛠️ **Built-in Tools** - Web search, file upload, and more
- 🔐 **Secure Authentication** - Google and GitHub login support

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/click.git
cd click
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/chat
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
click/
├── app/                    # Next.js app directory
│   ├── chat/              # Chat interface
│   ├── sign-in/           # Authentication pages
│   └── sign-up/
├── components/            # Reusable React components
├── public/               # Static assets
└── styles/              # Global styles and themes
```

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **UI Components**: Heroicons
- **Development Tools**: ESLint, Prettier

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact our team at support@click.dev.

## Acknowledgments

- Thanks to all contributors who have helped shape clIck
- Inspired by v0.dev and other AI-powered development tools 
