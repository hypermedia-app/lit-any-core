import TemplateRegistry from '.'

interface RegistryConstructor<TBuilder, TCriteria> {
    new (
        builder: BuilderConstructor<TBuilder, TCriteria>,
        name: string
    ): TemplateRegistry<TBuilder, TCriteria>;
}

interface BuilderConstructor<TBuilder, TCriteria> {
    new (reg: TemplateRegistry<TBuilder, TCriteria>): TBuilder;
}

export default function factory<TBuilder, TCriteria>(
    Registry: RegistryConstructor<TBuilder, TCriteria>,
    map: { [name: string]: TemplateRegistry<TBuilder, TCriteria> },
    Builder: BuilderConstructor<TBuilder, TCriteria>,
    name: string
): TemplateRegistry<TBuilder, TCriteria> {
    if (!map[name]) {
        // eslint-disable-next-line no-param-reassign
        map[name] = new Registry(Builder, name || 'default')
    }

    return map[name]
}
