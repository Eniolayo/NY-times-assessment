# NY Times Articles - Assessment

A modern web application for browsing and searching popular articles from The New York Times API.

## Features

- Browse most viewed articles from The New York Times over the past 7 days
- Search for articles by keyword
- View detailed article information
- Responsive design for all devices
- Server-side rendering for optimal performance
- High test coverage with unit and end-to-end tests

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Testing**: Jest, React Testing Library, Cypress
- **CI/CD**: GitHub Actions, Codecov
- **Code Quality**: ESLint, SonarQube
- **API**: The New York Times Most Popular API

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A New York Times API key (get one at [developer.nytimes.com](https://developer.nytimes.com/))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Eniolayo/assessment.git
   cd assessment
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your API key:

   ```env
   NYTIMES_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

### Unit Tests

Run Jest tests with:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

### End-to-End Tests (Cypress)

Run Cypress in interactive mode:

```bash
npm run cypress
```

Run Cypress in headless mode:

```bash
npm run cypress:headless
```

## Linting and Code Quality

To check for linting issues:

```bash
npm run lint
```

To run SonarQube analysis:

```bash
npm run sonar
```

## Building the Project

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Continuous Integration & Deployment (CI/CD)

This project uses GitHub Actions for CI/CD:

- **Linting, Testing & Coverage**: Runs on every push and pull request.
- **Code Coverage Report**: Uploaded to Codecov.
- **End-to-End Tests**: Cypress tests run in a headless environment.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add new feature"`).
4. Push to your fork (`git push origin feature-branch`).
5. Open a pull request.

---

### Author

Developed by [Ayodeji Ikujuni](https://github.com/Eniolayo).
