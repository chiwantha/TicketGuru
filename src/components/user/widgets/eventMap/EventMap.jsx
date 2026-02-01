const EventMap = ({ postalCode }) => {
  if (!postalCode) return null;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    postalCode,
  )}&output=embed`;

  return (
    <div className="w-full h-75 rounded-xl overflow-hidden border border-gray-300 shadow-md">
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default EventMap;
