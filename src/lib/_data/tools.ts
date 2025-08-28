
export interface Tool {
	href: string;
	name: string;
	description: string;
	label: string;
	// Is automatically set to true for external tools
	external?: boolean;
}

//==================================================================//

// List of external tools to include in the tools list
export const externalTools: Tool[] = [
	{
		name: "Image Editor",
		href: `https://mac-aron.github.io/png-rounded-corners/`,
		description: "Round the corners of images",
		label: "design"
	}
];

//==================================================================//

// Process a list of tools to set the external flag and sort them by name
function processToolList(tools: Tool[], external: boolean): Tool[] {
	return tools.map(tool => ({
		...tool,
		external: external
	})).sort((a, b) => a.name.localeCompare(b.name));
}

// Combine internal and external tools into a single list
export function modulesToTools(modules: Record<string, { item: Tool }>): Tool[] {
	return [
		...processToolList(Object.values(modules).map(m => m.item), false),
		...processToolList(externalTools, true)
	];
}