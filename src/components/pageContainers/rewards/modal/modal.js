import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dropdown } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { BiEditAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import PrimaryBtn from "@/components/base/button/hbi_btn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRewardsStore from "@/store/rewardstore";

const Action = ({ row }) => {
  const [isOpenEditBox, setIsOpenEditBox] = useState(false);
  const [points, setPoints] = useState(row?.attributes.points);
  const { updateRewardPoints } = useRewardsStore();
  const handleCancel = () => {
    setIsOpenEditBox(false);
  };

  const handleConfirm = async () => {
    try {
      if (points !== row?.attributes.points) {
        if (points > 0) {
          const response = await updateRewardPoints({
            id: row?.id,
            points: parseInt(points),
          });
          if (response?.updateReward?.data?.id) {
            setIsOpenEditBox(false);
            setPoints(null);
          }
        } else {
          toast.error("Points should be greater than 0");
        }
      } else {
        toast.error("You need to change points for update the points");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to edit points ${error?.message}`);
    }
  };
  return (
    <div>
      <Dropdown className='flex justify-end'>
        <Dropdown.Toggle
          className='after:hidden text-[#674554]'
          variant='link'
          id='dropdown-basic'>
          <HiDotsVertical className='text-xl' />
        </Dropdown.Toggle>

        <Dropdown.Menu className='m-0 p-0'>
          <Dropdown.Item
            style={{
              backgroundColor: "#3FC9C1",
              fontSize: "14px",
              color: " #fff",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              cursor: "pointer",
              padding: "10px",
              borderRadius: "8px", // Add border bottom except for the last item
            }}
            onClick={() => setIsOpenEditBox(true)}>
            <BiEditAlt /> <span>Edit</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <AlertDialog open={isOpenEditBox}>
        <AlertDialogTrigger />
        <AlertDialogContent className='max-w-[410px]'>
          <AlertDialogHeader>
            <div className='flex text-[24px] font-semibold justify-between'>
              <AlertDialogTitle className='text-[24px] font-semibold my-1'>
                Edit Point
              </AlertDialogTitle>
              <button className='' onClick={handleCancel}>
                <VscChromeClose />
              </button>
            </div>
            <AlertDialogDescription className='text-[18px] px-1 font-semibold text-[#344054] mt-[20px]'>
              <div className='' style={{ textAlign: "left" }}>
                <label className='font-semibold text-sm text-left '>
                  Number of points
                </label>
                <input
                  type='number'
                  defaultValue={row?.attributes.points || 0}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder='Enter the points'
                  className='w-full p-[12px] outline-none border-gray border rounded-md mt-[4px]'
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='flex justify-between'>
            <PrimaryBtn
              onClick={handleConfirm}
              type='submit'
              width={173}
              fontSize={16}
              color='white'
              name='Save Changes'></PrimaryBtn>
            <PrimaryBtn
              onClick={handleCancel}
              width={173}
              fontSize={16}
              color='#3FC9C1'
              bgColor='#DFFFFD'
              name='Discard Changes'></PrimaryBtn>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Action;
