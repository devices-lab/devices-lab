import type { Component } from "svelte";
import type { Entry, EntryFamily, EntryItem } from "$lib/data/indexer";
import ItemCard from "$layouts/cards/ItemCard.svelte";
import ItemGrid from "$layouts/families/ItemGrid.svelte";
import ItemPage from "$layouts/items/ItemPage.svelte";

export type LayoutSet<T> = {
	name: string;
	layout: T;
}

export type CardLayoutComponent = Component<{ entry: Entry }>;
export type ItemLayoutComponent = Component<{ entry: Entry }>;
export type FamilyLayoutComponent = Component<{ entries: Entry[], family: Entry | undefined }>;

type CardLayoutMap = Record<string, LayoutSet<CardLayoutComponent>>;
type ItemLayoutMap = Record<string, LayoutSet<ItemLayoutComponent>>;
type FamilyLayoutMap = Record<string, LayoutSet<FamilyLayoutComponent>>;

const build = () => {
	const cardModules = import.meta.glob(`$layouts/cards/*.svelte`, { eager: true, import: 'default' }) as Record<string, Component>;
	const itemModules = import.meta.glob(`$layouts/items/*.svelte`, { eager: true, import: 'default' }) as Record<string, Component>;
	const familyModules = import.meta.glob(`$layouts/families/*.svelte`, { eager: true, import: 'default' }) as Record<string, Component>;

	const cardLayouts = Object.fromEntries(
		Object.entries(cardModules).map(([path, mod]) => {
			const name = path.split('/').pop()!.replace('.svelte', '');
			return [name, { name, layout: mod }];
		})
	) as CardLayoutMap;

	const itemLayouts = Object.fromEntries(
		Object.entries(itemModules).map(([path, mod]) => {
			const name = path.split('/').pop()!.replace('.svelte', '');
			return [name, { name, layout: mod }];
		})
	) as ItemLayoutMap;

	const familyLayouts = Object.fromEntries(
		Object.entries(familyModules).map(([path, mod]) => {
			const name = path.split('/').pop()!.replace('.svelte', '');
			return [name, { name, layout: mod }];
		})
	) as FamilyLayoutMap;



	const resolveCardLayout = (item: Entry | undefined) => {
		if (item && item.item && CardLayouts[item.item.cardLayout]) {
			return CardLayouts[item.item.cardLayout].layout;
		}
		return ItemCard;
	};

	const resolveItemLayout = (item: EntryItem | undefined) => {
		if (item && item.item && ItemLayouts[item.item.layout]) {
			return ItemLayouts[item.item.layout].layout;
		}
		return ItemPage;
	};


	const resolveFamilyLayout = (family: EntryFamily | undefined) => {
		if (family && family.item && FamilyLayouts[family.item.layout]) {
			return FamilyLayouts[family.item.layout].layout;
		}
		return ItemGrid;
	};


	return { cardLayouts, itemLayouts, familyLayouts, resolveCardLayout, resolveItemLayout, resolveFamilyLayout };
};

// Build once at module load
const catalog = build();

export const FamilyLayouts = catalog.familyLayouts;
export const ItemLayouts = catalog.itemLayouts;
export const CardLayouts = catalog.cardLayouts;
// Helper functions
export const resolveCardLayout = catalog.resolveCardLayout;
export const resolveItemLayout = catalog.resolveItemLayout;
export const resolveFamilyLayout = catalog.resolveFamilyLayout;