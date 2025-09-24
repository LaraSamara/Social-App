import { useContext, useState } from 'react';
import postPic from '../../assets/post.png';
import Comment from '../Comment/Comment.jsx';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { postContext } from '../../Context/PostContext.jsx';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment/moment.js';

const UserPost = ({ post, callBack }) => {
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(post.comments);
    const [showMore, setShowMore] = useState(1);
    const { addComment, deletePost, getPostComments } = useContext(postContext);
    const [loading, setLoading] = useState(false);
    const { pathname } = useLocation();

    const getComments = async () => {
        const newComments = await getPostComments(post.id);
        setComments(newComments);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const newComments = await addComment({ content: comment, post: post.id });
        setComment("");
        setComments(newComments);
        setLoading(false);
    }

    const removePost = async (id) => {
        await deletePost(id);
        callBack();;
    }

    return (
        <div className="shadow-[0_0_15px_rgba(0,0,0,0.2)] bg-base-100 mt-5 p-6 w-1/3 mx-auto">
            <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                    <figure className='w-[40px] h-[40px] rounded-full relative'>
                        <img
                            className='rounded-full w-[100%] h-[100%] absolute'
                            src={post?.user?.photo}
                            alt="" />
                    </figure>
                    <div className="flex flex-col text-sm">
                        <div className="">{post?.user?.name}</div>
                        <div className="text-xs">{moment(post?.createdAt).fromNow()}</div>
                    </div>
                </div>
                {(pathname == "/profile" || pathname.startsWith("/details"))  && (
                    <button
                        onClick={() => removePost(post.id)}
                        className="cursor-pointer">
                        <TrashIcon className="h-4 w-4 text-red-500" />
                    </button>
                )}
            </div>
            <Link to={`/details/${post.id}`}>
                <p className='my-5 overflow-hidden'>{post.body}</p>
                <figure className='mt-5 h-[250px] relative'>
                    <img
                        className='w-[100%] h-[100%] absolute bg-cover bg-center'
                        src={post.image ?? postPic}
                        alt="Post Image" />
                </figure>
            </Link>
            <button
                onClick={() => setShowComments(!showComments)}
                className='text-[10px] mt-3 text-info cursor-pointer'>
                Show Comments {comments?.length}
            </button>
            <div className="flex flex-col gap-3 mt-2">
                <form onSubmit={e => onSubmit(e)} className="mt-2 bg-gray-500/35 rounded-sm p-4 flex justify-between items-center gap-2">
                    <input
                        name='comment'
                        type="text"
                        placeholder="Type your Comment"
                        className="input w-full"
                        onInput={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <button className="btn btn-info btn-sm">
                        {loading ?
                            <span className="loading loading-spinner me-1 text-white"></span> :
                            <PlusIcon className="h-3 w-3 text-white" />}
                    </button>
                </form>
                {showComments && (
                    <>
                        {comments.slice(0, showMore).map(
                            (comment) => <Comment comment={comment} key={comment._id} callback={getComments} />
                        )}
                        {showMore < comments?.length && (
                            <button
                                onClick={() => setShowMore(prev => prev + 1)}
                                className="btn btn-info btn-xs w-fit">
                                Show More Comments
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default UserPost;
