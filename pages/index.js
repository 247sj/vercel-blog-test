import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/Date";
import { getSortedPostsData } from "../lib/posts";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
// export async function getServerSideProps() {
//   const response = await fetch("http://localhost:3000/api/posts");
//   const json = await response.json();
//   return {
//     props: {
//       allPostsData: json.allPostsData,
//     },
//   };
// }
export default function Home({ allPostsData }) {
  // const [allPostsData, setAllPostsData] = useState([]);
  // useEffect(() => {
  //   fetch("/api/posts")
  //     .then((res) => res.json())
  //     .then((data) => setAllPostsData(data.allPostsData));
  // }, []);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Link href="/posts/first-post" legacyBehavior>
          <a className="potal">첫번쨰 글</a>
        </Link>
        <Link href="/posts/second-post" legacyBehavior>
          <a>두번쨰 글</a>
        </Link>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`} legacyBehavior>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <style>{`
        .potal {
          margin-right: 3%;
        }
        .color {

        }
      `}</style>
    </Layout>
  );
}
