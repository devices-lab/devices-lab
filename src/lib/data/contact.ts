import { contact as contactData } from '$lib/_content/contact';

export interface Contact {
	address_0: string;
	address_1: string;
	address_2: string;
	address_3: string;
	email: string;
}

export const contact: Contact = contactData;
