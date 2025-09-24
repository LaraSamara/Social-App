import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext, useState } from "react";
import { postContext } from '../../Context/PostContext.jsx';

const CreatePost = ({ callBack }) => {
    const { addPost } = useContext(postContext);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const addUserPost = async (e) => {
        setLoading(true);
        e.preventDefault();
        const body = e.target.body.value;
        const image = e.target.image.files[0];

        const formData = new FormData();
        formData.append("body", body);
        formData.append("image", image);
        await addPost(formData);

        callBack();
        setLoading(false);
        setIsOpen(false)
        clearInput(e);
    }

    const clearInput = async (e) => {
        e.target.body.value = "";
        e.target.image.files[0] = "";
    }

    return (
        <>
            <div className="w-1/3 mx-auto mt-5 bg-gray-500/35 rounded-sm p-6">
                <button className="btn btn-sm border border-gray-300 text-gray-500 w-full rounded-2xl" onClick={() => setIsOpen(true)}>
                    Whats On your Mind?
                </button>
            </div>

            <input type="checkbox" id="create-post-modal" className="modal-toggle" checked={isOpen} readOnly />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="flex justify-between items-center mb-4 border-b-1 border-gray-400 pb-5">
                        <span className="text-lg font-semibold">Add New Post</span>
                        <button
                            className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <XMarkIcon />
                        </button>
                    </div>

                    <form onSubmit={e => addUserPost(e)} className="flex flex-col gap-4  my-8">
                        <input
                            type="text"
                            name='body'
                            placeholder="Write Your Post"
                            className="input input-info w-full"
                        />
                        <input
                            type="file"
                            name='image'
                            className="file-input input-info file-input-md w-full" />

                        <div className="modal-action border-t-1 border-gray-400 pt-5">
                            <button className="btn btn-info" type="submit" disabled={loading}>
                                {loading ? <span className="loading loading-spinner me-1 text-white"></span> : null}
                                Post
                            </button>
                            <button className="btn btn-error" type='button' onClick={() => setIsOpen(false)}>Close</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default CreatePost;
