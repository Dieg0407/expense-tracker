# Expense Tracker Dashboard

A modern web application for tracking personal and business expenses with support for multiple currencies and fixed monthly expenses.

## Features

- Track expenses in both Soles (PEN) and Dollars (USD)
- Create and manage fixed monthly expenses
- Interactive charts and graphs for expense analysis
- Monthly expense evolution tracking
- Secure authentication and authorization

## Project Structure

```
expense-tracker/
├── frontend/           # React SPA
├── backend/           # Spring Boot API
└── auth-service/      # Spring Authorization Server
```

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Chart.js
- React Query
- React Router

### Backend
- Java 21
- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL
- Spring Security

### Authentication Service
- Spring Authorization Server
- OAuth2/OIDC
- JWT

## Getting Started

### Prerequisites
- Node.js 18+
- Java 21+
- PostgreSQL 15+
- Maven 3.8+

### Development Setup

1. Clone the repository
2. Start the authentication service:
   ```bash
   cd auth-service
   ./mvnw spring-boot:run
   ```

3. Start the backend service:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

4. Start the frontend development server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL
- `VITE_AUTH_URL`: Authentication service URL

### Backend
- `SPRING_DATASOURCE_URL`: PostgreSQL connection URL
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password
- `JWT_SECRET`: JWT signing key

### Auth Service
- `JWT_SECRET`: JWT signing key
- `SPRING_DATASOURCE_URL`: PostgreSQL connection URL
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 