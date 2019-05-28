/* global describe, it, beforeEach */
import { expect } from '@open-wc/testing'
import TemplateSelectorBuilder from '../template-registry/TemplateSelectorBuilder'

class TestTemplateSelectorBuilder extends TemplateSelectorBuilder {
    protected _createSelector() {
        return {}
    }
}

describe('TemplateSelectorBuilder', () => {
    let builder

    beforeEach(() => {
        builder = new TestTemplateSelectorBuilder({})
    })

    describe('adding value matcher function', () => {
        it('creates a matcher', () => {
            // given
            const valueToMatch = 'test val'

            // when
            builder.valueMatches(v => v === 'test val')

            // then
            const matcher = builder._selector._matchers[0]
            expect(matcher({
                value: valueToMatch,
            })).to.be.true
        })
    })

    describe('adding scope matcher function', () => {
        it('creates a matcher', () => {
            // given
            const valueToMatch = 'the scope'

            // when
            builder.scopeMatches(s => s === 'the scope')

            // then
            const matcher = builder._selector._matchers[0]
            expect(matcher({
                scope: valueToMatch,
            })).to.be.true
        })
    })

    describe('adding scope matcher shorthand', () => {
        it('creates a matcher', () => {
            // given
            const valueToMatch = 'the scope'

            // when
            builder.scopeMatches('the scope')

            // then
            const matcher = builder._selector._matchers[0]
            expect(matcher({
                scope: valueToMatch,
            })).to.be.true
        })
    })
})
