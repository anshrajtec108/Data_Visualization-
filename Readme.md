# Data Visualization Dashboard

## Description
This project is a data visualization dashboard built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The dashboard fetches data from a MongoDB database and provides interactive visualizations using Chart.js.

## Features
- **Interactive Visualizations**: Includes charts and graphs to visualize key data metrics.
- **Filters**: Various filters to customize the data displayed, including year, topics, sector, region, and more.
- **Responsive Design**: Works on both desktop and mobile devices.

## Important Variables Visualized
- Intensity
- Likelihood
- Relevance
- Year
- Country
- Topics
- Region
- City

## Filters Available
- End Year
- Topics
- Sector
- Region
- PEST
- Source
- SWOT
- Country
- City
- Any other controls or filters derived from the data

## Technologies Used
- **Frontend**: React.js, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS (or any CSS framework/library of your choice)
- **API Testing**: Postman (optional)

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Install server dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the `backend` directory with the following:
    

4. Start the server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

2. Start the React app:
    ```bash
    npm run dev
    ```