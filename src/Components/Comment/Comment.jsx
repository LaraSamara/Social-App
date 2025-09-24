import { useContext, useState } from 'react';
import commentPic from '../../assets/lara.JPG';
import { postContext } from '../../Context/PostContext.jsx';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useLocation } from 'react-router-dom';


const Comment = ({ comment, callback }) => {
    const { deleteComment } = useContext(postContext);
    const [loading, setLoading] = useState(false);
    const { pathname } = useLocation();

    const removeComment = async () => {
        setLoading(true);
        await deleteComment(comment._id);
        callback();
        setLoading(false);
    }

    return (
        <div className='p-4 bg-gray-500/35 rounded-sm'>
            <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                    <figure className='w-[40px] h-[40px] rounded-full relative'>
                        <img
                            className='rounded-full w-[100%] h-[100%] absolute'
                            src={comment.commentCreator.photo.includes("undefined") ? commentPic : comment.commentCreator.photo}
                            alt="" />
                    </figure>
                    <div className="flex flex-col text-sm">
                        <div className="">{comment.commentCreator.name}</div>
                        <div className="text-xs">{comment.createdAt}</div>
                    </div>
                </div>
                {pathname == "/profile" && (
                    <button
                        className='cursor-pointer'
                        onClick={removeComment}
                    >
                        {loading ?
                            <span className="loading loading-spinner me-1 text-white"></span> :
                            <TrashIcon className="h-3 w-3 text-red-500" />}
                    </button>
                )}
            </div>
            <div className="mt-3">{comment.content}</div>
        </div>
    )
}

export default Comment;
