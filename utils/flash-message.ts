import { cookies } from "next/headers"

const FLASH_COOKIE_NAME = "flash_message"

export interface FlashMessage {
  type: "success" | "error" | "info"
  message: string
}

export function setFlashMessage(message: FlashMessage) {
  cookies().set(FLASH_COOKIE_NAME, JSON.stringify(message), { maxAge: 5 })
}

export function getFlashMessage(): FlashMessage | null {
  const flashCookie = cookies().get(FLASH_COOKIE_NAME)
  if (!flashCookie) return null

  cookies().delete(FLASH_COOKIE_NAME)
  return JSON.parse(flashCookie.value)
}