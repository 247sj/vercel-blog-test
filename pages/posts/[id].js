import Layout from "../../components/Layout.js";
import Date from "../../components/Date.js";
import utilStyles from "../../styles/utils.module.css";

import { getPostData } from "../../lib/posts";
import { useRouter } from "next/router.js";

export async function getStaticPaths() {
  // const paths = getAllPostIds();
  const paths = [
    {
      params: {
        id: "ssg-ssr",
      },
    },
  ];
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loding...</div>;
  }
  return (
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
