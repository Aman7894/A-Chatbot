# AI Assistant - ChatGPT Clone

A professional ChatGPT clone built with Next.js, React, and Google Gemini AI. Features a modern, responsive interface with advanced chat management capabilities.

## Features

- 🤖 **AI-Powered Conversations** - Powered by Google Gemini AI
- 💬 **Real-time Chat Interface** - Smooth, responsive messaging experience
- 🎨 **Professional UI/UX** - Company-level design with dark/light theme support
- 💾 **Message Persistence** - Automatic chat history saving to local storage
- ⚙️ **Advanced Settings** - Customizable AI parameters (temperature, max tokens, system prompts)
- 📤 **Export Functionality** - Export conversations as text or JSON
- 🗑️ **Message Management** - Copy, delete, and manage individual messages
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⌨️ **Keyboard Shortcuts** - Enter to send, Shift+Enter for new lines
- 🔄 **Error Handling** - Robust error handling with user-friendly messages

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Google Gemini API key

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edit `.env.local` and add your Gemini API key:
   \`\`\`env
   GEMINI_API_KEY=your_actual_api_key_here
   \`\`\`

4. **Get your Gemini API key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated key to your `.env.local` file

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Basic Chat
- Type your message in the input field
- Press Enter to send (Shift+Enter for new lines)
- The AI will respond using Google Gemini

### Advanced Features
- **Settings**: Click the settings icon to adjust AI parameters
- **Theme**: Toggle between light and dark modes
- **Export**: Export your conversation history
- **Clear**: Clear all messages with confirmation
- **Message Actions**: Right-click or use the menu on messages to copy or delete

### Customization
- Adjust AI temperature for more creative or focused responses
- Set custom system prompts to change AI behavior
- Configure max tokens for response length
- Enable/disable auto-save and sound notifications

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: Radix UI primitives
- **AI Integration**: Google Generative AI (Gemini)
- **State Management**: React hooks with localStorage persistence
- **Theme**: next-themes for dark/light mode

## Project Structure

\`\`\`
├── app/
│   ├── api/chat/route.ts      # Gemini API integration
│   ├── layout.tsx             # Root layout with theme provider
│   ├── page.tsx               # Main chat page
│   └── globals.css            # Global styles and design tokens
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── chat-interface.tsx     # Main chat component
│   ├── message-bubble.tsx     # Individual message display
│   ├── typing-indicator.tsx   # Loading animation
│   ├── chat-settings.tsx      # Settings panel
│   ├── export-chat.tsx        # Export functionality
│   └── theme-toggle.tsx       # Dark/light mode toggle
├── hooks/
│   └── use-chat.ts           # Chat state management
└── lib/
    └── utils.ts              # Utility functions
\`\`\`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## API Endpoints

- `POST /api/chat` - Send message to Gemini AI and get response

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues:
1. Check that your Gemini API key is correctly set
2. Ensure you have a stable internet connection
3. Check the browser console for error messages
4. Verify your API key has sufficient quota

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `GEMINI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

### Other Platforms
This is a standard Next.js application and can be deployed to any platform that supports Node.js.

---

Built with ❤️ using Next.js and Google Gemini AI
