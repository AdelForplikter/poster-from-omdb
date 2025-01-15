<script lang="ts">
	import { Input } from '$lib/components/ui/input/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as Carousel from '$lib/components/ui/carousel/index';
	import { Button } from '$lib/components/ui/button/index';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';


	let { data, form }: { data: PageData; form: ActionData } = $props();
	// console.log(data);

    let searchstr = $state();

	let arrayDefaults = [
		'Inception',
		'Interstellar',
		'Tenet',
		'Memento',
		'The Shining',
		'The Dark Knight',
		'The Matrix',
		'Lord of the Rings: The Return of the King',
		'Godfather',
		'Shawshank Redemption',
		'Silence of the Lambs',
		'Grand Budapest Hotel',
		'Dark Knight Rises',
		'Avengers',
		'Lion King',
		'Lord of the Rings: The Fellowship of the Ring',
		'Lord of the Rings: The Two Towers'
	];

	let randomMovie = arrayDefaults[Math.floor(Math.random() * arrayDefaults.length)];

	if (form != null) {
		searchstr = form.search;
	} else {
		searchstr = randomMovie;
	}

	let imgmessage = $state();
	if (form?.saveimage) {
		imgmessage = JSON.stringify(form.saveimage);


	}



</script>

<form
	use:enhance
	method="POST"
	action="?/searchmovie"
	class="flex max-w-[550px] flex-row items-center justify-center gap-2"
>
	<Input
		type="search"
		placeholder="Search movie"
		name="searchst"
		bind:value={searchstr}
		class="m-4 max-w-[550px] p-4"
	/>
	<Button
		variant="outline"
		type="submit"
		class="m-4  mb-2 mr-2 rounded-lg bg-green-500 p-4 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
		>Go</Button
	>
</form>
{#if imgmessage}
	<h1>{imgmessage} Great</h1>
{/if}

{#if form?.success}
	<!-- <h1>{JSON.stringify(form.data)}</h1> -->

	<Carousel.Root class="mx-auto h-auto w-full max-w-[1200px]">
		<Carousel.Content>
			{#each form.data.Search as movie}
				{#if movie.Poster !== 'N/A'}
					<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
						<Card.Root>
							<Card.Header class="flex items-center justify-center p-6">
								<Card.Title>{movie.Title}</Card.Title>
								<Card.Description>{movie.Year}</Card.Description>
							</Card.Header>
							<Card.Content>
								<img src={movie.Poster} alt={movie.Title} />
							</Card.Content>
							<Card.Footer>
								<form method="POST" action="?/savealbumimage">
									<input type="hidden" name="posterUrl" value={movie.Poster} />
									<Button variant="outline" type="submit">Save image as file</Button>
								</form>
							</Card.Footer>
						</Card.Root>
					</Carousel.Item>
				{/if}
			{/each}
		</Carousel.Content>
		<Carousel.Next />
		<Carousel.Previous />
	</Carousel.Root>
{/if}
