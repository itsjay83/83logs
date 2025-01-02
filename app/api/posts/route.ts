// src/app/api/posts/route.ts
import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';
 
// 모든 포스트 가져오기 API
export async function GET() {
  try {
    const posts = await getAllPosts();
    const serializedPosts = posts.map(post => ({
      ...post,
      date: post.date.toString(),
    }));
    return NextResponse.json(serializedPosts);
  } catch (error) {
    console.error('Error in GET /api/posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
