import { notFound } from "next/navigation";
import { getAllPosts, getPost, Post } from "@/lib/blog";

export async function generateStaticParams() {
  const posts: Post[] = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: Post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <h2>{post.published_at}</h2>
      <p>Description: {post.description}</p>
      <div>{post.content}</div>
    </article>
  );
}
