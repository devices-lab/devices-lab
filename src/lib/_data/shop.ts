import type { Picture } from 'vite-imagetools';
import { Routes } from '$lib/routes';
import ImageShoppingCart from '$lib/assets/img/ShoppingCart.png?enhanced';


export interface DeviceShop {
	name: string;
	description: string;
	image: Picture;
	href: string;
}

export const DevicesShop: DeviceShop = {
	name: "Devices Shop",
	description: "Buy our devices to try them out yourself.",
	image: ImageShoppingCart,
	href: Routes.shop.href
};