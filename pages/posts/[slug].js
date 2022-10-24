import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import Image from 'next/image';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { useEffect } from 'react';

// ダイナミックページでgetStaticPropsを利用する場合に
// getStaticPathsがないとエラーになります。
export async function getStaticProps({params}) {
  // パラメータを使用してファイルの内容を取得
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  // 取得したファイルの内容をメタ情報とコンテンツに分離
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

// ダイナミックルーティングを利用している場合はgetStaticPropsに加えて
// getStaticPathsの設定が必要となります。
// getStaticPathsににはビルド処理の中でページを作成する際に必要となる
// 個別の記事ページのパスを設定します。
export async function getStaticPaths() {
  // postsフォルダからファイル一覧を取得
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      // ファイルから「.md」の拡張子を除去した文字列をスラッグとする
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  console.log('paths:', paths);
  return {
    paths,
    // falseを設定することで存在しないページへのアクセスがあった場合に404 Not Foundが表示されます。
    fallback: false,
  };
}

const Post = ({ frontMatter, content }) => {
  useEffect(() => {
    // client side で invoke
    hljs.highlightAll();
  }, [hljs]);

  return (
    <div className="prose">
      <div className="border">
        <Image
          src={`/${frontMatter.image}`}
          width={600}
          height={400}
          alt={frontMatter.title}
        />
      </div>
      <h1>{frontMatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    </div>
  );
};

export default Post;