import { useRouter } from 'next/router'

import { Main } from '@fluent-blocks/react'

export default function AppOneUp() {
  const router = useRouter()
  const { appid } = router.query
  return (
    <Main
      {...{
        title: `${appid} Analytics`,
        abstract: 'Analytics for specific app here.',
      }}
    />
  )
}
