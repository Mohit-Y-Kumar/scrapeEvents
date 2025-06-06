import React, { useState } from "react";

const EmailModal = ({ eventTitle, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-blend-hue rounded-2xl p-6 max-w-md w-full shadow-lg border-2 border-blue-900 ">
        <h2 className="text-xl font-semibold mb-4">
          Enter your email for <br />
          <span className="font-bold">{eventTitle}</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email"
            className="w-full border p-2 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 underline text-gray-600 w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmailModal;
