
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from './postSlice';
import { Post } from './model';
import { useEffect } from 'react';
import './post.css';


function PostForm({ PostList, post, setPost, isUpdate, setIsUpdate }: any) {
    const dispatch = useDispatch();

    const Onsave = (post: Post) => {
        if (isUpdate === false) {
            dispatch(createPost(post));
            console.log('create');
        } else if (isUpdate === true) {
            dispatch(updatePost(post));
            console.log('update');

        }

    }

    const onReset = () => {
        setPost({ id: '', name: '', price: '', info: '' });
        setIsUpdate(false)
    }

    const onChangeHandler = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value
        })
    };

    return (
        <div>
            <form className='form'>
                <label>Id:</label><br />
                <input type="text" placeholder="id" name="id" value={post.id} onChange={(e) => onChangeHandler(e)} readOnly /><br />
                <label>Name:</label><br />
                <input type="text" placeholder="name" name="name" value={post.name} onChange={(e) => onChangeHandler(e)} /><br />
                <label>Price:</label><br />
                <input type="number" placeholder="price" name="price" value={post.price} onChange={(e) => onChangeHandler(e)} /><br />
                <label>Info:</label><br />
                <input type="text" placeholder="info" name="info" value={post.info} onChange={(e) => onChangeHandler(e)} /><br />
                <button type="button" onClick={() => Onsave(post)}>Save</button>
                <button type="button" onClick={() => onReset()}>Clear</button>
            </form>
        </div>
    );
}

export default PostForm;