

// Number of milliseconds to wait before generating the SVG
export const GENERATOR_DELAY_MS = 1000;

export type SVG_Role = 'subject' | 'clip' | 'frame' | 'ignore';

export const DATA_VERSION = 6;

export const LOGO_ICON = "DL";
export const LOGO_NAME = 'devices-lab';
export const LOGO_DOMAIN = 'devices-lab.org';

export const KICAD_SCALE = 0.5;

// Props for creating a DevicesLab version stack
export const VersionProps = (id: string, version: string) => ({
	textLeft: LOGO_ICON,
	textRightTop: `${id}`,
	textRightBottom: `${version}`,
});

// Props for creating a DevicesLab version pill
export const VersionPropsPill = (id: string, version: string) => ({
	textLeft: LOGO_ICON,
	textRight: `${id}-${version}`,
});

// Props for creating a DevicesLab logo
export const LogoProps = () => ({
	textLeft: LOGO_ICON,
	textRight: LOGO_NAME
});

// Props for creating a DevicesLab project
export const ProjectProps = (name: string) => ({
	textTop: LOGO_DOMAIN,
	textBottom: `/${name}`
});

// Props for creating a DevicesLab icon
export const IconProps = () => ({
	text: LOGO_ICON
});



//export const BACKGROUND = 'none';
//export const FONT_FAMILY = `'OCR A Extended', 'OCR A Std', 'OCR A', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`;
export const FONT_FAMILY = `'OCR A Extended', 'OCR A Std', 'OCR A'`;

export const charWidth = (size: number) => size * 0.607;
//export const charWidth = (size: number) => size * 0.62;
export const charHeight = (size: number) => Math.round(size * 0.676);

export const calculateTextWidth = (text: string, size: number) => {
	const temp = Math.round(Math.max(charWidth(size) * text.length, size * 1.2));
	return temp % 2 === 0 ? temp : temp + 1;
};

export const FLATTEN_TOLERANCE = 0.01;









/* ─────────────────────────────────────────────────────────────── */
/* ───────────────────────── Downloaders ───────────────────────── */
/* ─────────────────────────────────────────────────────────────── */

export function downloadSVG(element: SVGSVGElement, filename: string) {
	// Serialize the modified SVG for download
	const source = new XMLSerializer().serializeToString(element);
	const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename.endsWith('.svg') ? filename : `${filename}.svg`;
	a.click();
	URL.revokeObjectURL(url);
}

export function downloadSVGFont(element: SVGSVGElement, filename: string) {
	// Load the OCR A font if not already loaded
	/*fetch(ocrAUrl)
		.then(r => r.blob())
		.then(b => new Promise<string>((res, rej) => {
			const reader = new FileReader();
			reader.onerror = () => rej(reader.error);
			reader.onload = () => res(reader.result as string);
			reader.readAsDataURL(b);
		}))
		.then(dataUri => {
			// Register the font CSS
			const clone = element.cloneNode(true) as SVGSVGElement;
			const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
			style.setAttribute('type', 'text/css');
			style.textContent = `@font-face{font-family:"OCR A Extended";src:url('${dataUri}') format('opentype');font-display:swap}`;
			clone.insertBefore(style, clone.firstChild);
			// Download the modified SVG
			downloadSVG(clone, filename);
		})
		.catch(err => console.error('Font load failed', err));*/

	// Register the font CSS
	const clone = element.cloneNode(true) as SVGSVGElement;
	const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
	style.setAttribute('type', 'text/css');
	style.textContent = `
		@font-face {
			font-family: "OCR A Extended";
			src: url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.eot");
			src: url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.eot?#iefix")format("embedded-opentype"),
			url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.woff2")format("woff2"),
			url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.woff")format("woff"),
			url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.ttf")format("truetype"),
			url("https://db.onlinewebfonts.com/t/fd6fa80f1e3345834599de891cca3f4c.svg#OCR A Extended")format("svg");
		}`;

	clone.insertBefore(style, clone.firstChild);
	// Download the modified SVG
	downloadSVG(clone, filename);
}


export function downloadDXF(dxf: string, filename: string) {
	const blob = new Blob([dxf], { type: 'application/dxf' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename.endsWith('.dxf') ? filename : `${filename}.dxf`;
	a.click();
	URL.revokeObjectURL(url);
}

export async function downloadPNG(canvas: HTMLCanvasElement, filename: string) {
	const save = (blob: Blob) => {
		const u = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = u;
		a.download = filename.endsWith('.png') ? filename : `${filename}.png`;
		a.click();
		URL.revokeObjectURL(u);
	};
	if (canvas.toBlob) {
		canvas.toBlob((b) => b && save(b), 'image/png');
	} else {
		// fallback
		const b64 = canvas.toDataURL('image/png');
		const b = await (await fetch(b64)).blob();
		save(b);
	}
}






















