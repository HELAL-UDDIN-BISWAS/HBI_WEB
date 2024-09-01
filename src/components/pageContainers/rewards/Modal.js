import PrimaryBtn from "@/components/base/button/hbi_btn";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import usePointStore from "@/store/pointStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { VscChromeClose } from "react-icons/vsc";
import { toast } from 'react-toastify';


const PointModal = ({ isAlertOpen, handleCancel, defaultValue, editMode = false, toggleModal }) => {
    const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            appointedAmount: defaultValue?.appointedAmount || null,
            earnedPoints: defaultValue?.earnedPoints || null,
        }
    });

    const {
        createPoint,
        updatePoint,
        loading: pointLoading,
        error: pointError,
    } = usePointStore((state) => ({
        loading: state.loading,
        error: state.error,
        createPoint: state.createPoint,
        updatePoint: state.updatePoint,
    }));

    const appointedAmount = watch("appointedAmount", defaultValue?.appointedAmount || 0);

    useEffect(() => {
        if (appointedAmount) {
            let points;
            if (appointedAmount.toString().length >= 3) {
                points = (appointedAmount * 0.1).toFixed(2);
            } else {
                points = (appointedAmount * 0.1).toString();
            }
            setValue("earnedPoints", points);
        }
    }, [appointedAmount, setValue]);


    const onSubmit = async (data) => {
        const rewardPointInput = {
            appointedAmount: data?.appointedAmount,
            earnedPoints: data?.earnedPoints
        };
        const updateRewardPoint = {
            id: defaultValue.id,
            data:{
                appointedAmount: data?.appointedAmount,
                earnedPoints: data?.earnedPoints
            }
        }

        try {
            if (editMode) {
                await updatePoint(updateRewardPoint)
            }
            else {
                await createPoint(rewardPointInput);
            }
            const message = editMode ? 'Point Updatet Successfully' : "Point Created Successfully"
            toast.success(message);
            reset({
                appointedAmount: 0,
                earnedPoints: 0
            });
            toggleModal()
        } catch (error) {
            toast.error(`Error: ${error.message}`, { autoClose: 5000 });
        }
    };


    return (
        <div>
            <AlertDialog open={isAlertOpen}>
                <AlertDialogContent className="max-w-[410px]">
                    <AlertDialogHeader>
                        <div className="flex justify-between items-center">
                            <AlertDialogTitle className="text-xl font-semibold my-1">Point Setup</AlertDialogTitle>
                            <button className="text-xl" onClick={handleCancel}><VscChromeClose /></button>
                        </div>
                    </AlertDialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <p className="text-xs font-semibold my-1 ml-0 text-left">Amount of $ spent</p>
                            <div className="flex w-full max-w-sm items-center">
                                <input
                                    className="w-full py-[7px] rounded-lg focus:outline-none focus:border-none focus:ring-[#3FC9C1] focus:bg-[#F2FFFE] pl-3 border-slate-100 border-[1px]"
                                    type="number"
                                    placeholder="Dollar"
                                    {...register("appointedAmount", { required: true })}
                                />
                                <button
                                    className='-ml-4 bg-slate-100 p-2 px-4'
                                    type="button"
                                    style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}
                                >
                                    Dollar
                                </button>
                            </div>
                            {errors.appointedAmount && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div className="my-4">
                            <p className="text-xs font-semibold my-1 ml-0 text-left">Number of points earned</p>
                            <div className="flex w-full max-w-sm items-center">
                                <input
                                    className="w-full py-[7px] rounded-lg focus:outline-none focus:border-none focus:ring-[#3FC9C1] focus:bg-[#F2FFFE] pl-3 border-slate-100 border-[1px]"
                                    type="number"
                                    placeholder="Point"
                                    {...register("earnedPoints", { required: true })}
                                    readOnly
                                />
                                <button
                                    className='-ml-4 bg-slate-100 p-2 px-4'
                                    type="button"
                                    style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}
                                >
                                    Point
                                </button>
                            </div>
                            {errors.earnedPoints && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div className="flex justify-between items-center">
                            <PrimaryBtn type='submit' width={160} color="white" name="Setup" />
                            <PrimaryBtn onClick={handleCancel} width={160} color='#3FC9C1' bgColor="#DFFFFD" name="Discard Changes" />
                        </div>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
export default PointModal;
