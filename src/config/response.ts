export const ERROR = 'error'
export const SUCCESS = 'success'

export interface IResponse{
    status: typeof ERROR | typeof SUCCESS;
    message: string;
    data: any;
}

export function newErrorResponse(error: string): IResponse{
    return {
        status: ERROR,
        message: error,
        data: null
    }
}

export function newDetailedResponse(params: any, body: any, data: any, message: string): IResponse{
    return {
        status: SUCCESS,
        message: message,
        data: {response: data, request: {params: params, body: body}},
    }
}

export function newResponse(data: any, message: string): IResponse{
    return {
        status: SUCCESS,
        message: message,
        data: {response: data, request: {params: null, body: null}},
    }
}

export const ERROR_OCCURRED = 'An Error Occurred';
export const MISSIN_INPUTS = 'Missing Inputs';
export const INPUTS_MISSMATCH = 'Inputs Missmatch';