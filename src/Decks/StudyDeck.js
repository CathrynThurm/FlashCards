import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom"
import {readDeck, listCards} from "../utils/api/index"
import ErrorMessage from "../utils/api/ErrorMessage";

export default function StudyDeck() {
    const {deckId} = useParams()
    const [deck, setDeck] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal).then(setDeck).catch(setError)

        //return() => abortController.abort()
    }, [deckId])

    if(error) {
        return <ErrorMessage error={error} />;
    }

    return (
    <div className="container">
        <CreateBreadcrumb deck={deck} />
        <FormatDeck deck={deck} />
        <FormatCards deck={deck} />
    </div>
        )
}

function FormatDeck({deck}) {

    return (
        <section>
            <h2>{deck.name}: Study</h2>
        </section>
        )
}

function FormatCards({deck}) {

    if(deck.cards) {
        let result = <MapCards list={deck.cards}/>
        return (
            <section className="row justify-content-center">{result}</section>
        )
    }

     else {
        return <p>Loading...</p>
    }   
}

function MapCards ({list}) {

    const [front, setFront] = useState(true)
    const [currentCard, setCurrentCard] = useState(0)
    const [endDeck, setEndDeck] = useState(false)
    const history = useHistory();
    const {deckId} = useParams()

    const length = list.length;

    const handleNextClick = () => {
        if(currentCard <= (length-1)) {
            setCurrentCard(currentCard + 1)
            setFront(!front)
        }
        else {
            setEndDeck(true)
        }
    }

    if(length <= 2) {
        return(
        <div>
        <h3>Not enough cards to study.</h3>
        <p>You must have at least 3 cards to study, you currently have {length} cards.</p>
        <button
                className="btn btn-info btn-lg border"
                    type="button"
                    title="View deck"
                    onClick={ () => history.push(`/decks/${deckId}/cards/new`)}
                >Add Cards</button>
        </div>)
    }

    if (!front && list[currentCard]) {
        
        return (
            
            <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
            <div className="border p-4 h-100 d-flex flex-column">
                <p className="text-right">Card {currentCard + 1} of {length}</p>
            <h3 className="font-weight-lighter flex-fill pb-3">
                {list[currentCard].back}
            </h3>
            <button
                className="btn btn-info btn-lg border"
                    type="button"
                    onClick={() => setFront(!front)}
                >Flip</button>
             <button
                className="btn btn-secondary btn-lg border"
                    type="button"
                    onClick={handleNextClick}
                >Next</button>
            </div>
            </article>
        )
    }

    else if(front && list[currentCard]) {

        return (

    <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
    <div className="border p-4 h-100 d-flex flex-column">
        <p className="text-right">Card {currentCard + 1} of {length}</p>
    <h3 className="font-weight-lighter flex-fill pb-3">
        {list[currentCard].front}
    </h3>
    <button
                className="btn btn-info btn-lg"
                    type="button"
                    title="View deck"
                    onClick={() => setFront(!front)}
                >Flip</button>
    </div>
    </article>
            )
    }

    else {
        return (
            <div>
            <button
            className="btn btn-info btn-lg border"
                type="button"
                title="View deck"
                onClick={() => setCurrentCard(0)}
            >Restart</button>
            <button
            className="btn btn-info btn-lg border"
                type="button"
                title="View deck"
                onClick={() => history.push("/")}
            >Return Home</button>
            </div>
            )
    }
}

function CreateBreadcrumb({deck}) {

    return (
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
        </nav> )
}
