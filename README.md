# Maktaba-UI

Maktaba-UI is a simple Next.js application that serves as the frontend for the [Maktaba](https://github.com/kennmwai/maktaba) online library. This application interacts with the [Maktaba](https://github.com/kennmwai/maktaba) backend API to provide users with a seamless experience for browsing books and accessing AI-generated insights.

## Table of Contents
- [Features](#features)
- [API Integration](#api-integration)
- [UI/UX Considerations](#uiux-considerations)
- [Build and Run Instructions](#build-and-run-instructions)
- [Configuration](#configuration)
- [Design Decisions](#design-decisions)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

### Home / Books List Page
- **Displays a list of all books retrieved from the backend API (GET /books).**
- Each book item displays key details (e.g., title, author, publication year).
- Users can click on a book to view more details.

### Book Details Page
- **Shows detailed information about a selected book by calling GET /books/{id}.**
- Provides a button or link to request AI insights for the book.

### AI Insights Feature
- **When the user clicks to get AI insights, calls the GET /books/{id}/ai-insights endpoint.**
- Displays the AI-generated tagline or summary alongside the book details.
- Handles loading states and potential errors from the API call gracefully.

### Search Functionality
- A search input is provided on the Home page, allowing users to filter books by title or author using the GET /books/search endpoint.

## API Integration
- Utilizes Next.js’s data fetching methods (e.g., client-side fetching with useEffect) to communicate with the Spring Boot API.
- Ensures the Next.js application correctly handles API responses, including error states.

### API Routes
- **GET /books**: Fetches a list of all books from the backend API.
- **GET /books/{id}**: Fetches detailed information about a selected book.
- **GET /books/{id}/ai-insights**: Fetches AI-generated insights for a selected book.
- **GET /books/search**: Searches for books by title or author.

These API routes are integrated into the Next.js application using server-side functions that handle requests and responses, ensuring smooth communication with the backend.

## UI/UX Considerations
- The UI is designed to be simple and focused on functionality.
- Uses styling solutions such as CSS modules, styled-components, and Tailwind CSS.
- Ensures the application is responsive and provides clear user feedback (e.g., loading spinners, error messages).

## Build and Run Instructions

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed.

### Backend Setup
1. Clone the [Maktaba](https://github.com/kennmwai/maktaba) backend repository:
   ```bash
   git clone https://github.com/kennmwai/maktaba.git
   cd maktaba
   ```
2. Build and run the backend application:
   ```bash
   ./mvnw clean install
   export AI_API_KEY=your_ai_api_key_here
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Clone the [Maktaba UI](https://github.com/kennmwai/maktaba-ui) repository:
   ```bash
   git clone https://github.com/kennmwai/maktaba-ui.git
   cd maktaba-ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Next.js application:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## Configuration
- The application requires an AI API key for the AI integration. You can set the `AI_API_KEY` environment variable in a `.env.local` file:
  ```dotenv
  AI_API_KEY=your_ai_api_key_here
  ```
- You can also set the `API_BASE_URL` environment variable in the same file:
  ```dotenv
  API_BASE_URL=http://localhost:8080
  ```

## Design Decisions
- **Next.js**: Chosen for its simplicity and built-in features.
- **Tailwind CSS**: Used for styling to keep styles scoped to components.
- **React Hook Form**: Used for managing form state and validation.
- **Zod**: Used for schema validation with React Hook Form.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions, feel free to reach out:
- GitHub: [kennmwai](https://github.com/kennmwai)
