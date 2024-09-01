import { LuPencilLine } from "react-icons/lu";
import { LuCircleSlash2 } from "react-icons/lu";
import { FaKey } from "react-icons/fa";
import { IoNotificationsOffOutline } from "react-icons/io5";
import Link from "next/link";

const Modal = () => {
  return (
    <div className=" fixed  inset-0  bg-opacity-30 backdrop-blur-sm text-white flex justify-center items-center ">
      <div className="shadow-lg">
        <Link href="/agents/editPartner">
          <div className="flex items-center gap-3 bg-[#3FC9C1] p-2 rounded-t-lg ">
            <LuPencilLine />
            <p>Edit</p>
          </div>
        </Link>
        <div className="flex items-center p-2 gap-3 bg-white text-[#E94C40] border-bottom pb-2">
          <LuCircleSlash2 />
          <p>Suspend</p>
        </div>
        <div className="flex items-center p-2 gap-3 bg-white text-[#FFA800] border-bottom pb-2">
          <FaKey />
          <p>Reset Password</p>
        </div>
        <div className="flex items-center p-2 gap-3 bg-white text-[#E94C40] rounded-b-lg">
          <IoNotificationsOffOutline />
          <p>Close Notify</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
