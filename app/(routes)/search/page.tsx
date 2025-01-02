// src/app/search/page.tsx
import { Suspense } from "react";
import SearchResults from "./SearchResults";

export default function SearchPage({
	searchParams,
}: {
	searchParams: { q: string };
}) {
	return (
		<div className="prose prose-invert max-w-none">
			<h1>Search Results</h1>
			<p>Results for: {searchParams.q}</p>
			<Suspense fallback={<div>Loading...</div>}>
				<SearchResults query={searchParams.q} />
			</Suspense>
		</div>
	);
}
