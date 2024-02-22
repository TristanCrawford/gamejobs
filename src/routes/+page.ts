export const prerender = true

import * as XLSX from 'xlsx';
import { browser } from '$app/environment';

type Listing = {
	url: string;
	company: string;
	role: string;
	location: string;
	positionCount: number;
	lastUpdate: Date;
};

const sheetVersion = 'v13.1 - 021024';

const getListings = async (event) => {
	if (browser) {
		const cachedListings = localStorage.getItem(sheetVersion);
		if (cachedListings !== null) {
			return JSON.parse(cachedListings);
		}
	}

	// Not the best way of retrieving this data, but it works for now...
	const file = await (await event.fetch('sheet.xlsx')).arrayBuffer();
	const workbook = XLSX.read(file, { cellDates: true });
	const worksheet = workbook.Sheets[sheetVersion];
	const raw_data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

	let listings: Listing[] = [];

	raw_data.forEach((r) => {
		// There's definitely a better way to do this lol
		if (r.length != 53) return;

		const listing: Listing = {
			url: r[6],
			company: r[1],
			role: 'Unknown',
			location: r[30],
			positionCount: r[7],
			lastUpdate: new Date(r[3])
		};

		listings.push(listing);
	});

	if (browser) {
		localStorage.setItem(sheetVersion, JSON.stringify(listings));
	}

	return listings;
};

export async function load(event) {
	return {
		listings: getListings(event)
	};
}
