// @ts-ignore
import { expect } from '@open-wc/testing'
import * as sinon from 'sinon'
import { html, TemplateResult } from 'lit-html'
import TemplateSelectorBase from '../template-registry/TemplateSelector'

class TemplateSelector extends TemplateSelectorBase<{}> {
    // eslint-disable-next-line class-methods-use-this
    public get templateFunc(): () => TemplateResult {
        return () => html``
    }

    // eslint-disable-next-line class-methods-use-this
    public shouldMatch(criteria: {}): boolean {
        return true
    }
}

describe('TemplateSelector', () => {
    let selector: TemplateSelector

    beforeEach(() => {
        selector = new TemplateSelector()
    })

    describe('matches', () => {
        it('should match when all matchers return true', () => {
            // given
            selector.push(() => true)
            selector.push(() => true)
            selector.push(() => true)

            // then
            expect(selector.matches({})).to.be.true
        })

        it('should not match when any matcher returns false', () => {
            // given
            selector.push(() => true)
            selector.push(() => false)
            selector.push(() => true)

            // then
            expect(selector.matches({})).to.be.false
        })

        it('should call matcher with passed arguments', () => {
            // given
            const value = {}
            const property = 'p'
            const scope = 'demo'
            const spy = sinon.spy()
            selector.push(spy)

            // when
            selector.matches({ value, property, scope })

            // then
            expect(spy.calledWith({ value, property, scope })).to.be.true
        })
    })
})
