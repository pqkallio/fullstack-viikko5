import deepFreeze from 'deep-freeze'
import { ratingsReducer, initialState } from './reducer'

describe('Unicafe reducer', () => {
    it('should return correct initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = ratingsReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    it('good is incremented', () => {
        const action = {
            type: 'good'
        }
        const state = initialState

        deepFreeze(state)
        const newState = ratingsReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            neutral: 0,
            bad: 0
        })
    })

    it('bad is incremented', () => {
        const action = {
            type: 'bad'
        }
        const state = initialState

        deepFreeze(state)
        const newState = ratingsReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            neutral: 0,
            bad: 1
        })
    })

    it('neutral is incremented', () => {
        const action = {
            type: 'neutral'
        }
        const state = initialState

        deepFreeze(state)
        const newState = ratingsReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            neutral: 1,
            bad: 0
        })
    })
})