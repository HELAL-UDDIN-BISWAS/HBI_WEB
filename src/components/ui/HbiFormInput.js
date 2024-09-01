import HBIErrorText from "../base/text/hbi_error_text";

const HbiFormInput = ({
	label,
	placeholder,
	required,
	type,
	register,
	name,
	error,
	onchange,
}) => {
	return (
		<div className="flex-col w-full flex text-black">
			<label className="text-sm">
				{label} {required && "*"}
			</label>

			<input
				{...register(name, { ...(required && { required: true }) })}
				className="outline-none my-1 py-3 bg-[#FAFAFA] px-3 border-none rounded-lg"
				type={type}
				placeholder={placeholder}
				onChange={onchange}
			/>
			{error && <HBIErrorText text={`${label} is requred`} />}
		</div>
	);
};

export default HbiFormInput;
