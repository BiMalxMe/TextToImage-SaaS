interface InputProps {
    text: string;
    clicked: boolean;
  }
  
  export const Input = ({ text, clicked }: InputProps) => {
    return (
      <input
        type="text"
        placeholder={text}
        disabled={clicked} // Disables input if clicked is true
        className={`bg-gray-800 w-full text-white border border-gray-600 rounded-lg placeholder:text-center px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${
          clicked ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    );
  };
  