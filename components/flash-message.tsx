'use client'

import { useToast } from '@/hooks/use-toast'
import { type FlashMessage } from '@/utils/flash-message'
import { useEffect } from 'react'

export function FlashMessage({ flashMessage }: { flashMessage: FlashMessage | null }) {
  const { toast } = useToast()

  useEffect(() => {
    if (flashMessage) {
      toast({
        title: flashMessage.type.charAt(0).toUpperCase() + flashMessage.type.slice(1),
        description: flashMessage.message,
        variant: flashMessage.type === 'error' ? 'destructive' : 'default',
      })
    }
  }, [toast, flashMessage])

  return null
}