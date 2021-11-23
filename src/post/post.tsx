import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from './postForm';
import { getPostList, deletePost, getOnePost, searchPostList } from './postSlice';
import './post.css';
import { info } from 'console';



function Post() {
    const dispatch = useDispatch();
    const PostList = useSelector((state: any) => state.posts.list);
    const initialPost = { id: '', name: '', price: '', info: '' };
    const [isUpdate, setIsUpdate] = useState(false);
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [post, setPost] = useState(initialPost);



    const getAllPost = () => {
        if(search === ''){
            dispatch(
                getPostList({ page: page, limit: 5, search }) 
            );
            console.log('data: ', PostList);
        }else{
            dispatch(
                searchPostList(search)   
            )
            console.log('data: ', PostList);
        }
        
    };

    const removePost = (id: number) => {
        dispatch(deletePost(id));
        setPost(initialPost);
        setPage(0)
        getAllPost()

    }
    const setPostToForm = (id: number) => {
        setPost(PostList.find((post: any) => post.id === id))
        // dispatch(getOnePost(id))

        setIsUpdate(true);

    }

    const onChangeHandler = (e: any) => {
        setSearch(e.target.value);
        setPage(0);
    }
    console.log(search);
    const onPrev = () => {
        if (page <= 0) return;
        setPage(page - 1)
    }

    const onNext = () => {
        if (page >= 10) return;
        setPage(page + 1)
    }

    useEffect(() => {
        getAllPost();        
    }, [page, search, post]);

    return (
        <>
        <div className='header'></div>
        <div className="container">
            <div className="div-form">
                <PostForm PostList={PostList} post={post} setPost={setPost} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
            </div>
            <div className="div-form">
                <div className="div-search">
                    <input type="text" name="search" placeholder="Search in here" onChange={(e) => onChangeHandler(e)} />
                </div>
                <div className="div-list">
                    <ul>
                        {PostList && PostList.map((post: any, index: number) => {
                            return (<li onClick={() => setPostToForm(post.id)} >
                                id: {post.id} - name: <span style={{color:'green'}}>{post.name}</span> - price: <span style={{color: 'red'}}>{post.price}</span>
                                <button onClick={() => removePost(post.id)}>
                                    remove
                                </button>
                            </li>)
                        })}
                        <button onClick={() => onPrev()}>Prev</button>
                        <b>{page + 1}</b>
                        <button onClick={() => onNext()}>Next</button>
                    </ul>
                </div>
            </div>
        </div>
        <div className='header'></div>
        </>
    );
}

export default Post;