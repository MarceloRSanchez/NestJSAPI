import { StringUtils } from './string-utils';

export class ObjectsUtils {
    public static isObject(data: any): boolean {
        return typeof data === 'object' && data !== null;
    }

    public static isEmpty(obj: Record<string, any>): boolean {
        return !!Object.keys(obj).length;
    }

    public static getKeys(obj: Record<string, any>): string[] {
        return Object.keys(obj);
    }

    public static isInEnum(enumType: Record<string | number, any>, property: any): boolean {
        return ObjectsUtils.isValueOfObject(enumType, property);
    }

    public static isKeyOfObject(obj: Record<string, any>, property: any): boolean {
        return Object.keys(obj).includes(property);
    }

    public static isValueOfObject(obj: Record<string, any>, property: any): boolean {
        return Object.values(obj).includes(property);
    }

    public static camelizeKeys<T = Record<string, any>>(obj: Record<string, any>): T {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const val = obj[key];
                delete obj[key];
                obj[StringUtils.camelize(key)] = val;
            }
        }
        return obj as T;
    }
}
