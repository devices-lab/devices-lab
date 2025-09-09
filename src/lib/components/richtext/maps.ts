import BaseLink from '$lib/components/interactive/BaseLink.svelte';
import IconItem from '$lib/components/icons/IconItem.svelte';
import { safeUrl, type TagMap } from '$lib/components/richtext/customText';
import { svelteTag, htmlTag, htmlVoid } from '$lib/components/richtext/maps-helpers';
import type { SvelteTagMap } from './NodeView.svelte';


// ---- Svelte components ----
export const svelteMap: SvelteTagMap = {
	link: svelteTag(BaseLink, {
		baseClass: 'underline underline-offset-4 decoration-dotted hover:decoration-solid link-blue',
		pass: ['rel', 'target', 'aria-*', 'data-*'],
		map: (a) => ({
			link: safeUrl(String(a.href ?? '#'))
		}),
		requiredChildren: true
	}),
	icon: svelteTag(IconItem, {
		baseClass: 'text-gray-600 dark:text-gray-400 size-4',
		map: (a) => ({
			icon: String(a.name ?? 'CircleQuestionMark')
		}),
		ignoreChildren: true
	})
};

// ---- Raw HTML tags ----
export const tagMap: TagMap = {
	highlight: htmlTag('mark'),
	bold: htmlTag('span', { baseClass: 'font-semibold' }),
	italic: htmlTag('span', { baseClass: 'italic' }),
	underline: htmlTag('span', { baseClass: 'underline underline-offset-2' }),
	span: htmlTag('span'),
	code: htmlTag('code', { map: (a) => (a.lang ? { 'data-lang': a.lang } : {}) }),
	br: htmlVoid('br'),
	hr: htmlTag('span', { baseClass: 'flex border-b w-full h-px' }),
	// if you want <a> in HTML path to show something when no children:
	//link: htmlTag('a', {
	//	pass: ['rel', 'target', 'aria-*', 'data-*'],
	//	map: (a) => ({ href: safeUrl(a.href ?? '#') }),
	//	fallbackTextAttr: 'href'
	//}),
	ocr: htmlTag('span', { baseClass: 'font-ocr' })
};


/*
Bold: ${bold}[bold]
Italic: ${italic}[italic]
Underline: ${underline}[underline]
Highlight: ${highlight}[highlight]
Code: ${code}[code]
OCR font: ${ocr}[OCR font]
Icons: ${icon name=Dog} ${icon name=Cat}
Internal links: ${link href='/solder-bit/gamepad'}[solderbit gamepad] 
External links: ${link href='https://www.google.com'}[click me!] 
${br}
${hr}
${link href='test'}[test]
This is a ${span class='link-red'}[span] with a different color.
*/