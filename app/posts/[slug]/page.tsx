import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";

export default async function PostPage({
	params,
}: {
	params: { slug: string };
}) {
	// Fetch post data using the slug
	const post = await getPost(params.slug);

	// If the post does not exist, render the "not found" page
	if (!post) {
		notFound();
	}

	return (
		<div className="prose prose-invert max-w-none">
			<h1>{post.title}</h1>
			<p className="text-sm text-gray-500">
				Published on {new Date(post.date).toLocaleDateString()}
			</p>
			<div dangerouslySetInnerHTML={{ __html: post.content }} />
		</div>
	);
}
