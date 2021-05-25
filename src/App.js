import { useEffect, useContext } from 'react'
import Aircraft from './components/Aircraft'
import Flight from './components/Flight'
import Header from './components/Header'
import Timeline from './components/Timeline'
import FlightScheduleContext from './store/flight-schedule-context'

function App() {
  const flightScheduleCtx = useContext(FlightScheduleContext);
  const aircraft = flightScheduleCtx.aircraft;
  const selectedAircraftIndex = flightScheduleCtx.selectedAircraftIndex;
  const availableFlightsForRotations = flightScheduleCtx.availableFlights;

  useEffect(() => {
    flightScheduleCtx.fetchAircraft();
    flightScheduleCtx.fetchFlights();
  }, [])

  return (
    <div>
      <Header />
      <div className='scheduling-panel'>
        <div className='aircraft-column'>
          <h3>Available Aircraft</h3>
          <p>Select an aircraft to schedule it's flight rotation.</p>
          <hr></hr>
          <ul>
            {aircraft.map(craft => <li key={craft.ident}>
              <Aircraft {...craft} />
            </li>)}
          </ul>
        </div>
        <div className='rotation-column'>
          <h3>Aircraft Flight Rotation</h3>
          <p>Select a flight to remove it from the flight rotation. Flights must be removed bottom to top.</p>
          <hr></hr>
          <ul>
            {(selectedAircraftIndex !== null && aircraft[selectedAircraftIndex].rotation.length === 0)
              ? <p className='empty-state'>This aircraft has no flights today yet. Assign flights via the flights panel.</p>
              : null
            }
            {(selectedAircraftIndex !== null && aircraft[selectedAircraftIndex].rotation.length !== 0)
              ? aircraft[selectedAircraftIndex].rotation.map(flight => <li key={flight.id}>
                  <Flight {...flight}/>
                </li>)
              : null
            }
          </ul>
          {(selectedAircraftIndex !== null)
            ? <Timeline aircraftId={selectedAircraftIndex}/>
            : null
          }
        </div>
        <div className='flights-column'>
          <h3>Available Flights</h3>
          <p>Select a flight to add it to the flight rotation.</p>
          <hr></hr>
          <ul>
            {availableFlightsForRotations.sort((a, b) => a.id > b.id ? 1 : -1).map(flight => <li key={flight.id}><Flight {...flight}/></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
