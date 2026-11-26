export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly fieldErrors?: Record<string, string[]>,
    public readonly reason?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Extrait le message et les erreurs de champs renvoyés par le backend.
 */
export async function parseApiError(response: Response, fallback: string): Promise<ApiError> {
  let message: string | undefined;
  let fieldErrors: Record<string, string[]> | undefined;
  let reason: string | undefined;

  try {
    const json: unknown = await response.json();
    if (json && typeof json === "object") {
      const payload = json as { message?: unknown; errors?: unknown; reason?: unknown };
      if (typeof payload.reason === "string") reason = payload.reason;
      if (typeof payload.message === "string" && payload.message.trim()) {
        message = payload.message;
      }
      if (payload.errors && typeof payload.errors === "object" && !Array.isArray(payload.errors)) {
        const normalizedErrors: Record<string, string[]> = {};
        for (const [field, value] of Object.entries(payload.errors)) {
          const messages = (Array.isArray(value) ? value : [value]).filter(
            (item): item is string => typeof item === "string" && item.length > 0
          );
          if (messages.length > 0) normalizedErrors[field] = messages;
        }
        if (Object.keys(normalizedErrors).length > 0) fieldErrors = normalizedErrors;
      }
    }
  } catch {
    // Une réponse non-JSON conserve le message de repli.
  }

  const firstFieldError = fieldErrors && Object.values(fieldErrors).flat()[0];
  return new ApiError(message ?? firstFieldError ?? fallback, response.status, fieldErrors, reason);
}