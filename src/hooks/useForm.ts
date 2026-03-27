import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(2, "Имя должно быть от 2 символов").max(64, "Максимум 64 символа"),
  username: z.string().min(2).max(64),
  email: z.string().email("Неверный формат email"),
  city: z.string().min(2).max(64),
  phone: z.string().regex(/^\d+$/, "Телефон должен содержать только цифры"),
  companyName: z.string().min(2).max(64),
   avatar: z.string().optional(), 
});

export type UserFormData = z.infer<typeof userFormSchema>;