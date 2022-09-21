import fs from 'fs';
import matter from 'gray-matter';
import PostCard from '../components/PostCard';

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

  return { props: { posts } };
};

/**
 * デフォルト処理。
 */
export default function Home({ posts }) {
  return (
    <div className="my-8">
      <div className="grid grid-cols-3">
        {posts.map((post) => (
          // getStaticPropsで設定したスラッグ・メタ情報をPostCardへ受け渡し
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
