import { useState, useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoKey } from "react-icons/go";
import { FcCancel } from "react-icons/fc";
import { VscChromeClose } from 'react-icons/vsc';
import { HiDotsVertical } from 'react-icons/hi';
import { BiEditAlt } from 'react-icons/bi';
import Link from 'next/link';
import useClinicAdminStore from "@/store/clinicAdminStore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrimaryBtn from "@/components/base/button/hbi_btn";
import axios from "axios";
import { FaRegCircleCheck } from "react-icons/fa6";


const Action = ({ row }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSuspendAlertOpen, setIsSuspendAlertOpen] = useState(false);
  const [isActivAlertOpen, setIsActiveAlertOpen] = useState(false);
  const [password, setPassword] = useState('');

  const { updateUserStatus, updateUserPassword, clinicAdmin } = useClinicAdminStore((state) => ({
    updateUserStatus: state.updateUserStatus,
    updateUserPassword: state.updateUserPassword,
    clinicAdmin: state.clinicAdmin,
  }));

  const handleSuspendClick = useCallback(() => setIsSuspendAlertOpen(true), []);
  const handleActivateClick = useCallback(() => setIsActiveAlertOpen(true), []);
  const handlePasswordClick = useCallback(() => setIsAlertOpen(true), []);

  const handleSuspendCancel = useCallback(() => {
    setIsSuspendAlertOpen(false);
    setIsActiveAlertOpen(false);
  }, []);

  const handleCancel = useCallback(() => setIsAlertOpen(false), []);

  const handleStatusChangeConfirm = useCallback(async (status) => {
    try {
      await updateUserStatus(row?.id, status);
      setIsSuspendAlertOpen(false);
      setIsActiveAlertOpen(false);
    } catch (error) {
      toast.error(`Failed to change status: ${error.message}`);
    }
  }, [updateUserStatus, row?.id]);

  const handleConfirm = async (event) => {
    event.preventDefault();

    try {
      const res = await updateUserPassword(row?.id, password);
      if (res?.id && res?.attributes.username) {
        const passwordData = {
          fromUser: res?.attributes.username,
          useremail: res?.attributes.email,
          Password: password,
        };
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/password-send-email`, passwordData)
          .then(resp => {
            console.log(resp)
            toast.success(`Send Email: ${res?.attributes.email}`, { autoClose: 3000 });
          })
          .catch(error => console.log(error));
      }

    } catch (error) {
      console.log(error);
    }
  }


  const status = row?.attributes?.status;

  const menuItems = status === "Active" ? [
    { key: 'edit', icon: <BiEditAlt />, text: 'Edit', url: `/clinic-admin/${row.id}`, bgColor: '#3FC9C1', textColor: '#fff', fontSize: '16px' },
    { key: 'suspend', icon: <FcCancel />, text: 'Suspend', action: handleSuspendClick, bgColor: '#fff', textColor: 'red', fontSize: '16px' },
    { key: 'reset-password', icon: <GoKey />, text: 'Reset Password', action: handlePasswordClick, bgColor: '#fff', textColor: '#FFA800', fontSize: '16px' },
  ] : status === "Inactive" ? [
    { key: 'edit', icon: <BiEditAlt />, text: 'Edit', url: `/clinic-admin/${row.id}`, bgColor: '#3FC9C1', textColor: '#fff', fontSize: '16px' },
    { key: 'activate', icon: <FaRegCircleCheck />, text: 'Activate', action: handleActivateClick, bgColor: '#fff', textColor: '#8BC675', fontSize: '16px' },
    { key: 'reset-password', icon: <GoKey />, text: 'Reset Password', action: handlePasswordClick, bgColor: '#fff', textColor: '#FFA800', fontSize: '16px' },
  ] : [
    { key: 'edit', icon: <BiEditAlt />, text: 'Edit', url: `/clinic-admin/${row.id}`, bgColor: '#3FC9C1', textColor: '#fff', fontSize: '16px' },
    { key: 'activate', icon: <FaRegCircleCheck />, text: 'Activate', action: handleActivateClick, bgColor: '#fff', textColor: '#8BC675', fontSize: '16px' },

  ];

  return (
    <div>
      <DropdownMenu className='relative'>
        <DropdownMenuTrigger data-testid="action-dropdown-trigger" className='flex justify-end ml-auto'>
          <HiDotsVertical className="text-xl mr-2" />
        </DropdownMenuTrigger >
        <DropdownMenuContent data-testid="action-dropdown-menu" className="w-[180px] m-0 p-0 absolute right-4">
          {menuItems.map(item => (
            <DropdownMenuItem
              key={item.key}
              onClick={item.action}
              data-testid={`action-${item?.key}`}
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '10px',
                borderBottom: '1px solid #e0e0e0',
                fontSize: item.fontSize,
              }}
            >
              {item.url ? (
                <Link className="flex items-center w-full" href={item?.url}>
                  {item.icon}
                  <span className="ml-2">{item?.text}</span>
                </Link>
              ) : (
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item?.text}</span>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isActivAlertOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent data-testid="action-dropdown-menu" className="max-w-[410px]">
          <AlertDialogHeader>
            <div className="flex text-[24px] font-semibold justify-between">
              <AlertDialogTitle className="text-[24px] font-semibold my-1">Activate Account</AlertDialogTitle>
              <button onClick={handleSuspendCancel}><VscChromeClose /></button>
            </div>
            <AlertDialogDescription className="text-[18px] px-1 font-semibold text-[#1E3C72]">
              Are you sure you want to activate this Clinic Admin?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-between">
            <PrimaryBtn id='submit-button' data-testid="submit-button" onClick={() => handleStatusChangeConfirm('Active')} type='submit' width={130} color="white" name="Confirm" />
            <PrimaryBtn onClick={handleSuspendCancel} width={110} color='#3FC9C1' bgColor="#DFFFFD" name="Cancel" />
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isSuspendAlertOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent className="max-w-[410px]">
          <AlertDialogHeader>
            <div className="flex text-[24px] font-semibold justify-between">
              <AlertDialogTitle className="text-[24px] font-semibold my-1">Suspend Account</AlertDialogTitle>
              <button onClick={handleSuspendCancel}><VscChromeClose /></button>
            </div>
            <AlertDialogDescription className="text-[18px] px-1 font-semibold text-[#1E3C72]">
              Are you sure you want to suspend this Clinic Admin?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-between">
            <PrimaryBtn data-testid="suspendbutton" onClick={() => handleStatusChangeConfirm('Inactive')} type='submit' width={130} color="white" name="Confirm" />
            <PrimaryBtn onClick={handleSuspendCancel} width={110} color='#3FC9C1' bgColor="#DFFFFD" name="Cancel" />
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isAlertOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent className="max-w-[410px]">
          <form data-testid="reset-password-form" onSubmit={handleConfirm}>
            <AlertDialogHeader>
              <div className="flex text-[24px] items-center font-semibold justify-between">
                <AlertDialogTitle data-testid="reset-password" className="text-[24px] font-semibold my-1">Reset Password</AlertDialogTitle>
                <p className='hover:cursor-pointer items-center' onClick={handleCancel}><VscChromeClose /></p>
              </div>
              <AlertDialogDescription className="text-left">
                <label>Password</label>
                <input
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 w-full border rounded"
                  type="password"
                  placeholder="Reset Password"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex my-2 justify-between">
              <PrimaryBtn data-testid="submit-button" type='submit' width={130} color="white" name="Confirm" />
              <PrimaryBtn onClick={handleCancel} width={110} color='#3FC9C1' bgColor="#DFFFFD" name="Cancel" />
            </div>
          </form>

        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Action;