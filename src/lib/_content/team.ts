import type { TeamMember } from '$lib/data/about';

//────────────────────────────────────────────────────────────────//

/**
 * List of team members.
 *  - name: 		Full name of the team member
 *  - role: 		Role of the team member
 *  - image: 		URL of the team member's image, or image imported using `import '$lib/assets/img/abc.jpg?enhanced'`
 *  - imageAdj: 	Positioning of the image (e.g., object-top), can be any css class
 *  - order: 		Only used to sort the team members according to their role, can be: '0_professor' | '1_senior' | '2_researcher' | '3_phd' | '4_master' | '5_bachelor' | '6_alumni'.
 *  - href: 		URL to the team member's profile
 *  - sites: 		List of external links related to the team member, needs: {href, title, icon}
 */
export const team: TeamMember[] = [
	{
		name: 'Mannu Lambrichts',
		role: 'Senior Research Associate',
		image: 'https://www.lancaster.ac.uk/images/people/21023.jpg',
		imageAdj: 'object-top',
		order: '1_senior',
		href: 'https://www.lancaster.ac.uk/sci-tech/about-us/people/mannu-lambrichts',
		sites: []
	},
	{
		name: 'Steve Hodges',
		role: 'Professor',
		image: 'https://www.lancaster.ac.uk/images/people/18496.jpg',
		imageAdj: 'object-top',
		order: '0_professor',
		href: 'https://www.lancaster.ac.uk/sci-tech/about-us/people/steve-hodges',
		sites: []
	},
	{
		name: 'Aron Eggens',
		role: 'PhD student',
		image: 'https://www.lancaster.ac.uk/images/people/17978.jpg',
		imageAdj: 'object-top',
		order: '3_phd',
		href: 'https://www.lancaster.ac.uk/sci-tech/about-us/people/aron-eggens',
		sites: []
	},
	{
		name: 'James Hahn',
		role: 'PhD student',
		image: 'https://www.lancaster.ac.uk/images/people/17264.jpg',
		imageAdj: 'object-top',
		order: '3_phd',
		href: 'https://www.lancaster.ac.uk/sci-tech/about-us/people/james-hahn',
		sites: []
	},
	{
		name: 'Kier Palin',
		role: 'PhD student',
		image: 'https://www.lancaster.ac.uk/images/people/20535.jpg',
		imageAdj: 'object-top',
		order: '3_phd',
		href: 'http://lancaster.ac.uk/sci-tech/about-us/people/kier-palin',
		sites: []
	},
	{
		name: 'Joe Finney',
		role: 'Professor',
		image: 'https://www.lancaster.ac.uk/images/people/253.jpg',
		imageAdj: 'object-top',
		order: '0_professor',
		href: 'https://www.lancaster.ac.uk/sci-tech/about-us/people/joe-finney',
		sites: []
	},
	{
		name: 'Kobi Hartley',
		role: 'Associate Lecturer',
		image: 'https://www.lancaster.ac.uk/images/people/14267.jpg',
		imageAdj: 'object-top',
		order: '2_researcher',
		href: 'https://www.lancaster.ac.uk/scc/about-us/people/kobi-hartley',
		sites: []
	},
	{
		name: 'Lorraine Underwood',
		role: 'Research Associate',
		image: 'https://www.lancaster.ac.uk/images/people/5977.jpg',
		imageAdj: 'object-top',
		order: '2_researcher',
		href: 'https://www.lancaster.ac.uk/scc/about-us/people/lorraine-underwood',
		sites: []
	},
	{
		name: 'Charly Olivier',
		role: 'Researcher',
		image: 'https://www.lancaster.ac.uk/images/people/21171.jpg',
		imageAdj: 'object-top',
		order: '4_master',
		href: 'https://www.lancaster.ac.uk/sci-tech/about-us/people/charly-olivier',
		sites: []
	},
	{
		name: 'Zaid Alhourani',
		role: 'Researcher',
		image: 'https://www.lancaster.ac.uk/images/people/18825.jpg',
		imageAdj: 'object-top',
		order: '4_master',
		href: 'https://www.lancaster.ac.uk/sci-tech/about-us/people/zaid-alhourani2',
		sites: []
	},
	{
		name: 'Thomas Ball',
		role: 'Honorary Professor',
		image: 'https://www.lancaster.ac.uk/images/people/21085.jpg',
		imageAdj: 'object-top',
		order: '0_professor',
		href: 'https://www.lancaster.ac.uk/scc/about-us/people/thomas-ball2',
		sites: []
	},
	{
		name: 'Matthew Oppenheim',
		role: 'Honorary Researcher',
		image: 'https://www.lancaster.ac.uk/images/people/1094.jpg',
		imageAdj: 'object-top',
		order: '2_researcher',
		href: 'https://www.lancaster.ac.uk/scc/about-us/people/matthew-oppenheim',
		sites: []
	},
	{
		name: 'Elisa Rubegni',
		role: 'Senior Lecturer',
		image: 'https://www.lancaster.ac.uk/images/people/12764.jpg',
		imageAdj: 'object-top',
		order: '1_senior',
		href: 'https://www.lancaster.ac.uk/lira/people/elisa-rubegni',
		sites: []
	},
	{
		name: 'Andrew Scott',
		role: 'Senior Lecturer',
		image: 'https://www.lancaster.ac.uk/images/people/3607.jpg',
		imageAdj: 'object-top',
		order: '1_senior',
		href: 'https://www.lancaster.ac.uk/scc/about-us/people/andrew-scott',
		sites: []
	},
];

//────────────────────────────────────────────────────────────────//