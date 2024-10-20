import './Blog.css';

export default function Blog({_id, title, content}) {
    return (
        <div className="blog-post">
            <h3 className="blog-title">{title}</h3>
            <p className="blog-body">{content}</p>
        </div>
    );
}