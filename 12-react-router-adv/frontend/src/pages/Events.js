import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const events = useLoaderData();

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  let result = [];
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    //...
  } else {
    const data = await response.json();
    result = data.events;
  }
  return result;
}
