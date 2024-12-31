# QueryNest

## Project Purpose

This project is a platform where users can add, update, and delete their queries about products. They can view other users' queries, provide alternative product recommendations, and interact with the community by modifying or deleting their comments and recommendations. The platform fosters user engagement and provides valuable insights into alternative products.

## Live Site Link

[Live Site URL](https://product-recommendation-s-965a9.web.app/)

## Key Features

1. **User Queries Management:**

   - Add, update, and delete queries.
   - View recent and all queries with details and recommendations.

2. **Recommendations System:**

   - Users can add, view, and delete recommendations for products.
   - Recommendations count updates dynamically.

3. **Authentication and Authorization:**

   - Email/password-based authentication.
   - Google sign-in.
   - JWT implementation to secure private routes.

4. **Responsive Design:**

   - Fully responsive layout for mobile, tablet, and desktop devices.

5. **Search and Layout Toggle:**

   - Search functionality to filter queries by product name.
   - Toggle layout options (grid styles) for better user experience.

6. **Error Handling:**
   - 404 error page with navigation back to the homepage.
   - Conditional rendering of navigation links based on login status.

## Key Pages and Functionalities

### Home Page

- Default landing page with a slider to showcase the platform's purpose.
- Recent Queries section displaying the six most recent queries.
- Additional sections with animations and creative content.

### Queries Page

- Displays all user queries in descending order.
- Includes a recommendation button for each query, directing users to the query details page.
- Search functionality based on product names.
- Layout toggle buttons for a customizable view.

### Query Details Page

- Shows specific query details with user information.
- Allows adding new recommendations for the query.
- Displays all recommendations with comments and images.

### My Queries Page

- Displays the logged-in user's queries in a card layout.
- Options to view details, update, or delete queries.
- Button to add new queries.

### Recommendations For Me Page

- Displays all recommendations made by others for the logged-in user's queries.

### My Recommendations Page

- Displays all recommendations made by the logged-in user.
- Allows deleting recommendations with confirmation.

### Authentication Pages

- Login and registration forms with relevant error messages.
- Google Sign-in integration.

## Technology Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** Firebase, JWT
- **Deployment:** Netlify / Vercel (Frontend), Render / Heroku (Backend)

## Key NPM Packages Used

- `react-router-dom` for routing.
- `axios` for API calls.
- `dotenv` for managing environment variables.
- `firebase` for authentication.
- `jsonwebtoken` for implementing JWT authentication.
- `mongoose` for MongoDB integration.

## How to Run the Project Locally

1. Clone the repository.
2. Install dependencies with `npm install` in both client and server directories.
3. Set up `.env` files for environment variables (Firebase, MongoDB, etc.).
4. Run the backend server using `npm start` or `nodemon`.
5. Start the frontend using `npm run dev`.
6. Access the app at `http://localhost:3000`.
