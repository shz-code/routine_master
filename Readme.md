# Routine Master

**Routine Master** is a Python-based application designed to help manage and optimize faculty routines for each semester. This project is specifically made for the `CSE department of IUBAT` to maintain and generate faculty routines efficiently.

## Features

- Create and manage faculty routines
- Track class schedules and availability
- Generate optimized routines for each semester
- User-friendly interface
- Frontend built with React, Redux, and Tailwind CSS for an interactive experience
- Backend powered by FastAPI for efficient performance

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shz_code/routine_master.git
   ```
2. Navigate to the project directory:
   ```bash
   cd routine_master
   ```

## Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start server:
   ```bash
   uvicorn src.main:app --reload
   ```

## Frontend Setup

1. Navigate to the client directory and install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Create .env file that has the server api url (give the backend root url here):

   ```bash
   cp .env.example .env
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```
4. Open your web browser and navigate to `http://localhost:5173` to access the frontend.
5. Follow the on-screen instructions to set up and manage faculty routines.

## Contact

For any questions or suggestions, please contact [web.shahidul.alam@gmail.com](mailto:web.shahidul.alam@gmail.com).
