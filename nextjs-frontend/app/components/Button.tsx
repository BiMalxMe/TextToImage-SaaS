type DarkButtonProps = {
    text: string;
    onClick?: () => void;
  };
  
  export default function DarkButton({ text, onClick }: DarkButtonProps) {
    return (
      <button
        onClick={onClick}
        className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
      >
        {text}
      </button>
    );
  }
  