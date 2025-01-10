# Portfolio Managment Project - Frontend

This repository contains the source code for a React frontend application designed to display investment portfolio data, including detailed optimization results, risk levels, allocations, and more.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Components Overview](#components-overview)
- [License](#license)

## Features

- Displays investment optimization results with risk levels, allocations, and expected returns.
- Responsive design using Chakra UI.
- Modular and reusable React components.
- Integration with a backend API for dynamic data fetching.

## Tech Stack

- **Frontend Framework**: React
- **Language**: TypeScript
- **UI Library**: Chakra UI
- **Routing**: TanStack Router
- **State Management**: React hooks

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **View Investment Results**: Displays investment portfolio details like risk levels and allocations.
- **Interact with Allocations**: View allocations in a tabular format with tickers and percentages.
- **Connect to API**: Fetch real-time data from the backend for optimized investment insights.

## File Structure

```plaintext
src/
├── components/        # Reusable React components
│   ├── FinalReturnDisplay.tsx
│   ├── AllocationDisplay.tsx
├── client/            # API client definitions
├── types/             # TypeScript types and interfaces
├── styles/            # Global styles and theme configuration
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
```

## Components Overview

### `FinalReturnDisplay`

- Displays investment optimization results, including risk levels, expected returns, and value-at-risk data.
- Uses a grid layout for structured presentation.

### `AllocationDisplay`

- Shows allocation data in a table format.
- Displays ticker names and allocation percentages dynamically.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
