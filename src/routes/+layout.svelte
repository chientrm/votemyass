<script>
	import { page } from '$app/stores';
	import { PUBLIC_URL } from '$env/static/public';
	import icon from '$lib/ass.png';
	import { buttonVariants } from '$lib/components/ui/button';
	import { configs } from '$lib/configs';
	import { cn } from '$lib/utils';
	import MdiGithub from '~icons/mdi/github';
	import MingcuteSocialXFill from '~icons/mingcute/social-x-fill';
	import SimpleIconsGithubsponsors from '~icons/simple-icons/githubsponsors';
	import '../app.css';
</script>

<svelte:head>
	<meta name="keywords" content={configs.keywords.join(',')} />
	<meta name="author" content="realChientrm" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="{PUBLIC_URL}{$page.url.pathname}" />
	<meta property="og:locale" content="EN_US" />
	<link rel="shortcut icon" href="/favicon2.png" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<div class="mr-4 flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<img src={icon} alt="Vote my ass" class="h-6 w-6" />
				<span class="inline-block font-bold">VoteMyAss.com</span>
			</a>
			<nav class="flex items-center gap-6 text-sm">
				<!-- <a
					href="/"
					class={cn(
						'transition-colors hover:text-foreground/80',
						$page.url.pathname === '/' ? 'text-foreground' : 'text-foreground/60'
					)}
				>
					latest
				</a> -->
				<!-- <a
					href="/top"
					class={cn(
						'transition-colors hover:text-foreground/80',
						$page.url.pathname.startsWith('/top') ? 'text-foreground' : 'text-foreground/60'
					)}
				>
					top
				</a> -->
			</nav>
		</div>
		<div class="flex flex-1 items-center justify-end space-x-2">
			<nav class="flex items-center">
				<a href="https://buymeacoffee.com/chientrm" target="_blank" rel="noopener noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: 'sm',
								variant: 'ghost'
							}),
							'h-8 items-center px-2'
						)}
					>
						<SimpleIconsGithubsponsors class="mr-2 h-4 w-4" />
						<span>Donate</span>
					</div>
				</a>
				<a href="https://x.com/realchientrm" target="_blank" rel="noopener noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: 'sm',
								variant: 'ghost'
							}),
							'h-8 w-8 px-0'
						)}
					>
						<MingcuteSocialXFill class="h-4 w-4" />
						<span class="sr-only">X</span>
					</div>
				</a>
				<a href="https://github.com/chientrm/votemyass" target="_blank" rel="noopener noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: 'sm',
								variant: 'ghost'
							}),
							'h-8 w-8 px-0'
						)}
					>
						<MdiGithub class="h-4 w-4" />
						<span class="sr-only">GitHub</span>
					</div>
				</a>
			</nav>
		</div>
	</div>
</header>

<div class="mx-auto max-w-[720px] p-4">
	<slot />
</div>
