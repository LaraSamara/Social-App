import axios from "axios";
import { createContext } from "react";
import { toast } from 'react-hot-toast';

export const postContext = createContext();

export const PostContextProvider = ({ children }) => {
    const headers = {
        token: localStorage.getItem('Token'),
    };

    const getAllPosts = async (page) => {
        try {
            const { data } = await axios.get(`https://linked-posts.routemisr.com/posts?limit=10&page=${page}&sort=-createdAt`, {
                headers,
            });
            return {
                posts: data.posts,
                pages: data.paginationInfo.numberOfPages,
            }
        } catch (error) {

        }
    }

    const getUserInfo = async () => {
        try {
            const { data } = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
                headers,
            });
            return data.user;
        } catch (error) {

        }
    }

    const getUserPosts = async (id, limit) => {
        try {
            const { data } = await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=${limit}`, {
                headers,
            });

            return {
                posts: data.posts,
                total: data.paginationInfo.total
            }
        } catch (error) {

        }
    }

    const getPost = async (id) => {
        try {
            const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
                headers,
            });
            return data.post;
        } catch (error) {

        }
    }

    const addPost = async (body) => {
        try {
            const { data } = await axios.post(`https://linked-posts.routemisr.com/posts`, body, {
                headers,
            });
            toast.success("Post Added Successfully...");
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = async (id) => {
        try {
            const { data } = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`, {
                headers,
            });
            toast.success("Post Deleted Successfully...");
            return data.posts;
        } catch (error) {
            console.log(error)
        }
    }

    const addComment = async (body) => {
        try {
            const { data } = await axios.post(`https://linked-posts.routemisr.com/comments`, body, {
                headers,
            });
            toast.success("Comment Added Successfully...")
            return data.comments;
        } catch (error) {
            console.log(error)
        }
    }

    const getPostComments = async (id) => {
        try {
            const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${id}/comments`, {
                headers,
            });
            return data.comments;
        } catch (error) {
            console.log(error)
        }
    }

    const deleteComment = async (id) => {
        try {
            const { data } = await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, {
                headers,
            });
            toast.success("Comment Deleted Successfully...");
        } catch (error) {
            console.log(error)
        }
    }

    return <postContext.Provider
        value={
            { getAllPosts, getUserInfo, getUserPosts, addComment, deleteComment, addPost, deletePost, getPostComments, getPost }
        }>
        {children}
    </postContext.Provider>
}