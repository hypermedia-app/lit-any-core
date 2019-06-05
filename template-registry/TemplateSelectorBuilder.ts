import { TemplateResult } from 'lit-html'
import TemplateSelector from './TemplateSelector'
import { TemplateRegistryBase } from './index'

// eslint-disable-next-line max-len
export default abstract class TemplateSelectorBuilder<TCriteria, TRenderFunc extends (...args: any[]) => (TemplateResult | string)> {
    private readonly _registry: TemplateRegistryBase<TCriteria>

    protected _selector: TemplateSelector<TCriteria>

    protected constructor(registry: TemplateRegistryBase<TCriteria>) {
        this._registry = registry
        this._selector = this._createSelector()
    }

    public renders(fn: TRenderFunc) {
        this._registry.push(this._selector, fn, '')
        return this._registry
    }

    protected abstract _createSelector(): TemplateSelector<TCriteria>
}
