import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';

export interface EndUserProps{
    from?: 'sessionStorage' | 'localStorage',
    key?: string,
    path?: string,
    setProp?: string,
}

export interface VirtualProps extends EndUserProps, MinimalProxy {
    value?: any,
    subValue?: any,
}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export type PA = Partial<PP>

export type PE = [Partial<PP>, EventConfigs<Proxy, Actions>];

export interface Actions{
    setValue(pp: PP): PA;
    setSubValue(pp: PP): Promise<PA>;
    setPropFromValue(pp: PP): void;
    setPropFromSubValue(pp: PP): void;
}