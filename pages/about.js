import styles from '../styles/About.module.css'
import Image from 'next/image'
import { Toolbar } from './components/toolbar'
export const Me = ( { moses }) => {
        return (
            
            <div className='page-container'>

                <Toolbar/>
                <div className={styles.main}>
                    <h1> About Me </h1>
                </div>
                <div className={styles.aboutMe}>
                    <h3>{moses.name}</h3>
                    <h6>{moses.position}</h6>
                    <img src = {moses.image2} />
                    <p>{moses.description}</p>
                </div>
            </div>
        )
};

export const getServerSideProps = async pageContext => {
    const apiResponse = await fetch (
        'https://my-json-server.typicode.com/mgiorgis42/next-news/aboutMe',
    );

    const moses = await apiResponse.json();

    return {
        props: {
            moses
        }
    }
};

export default Me;