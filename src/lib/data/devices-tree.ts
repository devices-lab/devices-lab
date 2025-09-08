
// src/lib/devices-tree.ts
import type { ItemType, FamilyType } from '$lib/data/item';

/**
 * Folder layout (example)
 * /src/lib/_content/devices/
 *   familyA/
 *     family.ts            // exports: family: FamilyType
 *     device-1.ts          // exports: item: ItemType
 *     subFamily/
 *       family.ts
 *       device-2.ts
 *   device-root.ts         // allowed: devices directly under root
 */

const BASE = '/src/lib/_content/devices'; // must match the glob prefix below

// Grab all device modules that export `item`
const deviceMap = import.meta.glob('/src/lib/_content/devices/**/*.ts', {
	eager: true,
	import: 'item'
}) as Record<string, ItemType>;

// Grab all families (standardise on filename `family.ts`)
const familyMap = import.meta.glob('/src/lib/_content/devices/**/family.ts', {
	eager: true,
	import: 'family'
}) as Record<string, FamilyType>;

/** Tree node shapes */
export type DeviceNode = {
	kind: 'device';
	/** Directory relative to BASE, e.g. "", "familyA", "familyA/subFamily" */
	dir: string;
	/** File path (absolute-ish Vite key) */
	file: string;
	item: ItemType;
};

export type FamilyNode = {
	kind: 'family';
	/** Directory relative to BASE ("" for root) */
	dir: string;
	/** Optional metadata from family.ts */
	family?: FamilyType;
	children: Array<FamilyNode | DeviceNode>;
};

export type DevicesTree = FamilyNode;

/** Also export a quick lookup by directory if useful elsewhere */
export const familiesByDir: Record<string, FamilyNode> = {};

/** Build once at module init */
export const devicesTree: DevicesTree = buildDevicesTree();



function buildDevicesTree(): DevicesTree {

	const root: FamilyNode = { kind: 'family', dir: '', children: [] };
	familiesByDir[''] = root;

	// Ensure a family node exists for a given directory (and link it to its parent)
	const ensureFamily = (dir: string): FamilyNode => {
		const existing = familiesByDir[dir];
		if (existing) return existing;

		const parentDir = parentOf(dir);
		const parent = ensureFamily(parentDir);

		const node: FamilyNode = { kind: 'family', dir, children: [] };
		familiesByDir[dir] = node;
		parent.children.push(node);
		return node;
	};

	// 1) Create family nodes and attach their metadata
	for (const [file, family] of Object.entries(familyMap)) {
		const dir = relDirOfFile(file);
		const node = ensureFamily(dir);
		node.family = family;
	}

	// 2) Attach devices under their containing directory (family)
	for (const [file, item] of Object.entries(deviceMap)) {
		const dir = relDirOfFile(file);
		const fam = ensureFamily(dir);
		const dev: DeviceNode = { kind: 'device', dir, file, item };
		fam.children.push(dev);
	}

	// 3) Optional: stable ordering — families first, then devices (by name/title if present)
	sortTree(root);

	return root;
}

/** ----- helpers ----- **/

function relDirOfFile(fileKey: string): string {
	// fileKey looks like "/src/lib/_content/devices/familyA/device-1.ts"
	// We want the directory: "", "familyA", "familyA/subFamily", ...
	const base = BASE.endsWith('/') ? BASE : BASE + '/';
	const rel = fileKey.startsWith(base) ? fileKey.slice(base.length) : fileKey;
	const i = rel.lastIndexOf('/');
	return i === -1 ? '' : rel.slice(0, i);
}

function parentOf(dir: string): string {
	if (!dir) return '';
	const i = dir.lastIndexOf('/');
	return i === -1 ? '' : dir.slice(0, i);
}

function sortTree(node: FamilyNode) {
	node.children.sort((a, b) => {
		// Families before devices
		if (a.kind !== b.kind) return a.kind === 'family' ? -1 : 1;

		// If you store an order/index on family or item, you can prioritise that here.
		const aName = a.kind === 'family'
			? a.family?.name ?? lastSegment((a as FamilyNode).dir)
			: a.item.name ?? a.item.name ?? lastSegment((a as DeviceNode).file);
		const bName = b.kind === 'family'
			? b.family?.name ?? lastSegment((b as FamilyNode).dir)
			: b.item.name ?? b.item.name ?? lastSegment((b as DeviceNode).file);
		return aName.localeCompare(bName, undefined, { numeric: true, sensitivity: 'base' });
	});

	for (const c of node.children) {
		if (c.kind === 'family') sortTree(c);
	}
}

function lastSegment(path: string) {
	const i = path.lastIndexOf('/');
	return i === -1 ? path : path.slice(i + 1);
}
