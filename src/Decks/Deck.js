import {useRouteMatch, Route, Switch} from "react-router-dom";
import React from "react";
import StudyDeck from "./StudyDeck"
import EditDeck from "./EditDeck"
import ViewDeck from "./ViewDeck"
import CreateDecks from "./CreateDecks";
import AddCard from "./AddCard"
import EditCard from "./EditCard"


export default function Deck() {
    const {url} = useRouteMatch();

    return (
    <div>
        <Switch>
        <Route path = {`${url}/new`}>
          <CreateDecks />
        </Route>
        <Route path = {`${url}/:deckId/study`}>
          <StudyDeck />
        </Route>
        <Route path = {`${url}/:deckId/cards/new`}>
          <AddCard />
        </Route>
        <Route path = {`${url}/:deckId/cards/:cardId/edit`}>
          <EditCard />
        </Route>
        <Route path = {`${url}/:deckId/edit`}>
          <EditDeck />
        </Route>
        <Route path = {`${url}/:deckId`}>
            <ViewDeck />
          </Route>
        </Switch>
    </div>
    )
}