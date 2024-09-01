import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/material.css";
import HBIErrorText from "../base/text/hbi_error_text";

const HBI_PhoneInput = ({ control, placeholder, name, label, error }) => {
	console.log(error);
	return (
		<div className="phone-input-wrapper relative">
			<label
				className="text-sm"
				htmlFor={name}>
				{label}
			</label>
			<Controller
				name={name}
				rules={{
					required: true,
				}}
				control={control}
				render={({ field: { name, onBlur, onChange, ref, value } }) => (
					<PhoneInput
						value={value}
						// enableAreaCodes={true}
						specialLabel={""}
						inputClass="h-11 2xl:!h-12 !w-full focus:!border focus-visible:!ring-0 focus:!outline-none !bg-[#FAFAFA] border-none hover:!border-[#D0D2D5]"
						containerClass="!w-full rounded-lg border-none"
						// inputClass="!w-full !h-[50%] outline-none !focus:outline-none !focus:ring-0"
						country={"ng"}
						placeholder={placeholder}
						inputProps={{
							name,
							onBlur,
							ref,
							onChange,
						}}
					/>
				)}
			/>

			{error && <HBIErrorText text={`${label} field is required`} />}
		</div>
	);
};

export default HBI_PhoneInput;
