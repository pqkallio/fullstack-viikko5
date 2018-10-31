/*
    The structure of this app is what it is because it is a copy
    of the first week's assignment.

    No refactoring beyond the scope of the given exercise assignments
    5.17 and 5.18 has been performed to ameliorate the code.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import './index.css';
import { ratingsReducer } from './reducer'

const GOOD_KEY = 'good'
const NEUTRAL_KEY = 'neutral'
const BAD_KEY = 'bad'

const store = createStore(ratingsReducer)

const prosentteina = (arvo) => (arvo * 100).toFixed(1).toString() + '%'

const Button = ({ title, handleClick }) => {
    return (
        <button onClick={handleClick}>{title}</button>
    )
}

const Header = ({ title }) => {
    return (
        <div>
            <h2>{title}</h2>
        </div>
    )
}

const FeedbackButtons = ({ handleClick }) => {
    return (
        <div>
            <Button title='hyvä' handleClick={handleClick(GOOD_KEY)} />
            <Button title='neutraali' handleClick={handleClick(NEUTRAL_KEY)} />
            <Button title='huono' handleClick={handleClick(BAD_KEY)} />
        </div>
    )
}

const FeedbackDiv = ({ title, handleClick }) => {
    return (
        <div>
            <Header title={title} />
            <FeedbackButtons handleClick={handleClick} />
        </div>
    )
}

const Statistic = ({ title, value }) => {
    return (
        <tr>
            <td>{title}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ hyvia, neutraaleja, huonoja, keskiarvo, positiivisia }) => {
    const yhteensa = hyvia + neutraaleja + huonoja

    if (yhteensa === 0) {
        return (
            <div>
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <Statistic title='hyvä' value={hyvia} />
                    <Statistic title='neutraali' value={neutraaleja} />
                    <Statistic title='huono' value={huonoja} />
                    <Statistic title='keskiarvo' value={keskiarvo().toFixed(2)} />
                    <Statistic title='positiivisia' value={prosentteina(positiivisia())} />
                </tbody>
            </table>
        </div>
    )
}

const StatsDiv = ({ title, hyvia, neutraaleja, huonoja, keskiarvo, positiivisia }) => {
    return (
        <div>
            <Header title={title} />
            <Statistics hyvia={hyvia} neutraaleja={neutraaleja} huonoja={huonoja}
                keskiarvo={keskiarvo} positiivisia={positiivisia} />
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.feedback_title = 'anna palautetta'
        this.stats_title = 'statistiikka'

        this.state = {
            [GOOD_KEY]: 0,
            [NEUTRAL_KEY]: 0,
            [BAD_KEY]: 0
        }
    }

    arvosteluja = () => store.getState()[GOOD_KEY] +
        store.getState()[NEUTRAL_KEY] +
        store.getState()[BAD_KEY]

    keskiarvo = () => {
        const summa = store.getState()[GOOD_KEY] - store.getState()[BAD_KEY]
        const keskiarvo = (summa / this.arvosteluja())

        return isFinite(keskiarvo) ? keskiarvo : 0
    }

    positiivisia = () => {
        const positiivistenOsuus = store.getState()[GOOD_KEY] / this.arvosteluja()

        return isFinite(positiivistenOsuus) ? positiivistenOsuus : 0
    }

    lisaaArvostelu = (arvostelu) => () => {
        store.dispatch({ type: arvostelu })
    }

    render() {
        return (
            <div>
                <FeedbackDiv title={this.feedback_title} handleClick={this.lisaaArvostelu} />
                <StatsDiv title={this.stats_title} hyvia={store.getState()[GOOD_KEY]}
                    neutraaleja={store.getState()[NEUTRAL_KEY]} huonoja={store.getState()[BAD_KEY]}
                    keskiarvo={this.keskiarvo} positiivisia={this.positiivisia}
                />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
