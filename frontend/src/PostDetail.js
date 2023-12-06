// import { useState,useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import useAuthenticated from "./useAuthenticated";

// export default function PostDetail() {
//     const {isAuthenticated,username} = useAuthenticated()
//     const [post,changePost] = useState({});
//     const {id} = useParams();
    
    

//     useEffect(()=> {
//         console.log(id);
//         fetch(`http://localhost:8000/posts/${id}`)
//         .then(response => response.json())
//         .then(data => changePost(data))
//     },[id])

//     return (
//         <>
//             <h1>{post.title}</h1>
//             <div dangerouslySetInnerHTML={{ __html: post.content }} />
//             <h3>{post.author}</h3>
//             {isAuthenticated && username === post.author ? 
//             <>
//                 <small> <Link to={`/post/delete/${id}`} > Delete Post </Link> </small>
//                 <br />
//                 <small> <Link to={`/post/update/${id}`} > Update Post </Link> </small>
//             </>
//             :
//             null
//             }
//         </>
//     )
    
    
// }


import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthenticated from "./useAuthenticated";

export default function PostDetail() {
    const { isAuthenticated, username } = useAuthenticated();
    const [post, changePost] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
        fetch(`http://localhost:8000/posts/${id}`)
        .then(response => response.json())
        .then(data => changePost(data));
    }, [id]);

    return (
        <div className="post-detail-container">
            {isAuthenticated && username === post.author && (
                <div className="post-actions">
                    <Link to={`/post/update/${id}`} title="Update Post">
                        <i className="fas fa-edit"></i>
                    </Link>
                    <Link to={`/post/delete/${id}`} title="Delete Post">
                        <i className="fas fa-trash"></i>
                    </Link>
                </div>
            )}
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            {(!isAuthenticated || username !== post.author) && <h3>Author: {post.author}</h3>}
        </div>
    );
}
