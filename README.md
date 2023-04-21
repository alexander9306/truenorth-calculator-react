# Frontend Calculator

This is the frontend application for the [Calculator app](https://github.com/alexander9306/truenorth-calculator-api), built with Next.js. It interacts with the backend API server to perform mathematical calculations and display the results in a user-friendly interface.

[Demo](https://vercel.com/alexander9306/back-end-calculator-react)

## Getting Started

To get started with the Calculator frontend, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies using npm by running `npm install` in the project root directory.
3. Set up the environment variables in a `.env` file at the root of the project. The following environment variables are required:

```diff
NEXT_PUBLIC_API_URL=<api_server_endpoint>      # API server endpoint
NEXTAUTH_URL=<domain_server>                   # Domain server
NEXTAUTH_SECRET=<secret_token>                 # Secret token
```

## Development

To run the Calculator frontend in development mode, use the following command:

```bash
npm run dev
```

This will start the development server and you can access the app in your browser at http://localhost:3000.

#### Note:

If you need to change the port of the app add the `-p ${PORT}` param

## About

The Calculator frontend is built using Next.js, a popular React framework for building server-rendered React applications. The app follows best practices for frontend development, including code organization, performance optimization, and responsive design.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
