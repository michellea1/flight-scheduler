In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `Things to note`

Decisions and assumptions made:

- utilized built in functionality like fetch and React Context API to minimize dependencies since it's such a small project
- assumed the aircraft could start anywhere that day since it's base was "EGGK" which didn't match up with any of the flight's airports
- assumed users should only be able to select flights that were within the parameters of departing from the aircrafts latest destination, allowing 20 minutes turnaround time, and being on the ground at midnight

Areas I would have focused on next with more time:

- highlighting the currently selected aircraft
- changing aircraft utilization percentage text color to reflect low/medium/high utilization
- overall UI updates to be more visually pleasing
- testing
