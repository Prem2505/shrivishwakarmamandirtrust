import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { dakor } from "../../assets";
import style from "../../style";

const EventGallery = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/events/cli"
        );
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="text-amber-400 animate-spin">
          <ImSpinner9 size={50} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="relative mb-4 overflow-hidden">
        <img
          src={dakor}
          alt="background image"
          className="w-full h-24 object-cover rounded-xl filter blur-sm"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Events</h1>
          {/* <p className="text-lg font-medium">Experience the divine</p> */}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-amber-200 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {events.map((event) => (
            <div key={event.event_id} className="grid gap-4">
              <div className={`max-w-sm rounded ${style.colors.navbarbg} overflow-hidden shadow-lg`}>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src={event.event_image}
                  alt={event.event_title}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {event.event_title}
                  </div>
                  <p className="text-gray-700 text-base">
                    {event.event_description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventGallery;
