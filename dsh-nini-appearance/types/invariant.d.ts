export const name: string
export const inject: readonly string[]
export function apply(context: unknown): Promise<() => void>
