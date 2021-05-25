import { createContext, useState, useCallback } from 'react';

const FlightScheduleContext = createContext({
    aircraft: [],
    flights: [],
    availableFlights: [],
    isAircraftSelected: false,
    selectedAircraftIndex: null
});

export function FlightScheduleProvider(props) {
    const [aircraft, setAircraft] = useState([]);
    const [flights, setFlights] = useState([]);
    const [availableFlights, setAvailableFlights] = useState([]);
    const [selectedAircraftIndex, setSelectedAircraftIndex] = useState(null);

    const fetchAircraftHandler = useCallback(async () => {
        const response = await fetch('https://infinite-dawn-93085.herokuapp.com/aircrafts');
        const result = await response.json();
        const transformedAircraft = result.data.map(craft => {
            craft.rotation = [];
            return craft;
        })
          
        return setAircraft(transformedAircraft);
    }, []);
    
    const fetchFlightsHandler = useCallback(async () => {
        const response = await fetch('https://infinite-dawn-93085.herokuapp.com/flights');
        const result = await response.json();
        const transformedFlights = result.data.map(flight => {
            flight.assignedToAircraft = false;
            flight.isAddedToRotation = false;
            return flight;
        })
            
        return setFlights(transformedFlights);
    }, []);

    async function selectAircraftHandler(aircraftId) {
        const aircraftIndex = aircraft.findIndex(craft => craft.ident === aircraftId);
        filterFlightsForRotationHandler(flights, aircraft, aircraftIndex);
        return setSelectedAircraftIndex(aircraftIndex);
    }

    function addFlightToRotationHandler(flight) {
        flight.isAddedToRotation = true;
        const newAircraft = [...aircraft];
        newAircraft[selectedAircraftIndex].rotation.push(flight);
        filterFlightsForRotationHandler(flights, newAircraft, selectedAircraftIndex);
        return setAircraft(newAircraft);
    }

    function removeFlightFromFlightsHandler(flightId) {
        const newFlights = [...flights];
        const filteredFlights = newFlights.filter(flight => flight.id !== flightId);
        return setFlights(filteredFlights);
    }

    function addFlightToFlightsHandler(flight) {
        flight.isAddedToRotation = false;
        const newFlights = [...flights];
        newFlights.push(flight);
        filterFlightsForRotationHandler(newFlights, aircraft, selectedAircraftIndex);
        return setFlights(newFlights);
    }

    function removeFlightFromRotationHandler(flightId) {
        const newAircraft = [...aircraft];
        newAircraft[selectedAircraftIndex].rotation = newAircraft[selectedAircraftIndex].rotation.filter(flight => flight.id !== flightId);
        filterFlightsForRotationHandler(flights, newAircraft, selectedAircraftIndex);
        return setAircraft(newAircraft);
    }

    function filterFlightsForRotationHandler(allFlights, allAircraft, currentAircraftIndex) {
        let updatedFlights = [...allFlights];
        let filteredFlights = updatedFlights;
        let selectedAircraftRotation = allAircraft[currentAircraftIndex].rotation;
        if (currentAircraftIndex !== null && selectedAircraftRotation.length) {
            const timeToMatch = selectedAircraftRotation[selectedAircraftRotation.length - 1].arrivaltime + 1200;
            const airportToMatch = selectedAircraftRotation[selectedAircraftRotation.length - 1].destination;
            filteredFlights = updatedFlights.filter(flight => {
                let matchesAirport = flight.origin === airportToMatch;
                let matchesTime = flight.departuretime >= timeToMatch && flight.arrivaltime < 86400;
                return matchesAirport && matchesTime;
            });
        }
        return setAvailableFlights(filteredFlights);
    }

    const context = {
        aircraft: aircraft,
        flights: flights,
        availableFlights: availableFlights,
        selectedAircraftIndex: selectedAircraftIndex,
        fetchAircraft: fetchAircraftHandler,
        fetchFlights: fetchFlightsHandler,
        selectAircraft: selectAircraftHandler,
        addFlightToRotation: addFlightToRotationHandler,
        removeFlightFromFlights: removeFlightFromFlightsHandler,
        addFlightToFlights: addFlightToFlightsHandler,
        removeFlightFromRotation: removeFlightFromRotationHandler,
        filterFlightsForRotation: filterFlightsForRotationHandler
    };

    return <FlightScheduleContext.Provider value={context}>
        {props.children}
    </FlightScheduleContext.Provider>
}

export default FlightScheduleContext;