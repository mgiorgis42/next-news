import { useRouter } from 'next/router';
import styles from '../../styles/Toolbar.module.css';

export const Toolbar = () => {
    const router = useRouter()
    
    return (
        <div>
            <div className= {styles.main}>
                <div onClick={() => router.push('/')}>Home</div>
                <div onClick={() => router.push('/{slug}')}>Posts</div>
                <div onClick={() => router.push('/about')}>About the Author</div>
                <div onClick = {() => window.location.href ='http://mussiedevelops.com'}>Portfolio</div>
                <div onClick = {() => window.location.href= 'https://linktr.ee/mussiedevelops'}>Connect w/ Me!</div>
            </div>
        </div>
    );
};
