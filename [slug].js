import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import {useState, useEffect} from 'react';
import styles from '../styles/Post.module.css';
import { Toolbar } from './components/toolbar'

// components inherited from fetching blog data via sanity.io and defined below.
export const Post = ({title, body, image}) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const imgBuilder = imageUrlBuilder({
                projectId: '06ff4ope',
                dataset: 'production',
            });
        setImageUrl(imgBuilder.image(image));

    }, [image]);
    return (
        <div>
            <Toolbar />
            <div className={styles.main}>
                <h1>{title}</h1>

                {imageUrl && <img src={imageUrl} className={styles.mainImage} />}

                <div className={styles.body}>
                    <BlockContent blocks={body} />
                </div>
            </div>
        </div>
    );
};


/* this function is used to fetch blog data from sanity.io 
to render it on to the DOM. */
export const getServerSideProps = async pageContext => {
    const pageSlug = pageContext.query.slug; //slug created from sanity.io

    if (!pageSlug) {
        return {
            notFound: true
        }
    }
 /* We need to be able to render specific posts per page. 
 So we will create two variables. One to allocate a post 
 to a slug and one to grab the source (projectID) */
    const query = encodeURIComponent('*[ _type == "post" && slug.current == "${pageSlug}"]');
    const url = 'https://06ff4ope.api.sanity.io/v1/data/query/production?query=*'; //projectID

    const result = await fetch(url).then(res => res.json());
    const post = result.result[0,1]; /*grabbing the first index only because we should be 
                                  //  fetching only one item from the url */

    if (!post ) {
        return {
            notFound: true
        }
    }
        else {
            return {
                props: {
                    title: post.title,
                    body: post.body,
                    image: post.mainImage,
                }
            }
        }
};

export default Post;