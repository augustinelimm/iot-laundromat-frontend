import ProgressBar from "./ProgressBar";

export const WasherCard = ({ washer }) => {
  const {
    name,
    capacity,
    status,
    timeLeft,
    progress
  } = washer;

  const isAvailable = status === "AVAILABLE";
  const isOccupied = status === "OCCUPIED";
  const washerColor = isAvailable ? "#9bc14b" : isOccupied ? "#d4a017" : "#4a7c8c";
  const backgroundColor = isAvailable ? "bg-[#9bc14b]" : isOccupied ? "bg-[#d4a017]" : "bg-[#4a7c8c]";

  // SVG Washer Icon - tight viewBox crops exactly around the washer (x:18-122, y:18-162)
  const WasherIcon = () => (
    <svg width="140" height="180" viewBox="18 18 104 144" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Washer body */}
      <rect x="20" y="20" width="100" height="140" rx="10" fill={washerColor} stroke={washerColor} strokeWidth="2"/>
      
      {/* Control panel - top section */}
      <rect x="32" y="35" width="25" height="5" rx="2.5" fill="white" opacity="0.5"/>
      <rect x="65" y="35" width="12" height="5" rx="2.5" fill="white" opacity="0.5"/>
      <rect x="82" y="35" width="12" height="5" rx="2.5" fill="white" opacity="0.5"/>
      <rect x="99" y="35" width="12" height="5" rx="2.5" fill="white" opacity="0.5"/>
      
      {/* Door outer circle - white background */}
      <circle cx="70" cy="100" r="42" fill="#e8f0f5" stroke={washerColor} strokeWidth="3"/>
      
      {/* Door inner circle with spinning animation when in use */}
      <g className={!isAvailable ? 'animate-spin' : ''} style={{ transformOrigin: '70px 100px' }}>
        <circle cx="70" cy="100" r="32" fill="none" stroke={washerColor} strokeWidth="2.5" opacity="0.6"/>
        
        {/* Water wave effect */}
        <path d="M 48 100 Q 54 96 60 100 T 72 100 T 84 100 Q 90 96 92 100" stroke={washerColor} strokeWidth="2.5" fill="none" opacity="0.4"/>
      </g>
    </svg>
  );

  return (
    <div className="flex flex-col items-center py-8">
      {/* Washer Icon */}
      <div className="mb-4">
        <WasherIcon />
      </div>

      {/* Washer Name Badge */}
      <div className={`${backgroundColor} text-white px-8 py-2 rounded-lg mb-4 text-base font-medium`}>
        {name}
      </div>

      {/* Status Information */}
      <div className="text-center mb-4">
        <span className="font-bold">{status}</span>
      </div>
    </div>
  );
};