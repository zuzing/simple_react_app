const url = process.env.REACT_APP_BLOGS_API;

function getBlog(id, setBlog, setError){
    return fetch(url+'/'+id)
        .then((res) => {
            if (!res.ok) {
                throw Error('Failed to fetch data.');
            }
            return res.json();
        })
        .then((data) => {
            setBlog(data);
        })
        .catch((err) => {
            setError(err);
        });
}

function createBlog(blog, setError, redirect){
    return fetch(url+'/create', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: blog.title, content: blog.content}),
    })
        .then(res => {
            if(!res.ok){
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((_id)=>{
            redirect('/blogs/' + _id);
        })
        .catch((err) => {
            setError(err);
        });
};

function editBlog(blog, setError, redirect){
    return fetch(url+'/'+blog.id, {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: blog.title, content: blog.content}),
    })
        .then(res => {
            if(!res.ok){
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            redirect('/blogs/' + blog.id);
        })
        .catch((err) => {
            setError(err);
        });
};

function deleteBlog(id, setError, redirect){
    return fetch(url+'/'+id,{method:'DELETE'})
        .then(res => {
            if(!res.ok){
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            redirect('/')
        })
        .catch((err) => {
            setError(err);
        });
}


export {getBlog, createBlog, editBlog,  deleteBlog};
