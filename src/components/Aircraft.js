import { useContext } from 'react';
import FlightScheduleContext from '../store/flight-schedule-context'

function Aircraft(props) {
    const flightScheduleCtx = useContext(FlightScheduleContext);
    let utilization = 0;

    async function displayAircraftRotation() {
        await flightScheduleCtx.selectAircraft(props.ident);
    }

    function calculateUtilization() {
        let rotation = [...props.rotation];
        const utilizationReducer = (acc, curr) => (acc + (curr.arrivaltime - curr.departuretime));
        const timeScheduled = rotation.reduce(utilizationReducer, 0);
        const secondsPerDay = 86400;
        utilization = ((timeScheduled * 100) / secondsPerDay).toFixed(2);
    }

    if (props.rotation.length) {
        calculateUtilization();
    }

    return (
        <div className='aircraft' onClick={displayAircraftRotation}>
            <h4>{props.ident}</h4>
            <p>{utilization}%</p>
        </div>
    );
}

export default Aircraft;