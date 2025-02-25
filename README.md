# Maktaba-UI

Maktaba-UI is a simple Next.js application that serves as the frontend for the [Maktaba](https://github.com/kennmwai/maktaba) online library. This application interacts with the [Maktaba](https://github.com/kennmwai/maktaba)  backend API to provide users with a seamless experience for browsing books and accessing AI-generated insights.

## Table of Contents
- [UI Requirements](#ui-requirements)
- [API Integration](#api-integration)
- [UI/UX Considerations](#uiux-considerations)
- [Build and Run Instructions](#build-and-run-instructions)
- [Configuration](#configuration)
- [Design Decisions](#design-decisions)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## UI Requirements

### Home / Books List Page
- **Display a list of all books retrieved from the backend API (GET /books).**
- Each book item displays key details (e.g., title, author, publication year).
- Users can click on a book to view more details.

### Book Details Page
- **Show detailed information about a selected book by calling GET /books/{id}.**
- Provide a button or link to request AI insights for the book.

### AI Insights Feature
- **When the user clicks to get AI insights, call the GET /books/{id}/aiinsights endpoint.**
- Display the AI-generated tagline or summary alongside the book details.
- Handle loading states and potential errors from the API call gracefully.

### Search Functionality (Optional)
- **Add a search input on the Home page to allow users to filter books by title or author using the GET /books/search endpoint.**

## API Integration
- **Use Next.js’s data fetching methods (e.g., getServerSideProps, getStaticProps, or client-side fetching with useEffect) to communicate with the Spring Boot API.**
- Ensure the Next.js application can correctly handle API responses, including error states.

## UI/UX Considerations
- **Keep the UI simple and focused on functionality.**
- Use any styling solution you prefer (e.g., CSS modules, styled-components, Tailwind CSS).
- Ensure the application is responsive and provides clear user feedback (e.g., loading spinners, error messages).

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
1. Clone the Maktaba-UI repository:
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
- **Next.js**: Chosen for its simplicity and built-in features for server-side rendering.
- **Tailwind CSS**: Used for styling to keep styles scoped to components.
- **Axios**: Used for making HTTP requests to the backend API.
- **React Hook Form**: Used for managing form state and validation.
- **Zod**: Used for schema validation with React Hook Form.
- **React Query**: Used for data fetching and caching.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions, feel free to reach out:
- GitHub: [kennmwai](https://github.com/kennmwai)
