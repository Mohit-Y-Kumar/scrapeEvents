import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./components/EventCard";
import EmailModal from "./components/EmailModal";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("API_BASE_URL", API_BASE_URL);

       const res = await axios.get(`${API_BASE_URL}/api/events`);
        console.log("Events data from api  : ", res.data);
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [API_BASE_URL]);

  const handleGetTickets = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEmailSubmit = async (email) => {
    try {
      await axios.post(`${API_BASE_URL}/api/subscribe`, {
        email,
        eventLink: selectedEvent.url,
      });
      closeModal();
      window.location.href = selectedEvent.url;
    } catch (error) {
      alert("Subscription failed, please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center bg-blue-100 text-blue-800 py-2 px-4 rounded-md inline-block">
        Sydney Events
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">

          {events.map((event, idx) => (
            <EventCard
              key={idx}
              event={event}
              onGetTickets={() => handleGetTickets(event)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500">No events found.</p>
      )}


      {isModalOpen && selectedEvent && (
        <EmailModal
          eventTitle={selectedEvent.title}
          onClose={closeModal}
          onSubmit={handleEmailSubmit}
        />
      )}
    </div>
  );
}

export default App;
