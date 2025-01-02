// src/app/(routes)/search/page.tsx
import { Suspense } from "react";
import SearchResults from "./SearchResults";

export const metadata = {
	title: "Search Results",
	description: "Search results for blog posts",
};

interface SearchPageProps {
	searchParams: {
		q: string;
	};
}

export default function SearchPage({ searchParams }: SearchPageProps) {
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
