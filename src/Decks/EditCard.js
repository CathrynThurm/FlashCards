import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api/index"
import CreateForm from "./CardForm"

export default function EditCard() {
    const { deckId, cardId } = useParams();

    const [deck, setDeck] = useState([])
    const [card, setCard] = useState([])

    useEffect(() => {
        const abortController = new AbortController();

        readCard(cardId, abortController.signal).then(setCard).catch(e => console.log(e))
        console.log(card)

        return () => abortController.abort()
    }, [deckId])

    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setDeck).catch(e => console.log(e))

        return () => abortController.abort()
    }, [deckId])

    if (deck.id) {
        return (
            <div className="container">
                <CreateBreadcrumb deck={deck} card={card} />
                <CreateForm deck={deck} creating={false} card={card} />
            </div>
        )
    }
    else {
        return <p>Loading...</p>
    }

}

function CreateBreadcrumb({ deck, card }) {

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
            </ol>
        </nav>)
}
