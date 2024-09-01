import { CalendarIcon } from "lucide-react";

const CustomDateInput = ({ value, onClick }) => (
    <button 
    type="button"
    className="bg-[#FAFAFA] text-[#222222] font-normal w-full rounded-lg  h-14 my-2 placeholder:pl-3 placeholder:font-normal text-[16px]"
    onClick={onClick}
  >
   <div className="flex justify-between mx-2">
   <span>{value}</span>
   <CalendarIcon />
   </div>

  </button>
  );

export default CustomDateInput;