import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {updateDeck, readDeck} from "../utils/api/index"


export default function CreateDecks() {
    const history = useHistory();
    const {deckId} = useParams();

    const [deck, setDeck] = useState([])
    const [name, setName] = useState(deck.name)
    const [description, setDescription] = useState(deck.description)

    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setDeck).catch(e => console.log(e))

        return() => abortController.abort()
    }, [deckId])


    const handleNameChange = ({target}) => {
        setName(target.value)
    }

    const handleDescriptionChange = ({target}) => {
        setDescription(target.value)
    }

    const handleSubmit = async (event) => { 
        event.preventDefault()
        
        await updateDeck({name:name, description:description, id:deckId})

        setName(deck.name)
        setDescription(deck.description)
        history.push("/")
    }

    const handleCancel = (event) => {
        
        setName(deck.name)
        setDescription(deck.description)
        history.push("/")
    }

    if(deck.name) {

        return (
            <div className="container">
            <CreateBreadcrumb deck={deck} />
            <h2>Edit Deck: {deck.name}</h2>
                <div className="d-flex flex-column">
                    <form onSubmit={handleSubmit}>
                        <div className="p-2">
                        <label className="pr-2" for="name">Deck Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required={true}
                            value={name}
                            placeholder={`${deck.name}`}
                            onChange={handleNameChange}
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
                            value={description}
                            placeholder={`${deck.description}`}
                            onChange={handleDescriptionChange}
                            ></textarea>
                            </div>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-info">Submit Update</button>
                    </form>
                </div>
            </div>)
    }
    else {
        console.log(deck.name)
        return <p>Loading...</p>
    }

}

function CreateBreadcrumb({deck}) {


        return (
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
            </nav> )
    
}