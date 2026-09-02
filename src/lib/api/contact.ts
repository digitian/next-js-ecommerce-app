import { contactMessages } from "./mockdata/contact";
import type { ContactMessage } from "@/src/types/contact.types";

export async function createContactMessage(data: Omit<ContactMessage, "id" | "createdAt">): Promise<ContactMessage> {
  const newMessage: ContactMessage = {
    ...data,
    id: `msg_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  contactMessages.push(newMessage);

  return newMessage;
}
