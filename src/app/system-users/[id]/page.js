import EditSystemUser from '@/components/pageContainers/system-users/edit-user';

const page = ({ params }) => {
	return (
		<div>
			<EditSystemUser id={params.id}></EditSystemUser>
		</div>
	);
};

export default page;
