import './Blog.css';
import {useState} from 'react';
import {getBlog ,createBlog, editBlog} from './blogsCRUD.js'
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function Create(){
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();
    const editMode = id !== undefined;
    const {initialTitle, initialContent} = location.state || {};

    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    if (editMode && !location.state){ // component was accessed bu url
        function setBlog({title, content}){
            setTitle(title);
            setContent(content);
        }
        getBlog(id,setBlog, setError);
    }

    function handleSubmit() {
        if(editMode) {
            editBlog({id, title, content}, setError, navigate);
        }
        else {
            createBlog({title, content}, setError, navigate);
        }
    };
    function onCancel() {
        navigate(-1);
    }

    return (
        <div className="blog-details">
            <label htmlFor='title-textarea'> Title </label>
            <textarea
                id='title-textarea'
                className="blog-title-input"
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
            >
            </textarea>

            <label htmlFor='content-textarea'> Content </label>
            <textarea
                id='content-textarea'
                className="blog-body-input"
                onChange={(e) => setContent(e.target.value)}
                value = {content}
            >
            </textarea>
            <div className="button-group">
                <button className="cancel-button" onClick={onCancel}>Cancel</button>
                <button className="save-button" onClick={handleSubmit}> {editMode ? 'Save' : 'Post'} </button>
            </div>
        </div>

    );
}