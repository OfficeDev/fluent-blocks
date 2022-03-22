import { z } from 'zod'
import { withGetType } from 'zod-to-ts'

export const iconVariant = z.union([z.literal('filled'), z.literal('outline')])

export const iconSize = z.union([
  z.literal(10),
  z.literal(12),
  z.literal(16),
  z.literal(20),
  z.literal(24),
  z.literal(28),
  z.literal(32),
  z.literal(48),
  z.literal('10'),
  z.literal('12'),
  z.literal('16'),
  z.literal('20'),
  z.literal('24'),
  z.literal('28'),
  z.literal('32'),
  z.literal('48'),
])

export const iconProps = withGetType(
  z.object({
    icon: z.string(),
    variant: iconVariant.default('outline').optional(),
    size: iconSize.default(16).optional(),
  }),
  (ts, identifier) =>
    ts.factory.createTypeLiteralNode([
      ts.factory.createPropertySignature(
        undefined,
        ts.factory.createIdentifier('icon'),
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
      ),
      ts.factory.createPropertySignature(
        undefined,
        ts.factory.createIdentifier('variant'),
        ts.factory.createToken(ts.SyntaxKind.QuestionToken),
        ts.factory.createTypeReferenceNode(
          ts.factory.createIdentifier('IconVariant')
        )
      ),
      ts.factory.createPropertySignature(
        undefined,
        ts.factory.createIdentifier('size'),
        ts.factory.createToken(ts.SyntaxKind.QuestionToken),
        ts.factory.createTypeReferenceNode(
          ts.factory.createIdentifier('IconSize')
        )
      ),
    ])
)
