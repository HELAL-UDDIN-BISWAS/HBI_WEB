import EditClinic from "@/components/pageContainers/system-setup/edit-clinic/EditClinic";

const EditClinicPage = ({ params }) => {
	return (
		<div className="bg-[#F3F3F5] w-full">
			<EditClinic id={params.id}></EditClinic>
		</div>
	);
};

export default EditClinicPage;
