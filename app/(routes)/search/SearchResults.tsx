// src/app/(routes)/search/SearchResults.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "@/types";

export default function SearchResults({ query }: { query: string }) {
	const [results, setResults] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function performSearch() {
			try {
				setLoading(true);
				const response = await fetch(
					`/api/search?q=${encodeURIComponent(query)}`
				);
				if (!response.ok) {
					throw new Error("Search failed");
				}
				const data = await response.json();
				setResults(data);
			} catch (err) {
				setError("Failed to perform search");
				console.error("Search error:", err);
			} finally {
				setLoading(false);
			}
		}

		performSearch();
	}, [query]);

	if (loading) {
		return <div>Searching...</div>;
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	if (results.length === 0) {
		return <div>No results found for &ldquo;{query}&rdquo;</div>;
	}

	return (
		<div className="space-y-4">
			{results.map((post) => (
				<div key={post.slug} className="border border-[#3C3C3C] p-4 rounded">
					<Link
						href={`/posts/${post.slug}`}
						className="text-xl hover:text-[#007ACC]">
						{post.title}
					</Link>
					<div className="text-sm text-[#6A737D] mt-1">
						{post.date}
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="ml-2 px-2 py-0.5 bg-[#3C3C3C] rounded-full">
								{tag}
							</span>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
