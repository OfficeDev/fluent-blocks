import { z, ZodTypeAny } from 'zod'

export const union =
  (naturalMembers: [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]) =>
  (additionalMembers?: ZodTypeAny[]) =>
    z.union([...naturalMembers, ...(additionalMembers || [])])
