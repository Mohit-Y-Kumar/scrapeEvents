import React from "react";

const EventCard = ({ event, onGetTickets }) => {
  return (
    <div className="flex flex-col justify-between bg-blue-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out p-6 border border-gray-200 w-full max-w-md mx-auto h-full">

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
        

        {event.date && (
          <p className="text-sm text-gray-500 mb-1">
            📅 <span className="font-medium">{event.date}</span>
          </p>
        )}

        {event.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">{event.description}</p>
        )}

        <div className="space-y-1 text-sm text-gray-600 mb-4">
          {event.location && (
            <p><span className="font-semibold ">📍 Location:</span> {event.location}</p>
          )}
          {event.category && (
            <p><span className="font-semibold">🎭 Category:</span> {event.category}</p>
          )}
          {event.paidStatus && (
            <p><span className="font-semibold">💰 Status:</span> {event.paidStatus}</p>
          )}
        </div>
      </div>

      <button
        onClick={onGetTickets}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
      >
        Get Tickets
      </button>
    </div>
  );
};

export default EventCard;
