import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const events = useLoaderData();

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  let result = [];
  const response = await fetch('http://localhost:8080/eventsccc');
  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.'};
    // throw { message: 'Could not fetch events.' };
    throw new Response(JSON.stringify({ message: 'Could not fetch events' }), {
      status: 500,
    });
  } else {
    const data = await response.json();
    result = data.events;
  }
  return result;
}
