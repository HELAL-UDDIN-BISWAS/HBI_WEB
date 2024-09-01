import { cn } from '@/utils/cn';
import { TextField } from '@radix-ui/themes';

const InputText = ({
	type = 'text',
	className = '',
	placeholder = '',
	defaultValue = '',
	disabled = false,
	...props
}) => {
	return (
		<div>
			<div className="relative mt-1 rounded-md border-0 p-[1px]">
				<div className={'bg-white rounded-md'}>
					<TextField.Root
						color={'indigo'}
						type={type}
						className={cn('font-regular h-[40px]', className)}
						placeholder={placeholder}
						defaultValue={defaultValue || ''}
						size="3"
						disabled={disabled}
						{...props}></TextField.Root>
				</div>
			</div>
		</div>
	);
};

export default InputText;
