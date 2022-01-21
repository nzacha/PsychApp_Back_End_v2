type NonFunctional<T> = T extends Function ? never : T;

export function enumToArray<T>(enumeration: T): NonFunctional<T[keyof T]>[] {
    return Object.keys(enumeration)
        .filter(key => isNaN(Number(key)))
        .map(key => (enumeration as any)[key])
        .filter(val => typeof val === "number" || typeof val === "string");
}