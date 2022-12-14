import fs from 'fs';
import matter from 'gray-matter';
import Pagination from '../components/Pagination';
import PostCard from '../components/PostCard';

const PAGE_SIZE = 5;

const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

/**
 * ビルド時に実行される。
 */
export const getStaticProps = () => {
  // postsフォルダからファイル一覧を取得
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    // ファイルから「.md」の拡張子を除去した文字列をスラッグとする
    const slug = fileName.replace(/\.md$/, '');
    // ファイルの内容を読み込み
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    // ファイルのメタ情報を取得
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  // 日付の降順にソート
  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );

  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  return {
    props: {
      posts: sortedPosts.slice(0, PAGE_SIZE),
      pages,
    },
  };
};

/**
 * デフォルト処理。
 */
export default function Home({ posts, pages }) {
  return (
    <div className="my-8">
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          // getStaticPropsで設定したスラッグ・メタ情報をPostCardへ受け渡し
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination pages={pages} />
    </div>
  );
}
