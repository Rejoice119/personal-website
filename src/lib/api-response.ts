import { HTTP_STATUS } from './constants';

export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Create a success response
 */
export function successResponse<T>(
  data: T,
  message: string = 'Success',
  status: number = HTTP_STATUS.OK
): ApiResponse<T> {
  return {
    success: true,
    status,
    message,
    data,
  };
}

/**
 * Create a success response for created resources
 */
export function createdResponse<T>(
  data: T,
  message: string = 'Resource created successfully'
): ApiResponse<T> {
  return successResponse(data, message, HTTP_STATUS.CREATED);
}

/**
 * Create an error response
 */
export function errorResponse(
  error: string,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  message?: string
): ApiResponse {
  return {
    success: false,
    status,
    message: message || error,
    error,
  };
}

/**
 * Create a bad request error response
 */
export function badRequestResponse(error: string, message?: string): ApiResponse {
  return errorResponse(error, HTTP_STATUS.BAD_REQUEST, message);
}

/**
 * Create an unauthorized error response
 */
export function unauthorizedResponse(
  error: string = 'Unauthorized',
  message?: string
): ApiResponse {
  return errorResponse(error, HTTP_STATUS.UNAUTHORIZED, message);
}

/**
 * Create a forbidden error response
 */
export function forbiddenResponse(
  error: string = 'Forbidden',
  message?: string
): ApiResponse {
  return errorResponse(error, HTTP_STATUS.FORBIDDEN, message);
}

/**
 * Create a not found error response
 */
export function notFoundResponse(
  error: string = 'Resource not found',
  message?: string
): ApiResponse {
  return errorResponse(error, HTTP_STATUS.NOT_FOUND, message);
}

/**
 * Create a conflict error response
 */
export function conflictResponse(
  error: string = 'Resource already exists',
  message?: string
): ApiResponse {
  return errorResponse(error, HTTP_STATUS.CONFLICT, message);
}

/**
 * Convert response to JSON for Next.js API routes
 */
export function toJson(response: ApiResponse) {
  return Response.json(response, { status: response.status });
}
