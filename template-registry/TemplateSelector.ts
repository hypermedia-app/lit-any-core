interface TemplateSelector<TCriteria> {
    matches(criteria: TCriteria): boolean;
}

// eslint-disable-next-line max-len
export default abstract class TemplateSelectorBase<TCriteria> implements TemplateSelector<TCriteria> {
    public name = ''

    private _matchers: ((criteria: TCriteria) => boolean)[] = []

    public matches(criteria: TCriteria) {
        if (!this.shouldMatch(criteria)) {
            console.warn('Cannot render view for', criteria)
            return false
        }

        return this._matchers.every(matcher => matcher.call(matcher, criteria))
    }

    public push(matcher: (criteria: TCriteria) => boolean) {
        this._matchers.push(matcher)
    }

    public abstract shouldMatch(criteria: TCriteria): boolean
}
