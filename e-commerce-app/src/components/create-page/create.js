import React from 'react'
import {Link} from 'react-router-dom'
import './create.css'
import {useState} from 'react';

const Create = () => {
    const [pic, addPics] = useState(null);
    const [picFile, addPicFile] = useState(null);
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");


    const fileHandler = event => {
        addPics(URL.createObjectURL(event.target.files[0]));
        addPicFile(event.target.files[0])
    }

    const handleSubmit = event => {
        event.preventDefault();
        var fd = new FormData();
        if (picFile != null) {
            fd.append("pictures", picFile);
        }
        fd.append("itemname", event.target[0].value);
        fd.append("price", event.target[1].value);
        fd.append("category", event.target[3].value);
        fd.append("description", event.target[2].value);
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
            body: fd
        };
        fetch('https://hkp-training-teamprj.herokuapp.com/items', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch(err => console.log("Error reading data" + err));
    }
    return (
        <div className = "create">
            <h1>Shopping</h1>
            <Link to='/main-admin'>
                <button className="create_button">Cancel</button>
            </Link>
            <h2>Add An Item</h2>
            <div className = "create_container">
            <div className = "create_image-picker">
                <div className = "create_box">
                    {pic != null ? <img src = {pic}/> : <p>Choose an image</p>}
                </div>
                <input type = "file" accept="image/*" onChange = {fileHandler}/>
            </div>
                <div className = "create_inputs">
                    <form className = "create_form" enctype="multipart/form-data" onSubmit = {handleSubmit}>
                        <label for = "name">Name</label>
                        <input type = "text" name = "name" value = {name} required onChange = {(event) => setName(event.target.value)}/>
                        <label for = "price">Price</label>
                        <input type = "number" name = "price" step = "0.25" min="0" value = {price} required onChange = {(event) => setPrice(event.target.value)} />
                        <label for = "description">Description</label>
                        <textarea name = "description" rows="5" value = {description} required onChange = {(event) => setDescription(event.target.value)}></textarea>
                        <label for = "category">Category</label>
                        <input type = "text" name = "category" value = {category} required onChange = {(event) => setCategory(event.target.value)} />
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Create