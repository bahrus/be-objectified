import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeObjectified extends EventTarget {
    setValue(pp) {
        const { from, key } = pp;
        const s = window[from].getItem(key);
        if (s === null)
            return {
                value: undefined
            };
        const value = JSON.parse(s);
        return { value };
    }
    async setSubValue(pp) {
        const { self, value, path } = pp;
        const { getProp } = await import('trans-render/lib/getProp.js');
        const subValue = getProp(value, path.split('.'));
        return {
            subValue
        };
    }
    setPropFromValue(pp) {
        const { value, setProp, self } = pp;
        self[setProp] = value;
    }
    setPropFromSubValue(pp) {
        const { subValue, setProp, self } = pp;
        self[setProp] = subValue;
    }
}
const tagName = 'be-objectified';
const ifWantsToBe = 'objectified';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            virtualProps: ['from', 'key', 'path', 'setProp', 'value'],
            upgrade,
            ifWantsToBe,
            proxyPropDefaults: {
                from: 'sessionStorage'
            }
        },
        actions: {
            setValue: {
                ifAllOf: ['key', 'from'],
            },
            setSubValue: {
                ifAllOf: ['value', 'path']
            },
            setPropFromValue: {
                ifAllOf: ['value'],
                ifNoneOf: ['path']
            },
            setPropFromSubValue: 'subValue'
        }
    },
    complexPropDefaults: {
        controller: BeObjectified
    }
});
register(ifWantsToBe, upgrade, tagName);
