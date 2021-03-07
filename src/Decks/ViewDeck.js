import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom"
import {readDeck, deleteDeck, deleteCard} from "../utils/api/index"
import ErrorMessage from "../utils/api/ErrorMessage";

export default function ViewDeck() {
    const {deckId} = useParams()
    const [deck, setDeck] = useState([])
    const [error, setError] = useState(undefined)


   useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setDeck).catch(setError)

        return() => abortController.abort()
    }, [deckId])

    if(error) {
        return <ErrorMessage error={error} />;
    }
    let result = ""

    if(deck.cards) {
        result = deck.cards.map((card) => <FormatCards key={card.id} card={card}/>)
    }
    else {
        result = "Loading..."
    }

        

    return (
    <div className="container">
    <CreateBreadcrumb deck={deck}/>
    <FormatDeck deck={deck} />
    <section className="container justify-content-center">
    <h2 className="pt-4">Cards:</h2>
    <div className="row">{result}</div>
    </section>
    </div>
    )
}

function FormatDeck({deck}) {
    const history = useHistory()
    const {deckId} = useParams()

    const handleDelete = async () => {
        const result = window.confirm("Are you sure you want to delete this deck?")

        if(result) {
            await deleteDeck(deck.id)
            history.push("/")
        }
    }

    return (
        <section>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <div className="d-flex">
            <button
                className="btn btn-info btn-lg border p-2"
                    type="button"
                    title="View deck"
                    onClick={ () => history.push(`/decks/${deckId}/edit`)}
                >Edit</button>
            <button
                className="btn btn-info btn-lg border p-2"
                    type="button"
                    title="View deck"
                    onClick={ () => history.push(`/decks/${deckId}/study`)}
                >Study</button>
            <button
                className="btn btn-info btn-lg border p-2"
                    type="button"
                    title="View deck"
                    onClick={ () => history.push(`/decks/${deckId}/cards/new`)}
                >Add Cards</button>
            <button
                className="btn btn-danger btn-lg border ml-auto p-2"
                    type="button"
                    title="View deck"
                    onClick={handleDelete}
                >Delete</button>
            </div>
        </section>
        )
}

function FormatCards({card}) {
    const {deckId} = useParams()
    const history = useHistory()

    const handleDelete = async () => {
        const result = window.confirm("Are you sure you want to delete this card?")

        if(result) {
            await deleteCard(card.id)
            window.location.reload()
        }
    }
    return (
        <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretc">
            <div className="border p-4 h-100 d-flex flex-column">
            <p className="font-weight-lighter flex-fill p-2">
                {card.front}
            </p>
            <p className="font-weight-lighter flex-fill p-2">
                {card.back}
            </p>
            <button
                className="btn btn-info btn-lg border"
                    type="button"
                    onClick={() => history.push(`/decks/${deckId}/cards/${card.id}/edit`)}
                >Edit</button>
             <button
                className="btn btn-danger btn-lg border"
                    type="button"
                    onClick={handleDelete}
                >Delete</button>
            </div>
            </article>
        )

}

function CreateBreadcrumb({deck}) {

    return (
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
        </nav> )
}