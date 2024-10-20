import Blog from './Blog.js';
import './Blogwall.css';
import ErrorComponent from './ErrorComponent.js';
import useFetch from './useFetch.js';
import { Link } from 'react-router-dom';

export default function Blogwall() {
    const {data: blogs, loading, error}  = useFetch(process.env.REACT_APP_BLOGS_API);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <ErrorComponent error={error} />;
    }

    return (
        <div className="BlogGallery">
            {blogs.map((blog) => (
                <Link to={'/blogs/' + blog._id} style={{ textDecoration: 'none' }} key={blog._id}>
                    <Blog {...blog} />
                </Link>
            ))}
        </div>
    );
}