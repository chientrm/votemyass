import { PUBLIC_URL } from '$env/static/public';
import { db } from '$lib/db.js';
import { polls } from '$lib/schema.js';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import { eq } from 'drizzle-orm';

const template = `
<div tw="flex h-full items-center justify-center bg-white">
    <div tw="flex flex-col w-full py-12 px-4 items-center justify-between p-8">
        <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
        <img src='${PUBLIC_URL}/title.jpeg' width='320' />
        <span>#description</span>
        </h2>
        <div tw="mt-8 flex md:mt-0">
        <div tw="flex rounded-md shadow">
            <a href="#" tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">Vote Yes!</a>
        </div>
        <div tw="ml-3 flex rounded-md shadow">
            <a href="#" tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">Vote No!</a>
        </div>
        </div>
    </div>
</div>
`;

const fontFile = await fetch('https://og-playground.vercel.app/inter-latin-ext-400-normal.woff');
const fontData: ArrayBuffer = await fontFile.arrayBuffer();

export const GET = async ({ params }) => {
	const { title } = await db.query.polls
		.findFirst({
			columns: { title: true },
			where: eq(polls.id, parseInt(params.id))
		})
		.then((res) => res!);
	return new ImageResponse(template.replaceAll('#description', title), {
		height: 630,
		width: 1200,
		fonts: [
			{
				name: 'Inter Latin',
				data: fontData,
				weight: 400
			}
		]
	});
};
