import { register } from 'trans-render/lib/pluginMgr.js';
export const trPlugin = {
    selector: 'beObjectifiedAttribs',
    ready: true,
    processor: async ({ target, val, attrib, host }) => {
        if (customElements.get('be-objectified') === undefined)
            return;
        const { attach } = await import('be-decorated/upgrade.js');
        const instance = document.createElement('be-objectified');
        attach(target, 'objectified', instance.attach.bind(instance));
    }
};
register(trPlugin);
