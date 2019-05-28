import { html, TemplateResult } from 'lit-html'

interface TemplateSelector<TCriteria> {
    matches(criteria: TCriteria): boolean;
}

interface TemplateInstance {
    name: string | null;
    render: () => TemplateResult;
}

interface Builder<TRenderFunc> {
    renders(renderFunc: TRenderFunc | TemplateResult | string): void;
}

export abstract class TemplateRegistryBase<TCriteria> {
    protected _templates: {
        selector: TemplateSelector<TCriteria>;
        templateFunc: () => TemplateResult;
        name: string | null;
    }[] = []

    public name: string

    protected constructor(name: string) {
        this.name = name
    }

    public get count() {
        return this._templates.length
    }

    public getTemplate(criteria: TCriteria): TemplateInstance | null {
        let selectedTemplate
        if (criteria !== null && typeof criteria !== 'undefined') {
            selectedTemplate = this._templates.find(template => template.selector.matches(criteria))
        }

        if (!selectedTemplate) {
            return null
        }

        return {
            render: selectedTemplate.templateFunc,
            name: selectedTemplate.name || null,
        }
    }

    public push(
        selector: TemplateSelector<TCriteria>,
        templateFuncOrResult: (() => TemplateResult) | TemplateResult | string,
        name: string | null = null
    ) {
        let templateFunc

        if (typeof templateFuncOrResult === 'string') {
            templateFunc = () => html`templateFuncOrResult`
        } else if (templateFuncOrResult instanceof TemplateResult) {
            templateFunc = () => templateFuncOrResult
        } else {
            templateFunc = templateFuncOrResult
        }

        this._templates.push({
            selector,
            templateFunc,
            name,
        })
    }
}

// eslint-disable-next-line max-len
export default abstract class <TBuilder extends Builder<TRenderFunc>, TCriteria, TRenderFunc extends () => TemplateResult> extends TemplateRegistryBase<TCriteria> {
    public get when() {
        return this._createBuilder()
    }

    protected abstract _createBuilder(): Builder<TRenderFunc>;
}
