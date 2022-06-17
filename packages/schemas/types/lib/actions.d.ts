export interface ActionPayload {
  type: string
  actionId: string
  includedValues?: Record<string, string | string[] | null>
  metadata?: Record<string, string | string[] | null>
}
