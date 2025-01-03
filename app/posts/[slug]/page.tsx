import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";

// params 타입을 명시적으로 선언
interface PageProps {
	params: {
		slug: string;
	};
}

export default async function PostPage({ params }: PageProps) {
	// 슬러그를 통해 게시물 데이터를 가져옵니다.
	const post = await getPost(params.slug);

	// 게시물이 없는 경우 404 페이지 렌더링
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
