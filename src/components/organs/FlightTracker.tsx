import React, { useState } from 'react';
import { AirplaneInFlight, MapTrifold, Wallet } from '@phosphor-icons/react';
import { Text } from '../atoms/Text';
import { List } from '../atoms/List';
import { FlightTrackerTexts } from '../particles/DataLists';

const FlightTracker = () => {
  const [flightCode, setFlightCode] = useState('');
  const [flightStatus, setFlightStatus] = useState(null);

  const API_KEY = '395c953bdbf178c011a7209f2e886d11';
  const API_URL = `http://api.aviationstack.com/v1/flights`;

  const trackFlight = async () => {
    try {
      const response = await fetch(`${API_URL}?access_key=${API_KEY}&flight_icao=${flightCode}`);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const flight = data.data[0];
        const departureTime = new Date(flight.departure.estimated);
        const arrivalTime = new Date(flight.arrival.estimated);

        setFlightStatus({
          flightNumber: `${flight.flight.iata} (${flight.airline.iata})`,
          flightStatus: flight.flight_status,
          departureTime: departureTime.toLocaleString(),
          arrivalTime: arrivalTime.toLocaleString(),
          departureAirport: flight.departure.airport,
          arrivalAirport: flight.arrival.airport,
          airlineName: flight.airline.name,
        });
      } else {
        setFlightStatus('Flight not found.');
      }
    } catch (error) {
      console.error(error);
      setFlightStatus('An error occurred while fetching flight information.');
    }
  };

  const renderIcons = (element: number) => {
    switch (element) {
      case 0:
        return <MapTrifold size={15} color="currentColor" weight="fill" />;
      case 1:
        return <Wallet size={15} color="currentColor" weight="fill" />;
      case 2:
        return <AirplaneInFlight size={15} color="currentColor" weight="fill" />;
      default:
        return '';
    }
  };

  return (
    <section className="w-full h-auto flex flex-col items-start justify-center relative lg:px-24 md:px-10 px-6 my-28 gap-5">
      <Text as="p" className="font-light text-base text-color3/80 tracking-widest">
        {FlightTrackerTexts.firstText}
      </Text>
      <main className="w-full grid md:grid-cols-2 lg:gap-6 gap-12 md:gap-5">
        {/* Text and Steps Container */}
        <div className="w-full flex flex-col gap-6 order-2 md:order-1">
          <Text as="h1" className="lg:text-5xl md:text-3xl text-4xl text-color3 font-medium">
            {FlightTrackerTexts.secondText}
          </Text>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Flight Number"
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={flightCode}
              onChange={(e) => setFlightCode(e.target.value)}
            />
            <button
              className="py-2 px-6 bg-color1 text-white rounded-md focus:outline-none hover:bg-color1-dark"
              onClick={trackFlight}
            >
              Track
            </button>
          </div>
          <div className="text-base font-medium text-color3 mt-3">
            {flightStatus && (
              <>
                <p>{flightStatus.flightNumber}</p>
                <p>Departure: {flightStatus.departureTime}</p>
                <p>Arrival: {flightStatus.arrivalTime}</p>
                <p>Departure Airport: {flightStatus.departureAirport}</p>
                <p>Arrival Airport: {flightStatus.arrivalAirport}</p>
                <p>Airline: {flightStatus.airlineName}</p>
                <p>Status: {flightStatus.flightStatus}</p>
              </>
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export default FlightTracker;
