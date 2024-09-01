import EditPatients from "@/components/pageContainers/patients/editpatients";

const EditPatientsPage = ({ params }) => {
	return (
		<div className="bg-[#F3F3F5] w-full">
			<EditPatients id={params.id}></EditPatients>
		</div>
	);
};

export default EditPatientsPage;
