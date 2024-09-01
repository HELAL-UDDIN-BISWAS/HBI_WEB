const MemberPagination = ({ current, pageSize, total, setPage }) => (
	<div className="flex py-2 items-center justify-center">
		<button
			onClick={() => {
				if (current > 1) setPage(current - 1);
			}}
			className={`py-2 px-3 bg-white rounded-l-md shadow-md text-black ${current === 1 ? 'cursor-not-allowed' : ''}`}
			disabled={current === 1}>
			Prev
		</button>
		<p className="py-2 px-3 bg-[#3FC9C1] text-white">{current}</p>
		<button
			onClick={() => {
				if (current * pageSize < total) setPage(current + 1);
			}}
			className={`py-2 px-3 bg-white rounded-r-md shadow-md text-black ${current * pageSize >= total ? 'cursor-not-allowed' : ''}`}
			disabled={current * pageSize >= total}>
			Next
		</button>
	</div>
);

export default MemberPagination;
