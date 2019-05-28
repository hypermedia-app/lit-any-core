import { TemplateRegistryBase } from '.'

interface RegistryConstructor<TRegistry, TBuilder, TCriteria> {
    new (
        builder: BuilderConstructor<TBuilder, TCriteria>,
        name: string
    ): TRegistry;
}

interface BuilderConstructor<TBuilder, TCriteria> {
    new (reg: TemplateRegistryBase<TCriteria>): TBuilder;
}

// eslint-disable-next-line max-len
export default function factory<TRegistry extends TemplateRegistryBase<TCriteria>, TBuilder, TCriteria>(
    Registry: RegistryConstructor<TRegistry, TBuilder, TCriteria>,
    map: { [name: string]: TRegistry },
    Builder: BuilderConstructor<TBuilder, TCriteria>,
    name: string
): TRegistry {
    if (!map[name]) {
        // eslint-disable-next-line no-param-reassign
        map[name] = new Registry(Builder, name || 'default')
    }

    return map[name]
}
