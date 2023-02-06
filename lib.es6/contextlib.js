// extracted from: 
// https://github.com/Mcsavvy/contextlib/blob/7209bfa124679426c57e50698b7737e027c436ff/src/contextlib.ts
// failed to import this module, so decided to extract here
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
export function With(manager, body) {
    var val = manager.enter();
    var result;
    try {
        result = { result: body(val) };
    }
    catch (error) {
        if (manager.exit(error) !== true) {
            throw error;
        }
        return {
            error: error,
            suppressed: true,
        };
    }
    manager.exit();
    return result;
}
