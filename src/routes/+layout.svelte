<script>
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import MdiGithub from '~icons/mdi/github';
	import icon from '$lib/ass.png';
	import '../app.css';
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<div class="mr-4 hidden md:flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<img src={icon} alt="Vote my ass" class="h-6 w-6" />
				<span class="hidden font-bold sm:inline-block">VoteMyAss.com</span>
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
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<nav class="flex items-center">
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
