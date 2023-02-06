// extracted from: 
// https://github.com/Mcsavvy/contextlib/blob/7209bfa124679426c57e50698b7737e027c436ff/src/contextlib.ts
// failed to import this module, so decided to extract here

export interface Success<T> {
    result: T
    suppressed?: false
}

export interface Failure {
    error: unknown
    suppressed: true
}

export type Result<T> = Success<T> | Failure

interface ContextManager<T = unknown> {
    /**this method is called when the context is being entered, the return value is
     * passes to the context body as argument
     */
    enter: () => T
    /**this method is called whe the context is being left
     * if an error is throw in the context body, the error
     * is passed to this method. return a true value to suppress
     * the error
     */
    exit: (err?: unknown) => unknown
}

/**
 * The With function manages context, it enters the given context on invocation
 * and exits the context on return.
 * It accepts two arguments, a context manager and a callback.
 * The callback is called with the context manager's return value as argument.
 * If an error is raised in the callback, the context manager's `exit()` method
 * is called with the error as argument.
 * If the context manager's `exit()` method returns true, the error is suppressed.
 * If the context manager's enter does not raise an error, and no error is raised
 * within the callback, exit will be called w/o args.
 * @param manager the context manager for this context
 * @param body the body function for this context*/
export function With<T, R = unknown>(manager: ContextManager<T>, body: (val: T) => R): Result<R> {
    const val = manager.enter();
    let result: Success<R> | undefined;
    try {
        result = {result: body(val)};
    } catch (error) {
        if (manager.exit(error) !== true) {
            throw error;
        }
        return {
            error,
            suppressed: true,
        };
    }
    manager.exit();
    return result;
}