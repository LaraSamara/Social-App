import { useContext, useEffect, useState } from 'react';
import { postContext } from '../../Context/PostContext.jsx';
import UserPost from '../UserPost/UserPost.jsx';
import Loading from '../Loading/Loading.jsx';
import Pagination from '../Pagination/Pagination.jsx';

const Home = () => {
    const { getAllPosts } = useContext(postContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0);
    const [startPage, setStartPage] = useState(1);

    const getPosts = async () => {
        setLoading(true);
        const { posts, pages } = await getAllPosts(page);
        setPosts(posts);
        setPages(pages);
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
    }, [page])

    return (
        <div>
            {loading ?
                <Loading /> :
                <div className='mx-auto'>
                    {posts?.map((post) => <UserPost post={post} key={post.id} />)}
                    <Pagination pages={pages} setPage={setPage} page={page} startPage={startPage} setStartPage={setStartPage}/>
                </div>
            }
        </div>
    )
}

export default Home;
