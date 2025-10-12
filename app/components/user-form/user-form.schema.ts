import { USER_ROLES } from "@/types/user";
import { z } from "zod";


export const userFormSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  email: z.email('Email inválido').min(1, "Email é obrigatório"),
  phone: z.string().optional(),
  workGroupId: z.string().min(1, "Grupo de trabalho é obrigatório"),
  roles: z.array(z.enum(USER_ROLES)).min(1, "Inserir pelo menos um perfil")
});

export type UserFormSchema = z.infer<typeof userFormSchema>;