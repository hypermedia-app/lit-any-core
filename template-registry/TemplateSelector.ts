import { TemplateResult } from 'lit-html'

interface TemplateSelector<TCriteria> {
    matches(criteria: TCriteria): boolean;
}

// eslint-disable-next-line max-len
export default abstract class TemplateSelectorBase<TCriteria> implements TemplateSelector<TCriteria> {
    public name = ''

    protected _matchers: ((criteria: TCriteria) => boolean)[] = []

    public matches(criteria: TCriteria) {
        if (!this.shouldMatch(criteria)) {
            console.warn('Cannot render view for', criteria)
            return false
        }

        return this._matchers.every(matcher => matcher.call(matcher, criteria))
    }

    public abstract templateFunc: () => TemplateResult

    public abstract shouldMatch(criteria: TCriteria): boolean
}
