# Heater Targets Calculation

This script calculates heater targets based on schedules and timestamps.

## Prerequisites

- Node.js installed on your machine

## Installation

1. Clone the repository
2. Install the dependencies:
    ```bash
    npm install
    ```
## Usage

1. Provide the necessary input files:

- Create a `schedules.json` file in the `src/json` directory, containing the schedules data.
- Create a `times.json` file in the `src/json` directory, containing the timestamps data.

2. Run the script:
    ```bash
    npm start
    ```
3. The script will output the calculated heater targets based on the provided schedules and timestamps.

## Customization

- You can modify the `schedules.json` and `times.json` files to adjust the schedules and timestamps for the calculation.
- The script uses the `convertToTimeZone` function to convert the timestamps to the specified time zone. You can modify this function in the code to use a different time zone conversion method if needed.

## License

This project has no license
