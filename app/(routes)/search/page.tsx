// // src/app/(routes)/search/page.tsx
// import { Suspense } from "react";
// import SearchResults from "./SearchResults";

// export const metadata = {
// 	title: "Search Results",
// 	description: "Search results for blog posts",
// };

// interface SearchPageProps {
// 	searchParams: { [key: string]: string | string[] | undefined };
// }

// export default async function SearchPage({ searchParams }: SearchPageProps) {
// 	const searchQuery = typeof searchParams.q === "string" ? searchParams.q : "";

// 	return (
// 		<div className="prose prose-invert max-w-none">
// 			<h1>Search Results</h1>
// 			<p>Results for: {searchQuery}</p>
// 			<Suspense fallback={<div>Loading...</div>}>
// 				<SearchResults query={searchQuery} />
// 			</Suspense>
// 		</div>
// 	);
// }
