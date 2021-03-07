import React, {useState, useEffect} from "react";
import { useHistory} from "react-router-dom";
import {listDecks, deleteDeck} from "./utils/api/index";
import ErrorMessage from "./utils/api/ErrorMessage";


export default function Home() {
    const history = useHistory();

    return (
        <div>
        <div className="container">
        <button
        className="btn btn-info btn-lg"
            type="button"
            title="View deck"
            onClick={() => history.push("/decks/new")}
        >Create Deck</button>
        <DisplayDecks />
        </div>
        </div>)
}


function DisplayDecks() {
    const [decks, setDecks] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        const abortController = new AbortController();

        listDecks(abortController.signal).then(setDecks).catch(setError);

        return () => abortController.abort();
    }, []);

    if(error) {
        return <ErrorMessage error={error} />;
    }

    const result = decks.map((deck) => <FormatDecks key={deck.id} deck={deck} />);


    if(decks.length !== 0) {
        return (
            <main className="container">
            <section className="row">{result}</section>
          </main>
            )
    }
    else {
        return <p>Loading....</p>
    }
}

function FormatDecks({deck}) {
    const history = useHistory();
    const [result, setResult] = useState(false)

 /*   useEffect(() => {
        const abortController = new AbortController();

        deleteDeck(deck.id, abortController.signal)

        return () => abortController.abort();
    }, [result]);*/

    
    const handleDeleteDeck = async () => {
        const result = window.confirm("Are you sure you want to delete this deck?")

        if(result) {
            await deleteDeck(deck.id)
            window.location.reload()
        }
    }

    const length = deck.cards.length;

    return (

        <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
        <div className="border p-4 h-100 d-flex flex-column">
        <p className="text-right">{length} cards</p>
        <h2 className="font-weight-lighter flex-fill">
        {deck.name}
        </h2>
        <p>{deck.description}</p>
        <div className="row">
                    <button
                    className="border btn btn-info col"
                    type="button"
                    title="View deck"
                    onClick={() => history.push(`/decks/${deck.id}`)}
                    >View</button>
                    <button
                    className="border btn btn-info col"
                    type = "button"
                    title="Study deck"
                    onClick={() => history.push(`/decks/${deck.id}/study`)}
                    >Study</button>
                    <button
                    className="border btn btn-danger col"
                    type="button"
                    title="Delete deck"
                    onClick={handleDeleteDeck}
                    >Delete</button>
                    </div>
        </div>
        </article>
)
}