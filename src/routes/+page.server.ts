import type { PageServerLoad, Actions } from './$types';
import fs from 'fs';
import path from 'path';
import { OMDB_API_KEY } from '$env/static/private';

export const load = (async () => {}) satisfies PageServerLoad;

export const actions = {
	searchmovie: async ({ request }) => {
		const fromForm = await request.formData();
		const searchString = fromForm.get('searchst');
		if (!searchString) {
			return { success: false, search: searchString };
		}

		const response = await fetch(
			'https://www.omdbapi.com/?apikey=' + OMDB_API_KEY + '&s=' + searchString
		);
		const data = await response.json();
		// console.log(data);

		if (data) {
			return { data, success: true, search: searchString };
		} else {
			return { success: false, search: searchString };
		}
	},
	savealbumimage: async ({ request }) => {
		const savealbum = await request.formData();
		const imageUrl = savealbum.get('posterUrl')?.toString();
		const localFilePath = path.join(process.cwd(), 'album.jpg');
		let saveMessage = '';
		if (imageUrl) {
			saveImage(imageUrl, localFilePath)
				.then(() => {
					saveMessage = 'Saved successfully!';
				})
				.catch((err) => {
					saveMessage = 'error: ' + err;
				});
		}
		return {saveimage : saveMessage};
	}
} satisfies Actions;

const saveImage = async (url: string, filepath: string) => {
	const response = await fetch(url);
	const buffer = Buffer.from(await response.arrayBuffer());
	fs.writeFileSync(filepath, buffer);
};
