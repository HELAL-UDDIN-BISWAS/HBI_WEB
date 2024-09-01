import EditClinicAdmin from "../../../components/pageContainers/clinic-admin/editPage/edit-clinic-admin"

const page = async ({ params }) => {
    return (
        <div>
            <EditClinicAdmin id={params?.id}></EditClinicAdmin>
        </div>
    );
};

export default page;