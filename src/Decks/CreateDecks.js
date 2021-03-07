import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {createDeck, readDeck} from "../utils/api/index"


export default function CreateDecks() {
    const history = useHistory();

    const initialFormState = {
        name: "",
        description: ""
    }

    const [formData, setFormData] = useState({...initialFormState})
    //let [result, setResult] = useState([])

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value})
    }

    const handleSubmit = async (event) => { 
        event.preventDefault()
        
        await createDeck(formData);

        setFormData({...initialFormState})
        history.push("/")
    }

    const handleCancel = (event) => {
        setFormData({...initialFormState})
        history.push("/")
    }

    return (
            <div className="container">
            <CreateBreadcrumb />
            <h2>Create Deck</h2>
                <div className="d-flex flex-column">
                    <form onSubmit={handleSubmit}>
                        <div className="p-2">
                        <label className="pr-2" for="name">Deck Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required={true}
                            value={formData.name}
                            onChange={handleChange}
                                />
                        </div>
                        <div className="p-2">
                        <label className="pr-2" for="description">Deck Description:</label>  
                        <textarea
                            id="description"
                            name="description"
                            type="textarea"
                            required={true}
                            rows="3"
                            cols="50"
                            value={formData.description}
                            onChange={handleChange}
                            ></textarea>
                            </div>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-info">Submit Deck</button>
                    </form>
                </div>
            </div>)
}

function CreateBreadcrumb() {

    return (
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
    </ol>
    </nav>)
}