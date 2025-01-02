
// src/app/api/search/route.ts
import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';
 
// 포스트 검색 API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
 
  if (!query) {
    return NextResponse.json([]);
  }
 
  try {
    const posts = await getAllPosts();
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
 
    return NextResponse.json(filteredPosts);
  } catch (error) {
    console.error('Error in GET /api/search:', error);
    return NextResponse.json({ error: 'Failed to search posts' }, { status: 500 });
  }
}