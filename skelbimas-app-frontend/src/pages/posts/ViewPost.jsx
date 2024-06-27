import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../service/PostService/PostService";
import UserService from "../../service/UserService/UserService";
import CommentService from "../../service/CommentService/CommentService";

function ViewPost() {
    const { id } = useParams();

    const [postData, setPostData] = useState({
        id: null,
        name: '',
        description: '',
        price: 0,
        photo: '',
        city: '',
        category: ''
    });
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [profileInfo, setProfileInfo] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState('');

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const post = await PostService.getPostById(id);
                console.log("Fetched post data:", post);
                setPostData({
                    id: post.id,
                    name: post.name,
                    description: post.description,
                    price: post.price,
                    photo: post.photo,
                    city: post.city,
                    category: post.category
                });
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const allComments = await CommentService.getAllComments();
                const filteredComments = allComments.filter(comment => comment.postId === parseInt(id));
                setComments(filteredComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchPostData();
        fetchComments();
    }, [id]);

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const profileResponse = await UserService.getYourProfile(token);
            setProfileInfo(profileResponse.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const handleAddComment = async (event) => {
        event.preventDefault();
        try {
            if (!profileInfo || !profileInfo.id) {
                throw new Error('User profile not available or missing ID');
            }
            const commentData = {
                userId: profileInfo.id,
                postId: id,
                username: profileInfo.name,
                comment: commentText
            };
            const newComment = await CommentService.addComment(commentData, profileInfo.token);
            setComments([...comments, newComment]);
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await CommentService.deleteComment(commentId);
            const updatedComments = comments.filter(comment => comment.id !== commentId);
            setComments(updatedComments);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleEditComment = async (commentId, newCommentText) => {
        try {
            if (!profileInfo || !profileInfo.id) {
                throw new Error('User profile not available or missing ID');
            }
            const editedComment = await CommentService.editComment(commentId, {
                postId: id,
                comment: newCommentText
            });
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, comment: editedComment.comment };
                }
                return comment;
            });
            setComments(updatedComments);
            setEditingCommentId(null);
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    return (
        <div className="">
            <div className="flex items-center">
                <div className="ml-48 my-20">
                    <img src={postData.photo} alt={postData.name} className="w-[35rem] h-auto border-4 border-black" />
                    <div className="flex gap-8 mt-4">
                        <p className="text-xl p-1 border-e-2 border-black">Category: {postData.category}</p>
                        <p className="text-xl p-1  border-black">City: {postData.city}</p>
                        <p className="text-xl p-1 border-s-2 border-black">Price: ${postData.price}</p>
                    </div>
                </div>
                <div className="ml-16 flex gap-8 flex-col mb-36">
                    <h1 className="text-4xl font-bold">{postData.name}</h1>
                    <p className="text-1xl break-words w-96">{postData.description}</p>
                </div>
            </div>

            <div>
                <div>
                    <div className="w-full bg-white rounded-lg pl-44 pr-24 p-12">
                        <h3 className="font-bold">Comments</h3>
                        <form onSubmit={handleAddComment}>
                            <div className="w-full px-3 my-2">
                                <textarea
                                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                    placeholder='Type Your Comment' required value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                            </div>
                            <div className="w-full flex justify-end px-3">
                                <button type='submit' className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500">Post Comment</button>
                            </div>
                        </form>

                        {comments.map((comment, index) => (
                            <div key={index} className="border rounded-md p-3 ml-3 my-3">
                                <div className="flex gap-3 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2zm0 0l5-5m0 5l5-5M6 9h12"></path>
                                    </svg>
                                    <h3 className="font-bold">{comment.username}</h3>
                                    {comment.userId === profileInfo.id && (
                                        <>
                                            <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500 hover:text-blue-500">Delete</button>
                                            {editingCommentId === comment.id ? (
                                                <>
                                                    <button onClick={() => handleEditComment(comment.id, editedCommentText)} className="text-green-500 hover:text-blue-500">Save</button>
                                                    <button onClick={() => setEditingCommentId(null)} className="text-gray-500 hover:text-blue-500">Cancel</button>
                                                </>
                                            ) : (
                                                <button onClick={() => {
                                                    setEditingCommentId(comment.id);
                                                    setEditedCommentText(comment.comment);
                                                }} className="text-yellow-500 hover:text-blue-500">Edit</button>
                                            )}
                                        </>
                                    )}
                                </div>
                                {editingCommentId === comment.id ? (
                                    <textarea
                                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                        value={editedCommentText}
                                        onChange={(e) => setEditedCommentText(e.target.value)}
                                    ></textarea>
                                ) : (
                                    <p className="text-gray-600 mt-2">{comment.comment}</p>
                                )}
                                <p className="text-gray-600 mt-2">Date: {new Date(comment.date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPost;
