// @ts-ignore
import { expect } from '@open-wc/testing'
import { html, TemplateResult } from 'lit-html'
import TemplateSelectorBuilder from '../template-registry/TemplateSelectorBuilder'
import { TemplateRegistryBase } from '../template-registry'

class TestTemplateSelectorBuilder extends TemplateSelectorBuilder<{}, () => TemplateResult> {
    // eslint-disable-next-line no-useless-constructor
    public constructor(r: TestRegistry) {
        super(r)
    }

    // eslint-disable-next-line class-methods-use-this
    protected _createSelector() {
        return {} as any
    }
}

class TestRegistry extends TemplateRegistryBase<{}> {
    public constructor() {
        super('test')
    }
}

describe('TemplateSelectorBuilder', () => {
    let builder: TestTemplateSelectorBuilder
    let registry: TestRegistry

    beforeEach(() => {
        registry = new TestRegistry()
        builder = new TestTemplateSelectorBuilder(registry)
    })

    describe('renders', () => {
        it('adds template to registry', () => {
            // when
            builder.renders(() => html``)

            // then
            expect(registry.count).to.equal(1)
        })
    })
})
