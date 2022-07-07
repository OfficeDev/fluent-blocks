export type LinkVariants = 'primary' | 'subtle'

interface SharedLinkProps {
  link: string
  description?: string
  external?: boolean
  targetBlank?: boolean
  variant?: LinkVariants
  disabled?: boolean
}

export interface AnchorProps extends SharedLinkProps {
  href: string
}

export interface InlineButtonProps extends SharedLinkProps {
  actionId: string
}

export type LinkProps = AnchorProps | InlineButtonProps
