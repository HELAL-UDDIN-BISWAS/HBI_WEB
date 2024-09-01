import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../../../../../components/ui/pagination/index';

const CustomPagination = ({ current, pageSize, total, onChange }) => {
	const pageCount = Math.ceil(total / pageSize);
	const handlePageChange = (page) => {
		onChange(page, pageSize);
	};

	const startEntry = (current - 1) * pageSize + 1;
	const endEntry = Math.min(current * pageSize, total);

	return (
		<div className="w-full">
			<div className="text-sm mt-4">
				Showing {endEntry} of {total} entries
			</div>
			<Pagination>
				<PaginationContent>
					<PaginationPrevious
						onClick={() => handlePageChange(current - 1)}
						className={
							current === 1
								? 'bg-gray-200 text-gray-400 cursor-not-allowed'
								: 'bg-white text-black cursor-pointer'
						}
						disabled={current === 1}>
						Prev
					</PaginationPrevious>

					{Array.from({ length: pageCount }, (_, index) => (
						<PaginationItem key={index}>
							<PaginationLink
								isActive={index + 1 === current}
								onClick={() => handlePageChange(index + 1)}>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationNext
						onClick={() => handlePageChange(current + 1)}
						className={
							current === pageCount
								? 'bg-gray-200 text-gray-400 cursor-not-allowed'
								: 'bg-white text-black cursor-pointer'
						}
						disabled={current === pageCount}>
						Next
					</PaginationNext>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default CustomPagination;
