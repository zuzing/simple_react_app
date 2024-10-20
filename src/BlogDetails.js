import './Blog.css';
import {getBlog, deleteBlog} from './blogsCRUD.js';
import ErrorComponent from './ErrorComponent.js';
import {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";

export default function BlogDetails(){
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handleDelete(){
        deleteBlog(id, setError, navigate)
    }
    function handleEdit(){
        navigate('/edit/' + id, {state : { initialTitle: blog.title, initialContent: blog.content}});
    }

    useEffect(() => {
        getBlog(id, setBlog, setError).then(setLoading(false));
    },[id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <ErrorComponent error={error} />;
    }

    return (
            <div className="blog-details" key={id}>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-body">{blog.content}</p>
                <div className="button-group">
                    <button className="delete-button" onClick={() => handleDelete()}>Delete</button>
                    <button className="edit-button" onClick={() => handleEdit()}>Edit</button>
                </div>
            </div>
    );
};