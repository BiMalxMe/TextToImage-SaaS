type DarkButtonProps = {
    text: string;
    onClick?: () => void;
    disabled? :boolean
  };
  
  export default function 
  DarkButton({ text, onClick ,disabled}: DarkButtonProps) {
    return (
      <button
      disabled = {disabled}
        onClick={onClick}
        className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
      >
        {text}
      </button>
    );
  }
  