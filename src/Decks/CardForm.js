import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api/index"

export default function CreateForm({deck, creating, card}) {

    const { deckId, cardId } = useParams();

    const history = useHistory()

    const initialFormState = {
        front: "",
        back: "",
        id: cardId,
        deckId: parseInt(deckId)
    }
    const [formData, setFormData] = useState({ ...initialFormState })
    const [front, setFront] = useState(card.front)
    const [back, setBack] = useState(card.back)


    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
    }

    const handleFrontChange = ({target}) => {
        setFront(target.value)
    }

    const handleBackChange = ({target}) => {
        setBack(target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(creating) {
        await updateCard(formData); }
        else {
            await updateCard({front:front, back:back, id:cardId, deckId: parseInt(deckId)})
        }

        setFormData({ ...initialFormState })
        setFront(card.front)
        setBack(card.back)
        history.push(`/decks/${deck.id}`)
    }

    const handleCancel = (event) => {
        setFormData({ ...initialFormState })
        setFront(card.front)
        setBack(card.back)
        history.push(`/decks/${deck.id}`)
    }

    if(creating) {
        return (
            <div>
        <h2>{deck.name}: Create Card</h2>
            <div className="d-flex flex-column">
                <form onSubmit={handleSubmit}>
                <div className="p-2">
                    <label className="pr-2" for="front">Front:</label>  
                    <textarea
                            id="front"
                            name="front"
                            type="textarea"
                            required={true}
                            rows="3"
                            cols="50"
                            value={front}
                            placeholder={`${card.front}`}
                            onChange={handleFrontChange}
                            ></textarea>
                        </div>
                    <div className="p-2">
                    <label className="pr-2" for="back">Back:</label>  
                    <textarea
                        id="back"
                        name="back"
                        type="textarea"
                        required={true}
                        rows="3"
                        cols="50"
                        value={formData.back}
                        onChange={handleChange}
                        ></textarea>
                        </div>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-info">Submit Card</button>
                </form>
            </div>
            </div>
            )
    }

    else {
        return (
            <div>
                <h2>Edit Card</h2>
                <div className="d-flex flex-column">
                    <form onSubmit={handleSubmit}>
                        <div className="p-2">
                            <label className="pr-2" htmlFor="front">Front:</label>
                            <textarea
                                id="front"
                                name="front"
                                type="textarea"
                                required={true}
                                rows="3"
                                cols="50"
                                value={front}
                                placeholder={`${card.front}`}
                                onChange={handleFrontChange}
                            ></textarea>
                        </div>
                        <div className="p-2">
                            <label className="pr-2" for="back">Back:</label>
                            <textarea
                                id="back"
                                name="back"
                                type="textarea"
                                required={true}
                                rows="3"
                                cols="50"
                                value={back}
                                placeholder={`${card.back}`}
                                onChange={handleBackChange}
                            ></textarea>
                        </div>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-info">Submit Update</button>
                    </form>
                </div>
            </div>
            )
    }
        
}