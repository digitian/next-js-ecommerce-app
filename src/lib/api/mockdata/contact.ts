import { ContactMessage } from "@/src/types/contact.types";

export const contactMessages: ContactMessage[] = [
  {
    id: "msg_1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Question about shipping",
    message: "Do you ship internationally?",
    createdAt: new Date().toISOString(),
  }
];
