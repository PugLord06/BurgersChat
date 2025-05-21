# BurgersDev Chat Application

This is a full-stack chat application built with React for the frontend and Express for the backend. The app allows users to send messages and receive AI-generated responses using the Gemini API (gemini-2.0-flash model).

## Project Structure

```
.
├── .gitignore
├── package.json                # Root-level dependencies and scripts
├── tsconfig.json              # Root TypeScript configuration

└── client/                    # Client-side application
    ├── .env.example           # Example environment variables
    ├── package.json           # Client dependencies and scripts
    ├── postcss.config.js      # PostCSS configuration
    ├── tailwind.config.js     # Tailwind CSS configuration
    ├── tsconfig.json          # TypeScript config for the client

    ├── public/                # Static assets
    │   ├── index.html         # Main HTML template
    │   ├── manifest.json      # Web app manifest
    │   └── robots.txt         # Robots exclusion file

    ├── src/                   # Source code
    │   ├── App.css            # Global app styles
    │   ├── App.test.tsx       # Tests for the App component
    │   ├── App.tsx            # Main App component
    │   ├── index.tsx          # Entry point for React
    │   ├── react-app-env.d.ts # TypeScript environment definitions
    │   ├── reportWebVitals.ts # Web Vitals performance reporting
    │   ├── setupTests.ts      # Test setup

    │   ├── Backend/           # Backend-related logic
    │   │   └── server.ts      # Express server

    │   ├── Frontend/          # UI components
    │   │   └── chat.tsx       # Chat component

    │   └── styling/           # CSS files
    │       ├── chatstyles.css # Chat-specific styles
    │       └── index.css      # Global styles

```

## Dependencies

### Client Dependencies
- **React**: Frontend library for building user interfaces.
- **React Markdown**: For rendering Markdown content in chat messages.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: For type safety in the codebase.

### Backend Dependencies
- **Express**: Web framework for building the server.
- **CORS**: Middleware for handling cross-origin requests.
- **Node Fetch**: For making HTTP requests to the Gemini API.
- **dotenv**: For managing environment variables.

### Dev Dependencies
- **Tailwind Typography**: For better typography styling.
- **PostCSS**: For processing CSS.
- **TypeScript**: For type checking and transpilation.

## How to Run the Project

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A valid Gemini API key

### Setup Instructions

1. **Clone the Repository**:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   Navigate to the client directory and install dependencies:
   ```sh
   cd client
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a [`.env`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fcosmi%2FDocuments%2FProjects%2FWriteUP%2FBurgersChat%2Fclient%2Fsrc%2FBackend%2Fserver.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A9%2C%22character%22%3A22%7D%7D%5D%2C%22d26d599c-2209-40e1-9e2f-1c5e1707f8ab%22%5D "Go to definition") file in the 

Backend

 directory based on the `.env.example` file:
   ```
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Run the Backend**:
   Start the backend server:
   ```sh
   npm run start:backend
   ```

5. **Run the Frontend**:
   Open a new terminal, navigate to the client directory, and start the React app:
   ```sh
   npm run start:frontend
   ```

6. **Access the Application**:
   - Frontend: Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Backend: The server runs on [http://localhost:5000](http://localhost:5000).

## Features
- **Chat Interface**: Users can send messages and receive AI-generated responses.
- **Markdown Support**: Messages support Markdown formatting.
- **Responsive Design**: Styled with Tailwind CSS for a modern and responsive UI.

## Scripts

### Client
- `npm run start:frontend`: Start the React development server.
- [`npm run build`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fcosmi%2FDocuments%2FProjects%2FWriteUP%2FBurgersChat%2Fclient%2Fpublic%2Findex.html%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A24%2C%22character%22%3A63%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fcosmi%2FDocuments%2FProjects%2FWriteUP%2FBurgersChat%2Fclient%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A21%2C%22character%22%3A5%7D%7D%5D%2C%22d26d599c-2209-40e1-9e2f-1c5e1707f8ab%22%5D "Go to definition"): Build the React app for production.
- `npm run test`: Run tests for the React app. (At your own risk)

### Backend
- `npm run start:backend`: Start the Express server.

## License
This project is licensed under the MIT License.
