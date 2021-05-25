import { useContext, useEffect } from 'react';
import FlightScheduleContext from '../store/flight-schedule-context'

function Timeline(props) {
    const flightScheduleCtx = useContext(FlightScheduleContext);
    const flightRotation = flightScheduleCtx.aircraft[props.aircraftId].rotation;
    const timelineBlocks = [];
    const secondsPerDay = 86400;

    function createTimeline() {
        if (flightRotation.length) {
            flightRotation.forEach((flight, index) => {
                let width = '100%';
                let color = '#d3d3d3';
        
                //idle time
                if (index === 0) {
                    //idle time before first flight
                    width = calculateWidth(0, flight.departuretime);
                } else {
                    //idle time before subsequent flights
                    let startTime = (flightRotation[index - 1].arrivaltime) + 1200;
                    width = calculateWidth(startTime, flight.departuretime);
                }
                timelineBlocks.push({ width: width, color: color});
        
                //scheduled time
                width = calculateWidth(flight.departuretime, flight.arrivaltime);
                color = '#A9C9A4';
                timelineBlocks.push({ width: width, color: color});
        
                //turnaround time
                width = calculateWidth(0, 1200);
                color = '#7A378B';
                timelineBlocks.push({ width: width, color: color});
        
                //final idle time
                if (index === flightRotation.length - 1) {
                    width = calculateWidth(flight.arrivaltime, secondsPerDay);
                    color = '#d3d3d3';
                    timelineBlocks.push({ width: width, color: color});
                }
            });
        } else {
            timelineBlocks.push({ width: '100%', color: '#d3d3d3'});
        }
    }

    function calculateWidth(start, end) {
        let width = (((end - start) * 100) / secondsPerDay) + '%';
        return width;
    }
    
    createTimeline();

    return (
        <div className='timeline'>
            <div className='timeline-header'>
                <p>Rotation Timeline</p>
                <div className='timeline-ticks'>
                    <p>00:00</p>
                    <p>06:00</p>
                    <p>12:00</p>
                    <p>18:00</p>
                    <p>24:00</p>
                </div>
            </div>
            <div className='timeline-bar'>
                {timelineBlocks.map((block, index) => 
                    <div key={index} className='timeline-block' style={{width : block.width, backgroundColor : block.color}}></div>
                )}
            </div>
            <div className='timeline-key'>
                <span>
                    <div className='timeline-key-color' style={{backgroundColor : '#d3d3d3'}}></div><p>Idle</p>
                </span>
                <span>
                    <div className='timeline-key-color' style={{backgroundColor : '#A9C9A4'}}></div><p>Scheduled</p>
                </span>
                <span>
                    <div className='timeline-key-color' style={{backgroundColor : '#7A378B'}}></div><p>Turnaround</p>
                </span>
            </div>
        </div>
    );
}

export default Timeline;