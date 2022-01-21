export function tryCatch(func: () => void, fail: (error: any) => void) {
    try { return func() }
    catch(e) { return fail(e) }
}

export function tryCatchReturn(func: () => void, fail: any) {
    try { return func() }
    catch(e) { return fail }
}