import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom"
import {createCard, readDeck} from "../utils/api/index"
import CreateForm from "./CardForm"


export default function AddCard() {

    const {deckId} = useParams();

    const [deck, setDeck] = useState([])

    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setDeck).catch(e => console.log(e))

        return() => abortController.abort()
    }, [deckId])

    return (
        <div className="container">
        <CreateBreadcrumb deck={deck} />
       <CreateForm deck={deck} creating={true}/>
        </div>
        )
}

function CreateBreadcrumb({deck}) {

    return (
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
            <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
        </nav> )
}

