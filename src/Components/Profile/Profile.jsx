import { useContext, useEffect, useState } from 'react';
import { postContext } from '../../Context/PostContext.jsx';
import UserPost from '../UserPost/UserPost.jsx';
import Loading from '../Loading/Loading.jsx';
import CreatePost from '../CreatePost/CreatePost.jsx';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0)
    const { getUserInfo, getUserPosts } = useContext(postContext);

    const getPosts = async () => {
        setLoading(true);
        const { _id: id } = await getUserInfo();
        const { posts, total } = await getUserPosts(id, limit);
        setPosts(posts);
        setTotal(total)
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
    }, [limit])

    return (
        <div>
            <CreatePost callBack={getPosts} />
            {loading ?
                <Loading /> :
                <>
                    {posts?.map((post) => <UserPost post={post} key={post.id} callBack={getPosts} />)}
                    {posts.length < total && (
                        <div className="mx-auto w-1/3 my-5">
                            <button
                                onClick={() => setLimit(prev => prev + 10)}
                                className="btn btn-info btn-xs w-fit">
                                Show More Posts
                            </button>
                        </div>
                    )}
                </>

            }
        </div>
    )
}

export default Profile;
