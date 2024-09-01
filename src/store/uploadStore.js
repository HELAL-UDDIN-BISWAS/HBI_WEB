import { create } from 'zustand';
const UPLOAD_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/upload`;
const useUploadStore = create((set, get) => ({
	image: null,
	loading: false,
	error: null,
	fileId: null,
	uploadImage: async (fileInput) => {
		set({ loading: true, error: null });
		try {
			const form = new FormData();
			form.append('files', fileInput);

			const response = await fetch(UPLOAD_URL, {
				method: 'POST',
				headers: {},
				body: form,
			});

			const responseData = await response?.json();

			const fileId = responseData[0]?.id;

			set({ image: responseData[0].url, fileId: fileId, loading: false });
		} catch (error) {
			console.log(error);
			set({ error: error.message, loading: false });
		}
	},
	deleteImage: async () => {
		set({ loading: true, error: null });
		const { fileId } = get();
		if (!fileId) {
			console.error('No image fileId found.');
			return;
		}
		try {
			const response = await fetch(`${UPLOAD_URL}/files/${fileId}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Failed to delete image.');
			}

			set({ image: null, fileId: null, loading: false });
		} catch (error) {
			console.error('Error deleting image:', error);
			set({ error: error.message });
		}
	},

	resetImage: () => set({ image: null }),
}));

export default useUploadStore;
