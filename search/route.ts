// src/app/api/search/route.ts
import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

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
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
 
    return NextResponse.json(filteredPosts);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to search posts' }, { status: 500 });
  }
}