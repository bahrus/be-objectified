import {define} from 'be-decorated/DE.js';
import {BeDecoratedProps} from 'be-decorated/types.js';
import {Actions, VirtualProps, Proxy, PP, PE, ProxyProps, PA} from './types';
import {register} from 'be-hive/register.js';

export class BeObjectified extends EventTarget implements Actions{
    setValue(pp: PP): PA {
        const {from, key} = pp;
        const s = window[from!].getItem(key!);
        if(s === null) return {
            value: undefined
        };
        const value = JSON.parse(s);
        return {value} as PA;
    }
    async setSubValue(pp: ProxyProps): Promise<PA>{
        const {self, value, path} = pp;
        const {getProp} = await import('trans-render/lib/getProp.js');
        const subValue = getProp(value, path!.split('.'));
        return {
            subValue
        } as PA;
    }
    setPropFromValue(pp: PP) {
        const {value, setProp, self} = pp;
        (<any>self)[setProp!] = value;
    }
    setPropFromSubValue(pp: PP) {
        const {subValue, setProp, self} = pp;
        (<any>self)[setProp!] = subValue;
    }
}

const tagName = 'be-objectified';
const ifWantsToBe = 'objectified';
const upgrade = '*';

define<Proxy & BeDecoratedProps<VirtualProps, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            virtualProps: ['from', 'key', 'path', 'setProp', 'value'],
            upgrade,
            ifWantsToBe,
            proxyPropDefaults:{
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
    complexPropDefaults:{
        controller: BeObjectified
    }
});
register(ifWantsToBe, upgrade, tagName);
    