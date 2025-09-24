import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postContext } from "../../Context/PostContext.jsx";
import UserPost from "../UserPost/UserPost.jsx";
import Loading from "../Loading/Loading.jsx";

const PostDetails = () => {
    const { id } = useParams();
    const { getPost } = useContext(postContext);
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);

    const getPostDetails = async () => {
        setLoading(true);
        const post = await getPost(id);
        setPost(post);
        setLoading(false);
    }

    useEffect(() => {
        getPostDetails();
    }, [])

    return (
        <div>
            {loading ?
                <Loading /> :
                <UserPost post={post} />
            }
        </div>
    )
}

export default PostDetails;
