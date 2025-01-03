// app/posts/[slug]/page.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextPage } from "next";

// 타입 정의
interface Post {
	title: string;
	date: string;
	tags: string[];
	content: string;
}

interface PageProps {
	params: {
		slug: string;
	};
	searchParams?: { [key: string]: string | string[] | undefined };
}

// API 호출 함수
async function getPost(slug: string): Promise<Post> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`
	);

	if (!response.ok) {
		throw new Error("Failed to fetch post");
	}

	return response.json();
}

// 포스트 페이지 컴포넌트
const PostPage: NextPage<PageProps> = async ({ params: { slug } }) => {
	try {
		const post = await getPost(slug);

		return (
			<article className="prose prose-invert prose-pre:bg-[#1E1E1E] prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg max-w-none">
				<header className="mb-8">
					<h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
					<div className="text-[#6A737D] flex items-center gap-2">
						<time>{post.date}</time>
						<div className="flex gap-2">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="px-2 py-0.5 bg-[#3C3C3C] rounded-full text-sm">
									{tag}
								</span>
							))}
						</div>
					</div>
				</header>
				<div className="mdx-content">
					<MDXRemote source={post.content} />
				</div>
			</article>
		);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error:", error.message);
		}
		notFound();
	}
};

// 메타데이터 생성 함수
export async function generateMetadata({
	params: { slug },
}: PageProps): Promise<Metadata> {
	try {
		const post = await getPost(slug);

		return {
			title: post.title,
			description: `${post.title} - Developer Blog`,
		};
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error:", error.message);
		}

		return {
			title: "Post Not Found",
			description: "The requested post could not be found.",
		};
	}
}

export default PostPage;
