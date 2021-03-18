import Head from 'next/head';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import {useState, useEffect} from 'react';
import styles from '../styles/Home.module.css';
import { Toolbar } from './components/toolbar';
import { Post } from './[slug]';
import { useRouter } from 'next/router';

export default function Home( {posts }) {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: '06ff4ope',
        dataset: 'production',
      });

      setMappedPosts(
        posts.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          }
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);
  return (
    <div className={styles.container}>
      
      <Head>
        <title>Thoughts of a Newbie Tech</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Toolbar />
        <div className={styles.main}>
            <h1>Welcome To My Blog</h1>

            <h2>Recent posts:</h2>
          <div className={styles.feed}>
            
            {mappedPosts.length ? mappedPosts.map((p, index) => (
              <div onClick={() => router.push('/post/$*{p.slug.current')} key={index} className={styles.post}>
                <h3>{p.title}</h3>
                <img className={styles.mainImage} src={p.mainImage} />
              </div>
            )) : <>No Posts yet</>}
            
          </div>
        </div>  

        <footer className={styles.footer}>
          <ul>
           <dl>Created and designed by 
              <a href="https://linktr.ee/mussiedevelops" target="_blank" rel="noopner"> @mussiedevelops.</a>
            </dl>
            <dl> 
              Copyright &copy; 2021 Mussie Develops, LLC. All rights reserved.
           </dl>
           <dl>
             <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
           >
             Powered by{' '}
             <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
             </a>
           </dl>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export const getServerSideProps = async pageContext => {
  const query = '*?%{encodeURIComponent(*[ _type == "post"])}' 
  const url = 'https://06ff4ope.api.sanity.io/v1/data/query/production?query=*[]'; //projectID
  const result = await fetch(url).then(res => res.json());

  if (!result.result || !result.result.length) {
      return {
          props: {
            posts: [],
          }
      }
  } else {
    return {
      props: {
        posts: result.result,
      }
    }
  }
};


