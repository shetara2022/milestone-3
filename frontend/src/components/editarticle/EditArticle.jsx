import './/editArticle.css'
import { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function EditArticle() {
  const [post, setPost] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const getData = async () => {
      const data = await fetch(`http://localhost:3001/article/${id}`); 
    console.log("DATA inital from backed", data);

    const cleanData = await data.json();
    console.log("STUFF FROM BACKNED!!", cleanData);
    setPost(cleanData);
    setTitle(cleanData.title);
    setImage(cleanData.image);
    setDescription(cleanData.description);
    setAuthor(cleanData.author);
    setContent(cleanData.content);
  };

  useEffect(() => {
    getData();
  }, []);

  const articleEdit = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        image: image,
        date: date,
        description: description,
        author: author,
        content: content
      }),
    };

      const data = await fetch(`http://localhost:3001/article/${id}`, requestOptions).then(
          navigate("/")
      );
    
    console.log("Data!!! from edit", data);
  };
     
    return (
        <div>
            <div className="">
                <h2>Edit Article</h2>
                <form>
                    <label>Article Title: </label>
                    <input 
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={post.title}
                        onChange={(e)=> {setTitle(e.target.value)}}
                        required
                    />
                    <label>Image URL: </label>
                    <input 
                        type="url"
                        id="image"
                        name="image"
                        defaultValue={post.image}
                        onChange={(e)=> {setImage(e.target.value)}}
                    />
                    <label>Date Published</label>
                    <input 
                        type="number"
                        id="date"
                        name="date"
                        defaultValue={post.date}
                        onChange={(e)=> {setDate(e.target.value)}}
                    />
                    <label>Description: </label>
                    <input 
                        type="type"
                        id="duration"
                        name="duration"
                        defaultValue={post.description}
                        onChange={(e)=> {setDescription(e.target.value)}}
                    />
                    <label>Author: </label>
                    <input 
                        type="text"
                        id="genre"
                        name="genre"
                        defaultValue={post.author}
                        onChange={(e)=> {setAuthor(e.target.value)}}
                    />
                    <label>Content: </label>
                    <textarea
                        id="description"
                        name="description" 
                        defaultValue={post.content}
                        onChange={(e)=> {setContent(e.target.value)}}
                        required
                    />
                    <button 
                        className="btn"
                        onClick={articleEdit}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

//     return (
//         <>
//                 <div className='edit_title'>
//                     <h2 className='edit_intro'>Share your experience below. </h2>
//                 </div>
//                 <div className='form_container'>
//                     <label>Title</label>
//                 <input
//                     defaultdefaultValue={ }
//                     className="editInput"
//                     type="text"
//                     placeholder='Enter article title' />
                    
//                 <label>Image</label>
//                         <input className="editInput" type="url" placeholder='Enter url'/>
//                     <label>Date</label>
//                         <input className="editInput" type="text" placeholder='Post Date' />
//                     <label>Author</label>
//                         <input className="editInput" type="text" placeholder='Enter name' />
//                     <label>Description</label>
//                         <input className="editInput" type="text" placeholder='Describe your content' />
//                     <label>Content</label>
//                         <textarea
//                             className="editInput"
//                             type="text"
//                             placeholder='Enter content here'
//                         />
//                 <button onClick={articleEdit} className="card_btn">Update</button>
                    
//                 </div>
//         </>
//         )
// }


export default EditArticle