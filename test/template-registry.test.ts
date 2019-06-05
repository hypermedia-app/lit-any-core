/* eslint-disable class-methods-use-this,@typescript-eslint/no-non-null-assertion */
// @ts-ignore
import { expect } from '@open-wc/testing'
import { html, render, TemplateResult } from 'lit-html'
import * as sinon from 'sinon'
import TemplateRegistry from '../template-registry'

class TestBuilder {
    public renders(fn: () => TemplateResult) {

    }
}

class TestRegistry extends TemplateRegistry<TestBuilder, {}, () => TemplateResult> {
    public constructor() {
        super('test')
    }

    public get templates() {
        return this._templates
    }

    protected _createBuilder() {
        return new TestBuilder()
    }
}

describe('Template Registry', () => {
    let registry: TestRegistry

    const matchAllSelector = {
        matches: () => true,
    }

    beforeEach(() => {
        registry = new TestRegistry()
    })

    describe('initially', () => {
        it('should be empty', () => {
            expect(registry.count).to.be.equal(0)
        })
    })

    describe('when selecting template', () => {
        const templateFunc = () => html``

        it('should return name and template func', () => {
            // given
            registry.push(matchAllSelector, templateFunc, 'test-template')

            // when
            const template = registry.getTemplate({ value: 'whatever' })

            // then
            expect(template!.render).to.equal(templateFunc)
            expect(template!.name).to.equal('test-template')
        })

        it('when name not given should return null', () => {
            // given
            registry.push(matchAllSelector, templateFunc)

            // when
            const template = registry.getTemplate({ value: 'whatever' })

            // then
            expect(template!.name).to.be.null
        })

        it('should return matching template for value', () => {
            // given
            const templatePushed: any = {
                selector: {
                    matches: (c: any) => c.value === 'test',
                },
            }
            registry.templates.push(templatePushed)

            // when
            const template = registry.getTemplate({
                value: 'test',
            })

            // then
            expect(template!.name).to.be.null
        })

        it('should pass value to matcher', () => {
            // given
            const template: any = {
                selector: {
                    matches: sinon.spy(),
                },
            }
            registry.templates.push(template)

            // when
            registry.getTemplate({
                value: 'test',
            })

            // then
            expect(template.selector.matches.calledWith({
                value: 'test',
            })).to.be.true
        })

        it('should return null if not found', () => {
            // when
            const result = registry.getTemplate({
                value: 'test',
            })

            // then
            expect(result).to.be.null
        })

        it('should not call matchers if argument is null', () => {
            // given
            const template: any = {
                selector: {
                    matches: sinon.spy(),
                },
            }
            registry.templates.push(template)

            // when
            registry.getTemplate(null as any)

            // then
            expect(template.selector.matches.called).to.be.false
        })

        it('should not call matchers if argument is undefined', () => {
            // given
            const template: any = {
                selector: {
                    matches: sinon.spy(),
                },
            }
            registry.templates.push(template)

            // when
            registry.getTemplate(undefined as any)

            // then
            expect(template.selector.matches.called).to.be.false
        })
    })

    describe('when adding TemplateResult instance', () => {
        it('should wrap it as function', () => {
            // given
            registry.push(matchAllSelector, html`test`)
            const renderTarget = document.createElement('span')

            // when
            const template = registry.getTemplate({ value: 'whatever' })

            // then
            expect(template!.render).to.be.a('function')
            render(html`${template!.render()}`, renderTarget)
            expect(renderTarget.textContent).to.equal('test')
        })
    })
})
