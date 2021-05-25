import { useContext } from 'react';
import FlightScheduleContext from '../store/flight-schedule-context'

function Flight(props) {
    const flightScheduleCtx = useContext(FlightScheduleContext);

    async function addToAircraftRotation() {
        if (flightScheduleCtx.selectedAircraftIndex !== null) {
            if (props.isAddedToRotation) {
                const canRemoveFlight = isLastFlightInRotation();
                if (canRemoveFlight) {
                    await flightScheduleCtx.removeFlightFromRotation(props.id);
                    await flightScheduleCtx.addFlightToFlights({...props});
                }
            } else {
                await flightScheduleCtx.addFlightToRotation({...props});
                await flightScheduleCtx.removeFlightFromFlights(props.id);
            }
        }
    }

    function isLastFlightInRotation() {
        const rotation = flightScheduleCtx.aircraft[flightScheduleCtx.selectedAircraftIndex].rotation;
        return rotation[rotation.length - 1].id === props.id;
    }

    return (
        <div className='flight' onClick={addToAircraftRotation}>
            <h4>{props.id}</h4>
            <div>
                <p>{props.origin} {props.readable_departure} -> {props.destination} {props.readable_arrival}</p>
            </div>
        </div>
    );
}

export default Flight;