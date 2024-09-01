import EditMember from '@/components/pageContainers/members/edit-member/EditMember';

const EditMemberPage = ({ params }) => {
	return (
		<div>
			<EditMember id={params.id} />
		</div>
	);
};

export default EditMemberPage;
