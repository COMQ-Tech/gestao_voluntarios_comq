"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userFormSchema, type UserFormSchema } from "./user-form.schema";
import { USER_ROLES, type UserRole } from "@/types/user";

const UserByRoleMap: Record<UserRole, string> = {
  admin: "Administrador",
  volunteer: "Voluntário",
  leader: "Líder de GT",
};

interface UserFormProps {
  onSubmit: (data: UserFormSchema) => void | Promise<void>;
  defaultValues?: Partial<UserFormSchema>;
  isLoading?: boolean;
}

export function UserForm({ onSubmit, defaultValues, isLoading = false }: UserFormProps) {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      workGroupId: "",
      roles: [],
      ...defaultValues,
    },
  });

  async function handleSubmit(data: UserFormSchema) {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Informações do Usuário</CardTitle>
        <CardDescription>
          Preencha os dados do usuário para criar uma nova conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome completo" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (Opcional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Número de telefone com DDD
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Work Group Field */}
            <FormField
              control={form.control}
              name="workGroupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grupo de Trabalho</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um grupo de trabalho" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Tecnologia e Desenvolvimento</SelectItem>
                      <SelectItem value="2">Marketing e Comunicação</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Roles Field */}
            <FormField
              control={form.control}
              name="roles"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Perfis de Acesso</FormLabel>
                    <FormDescription>
                      Selecione pelo menos um perfil para o usuário
                    </FormDescription>
                  </div>
                  {USER_ROLES.map((role) => (
                    <FormField
                      key={role}
                      control={form.control}
                      name="roles"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={role}
                            className="flex flex-row items-center gap-2 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(role)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, role])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== role)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal capitalize">
                              {UserByRoleMap[role]}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => form.reset()}
                disabled={isLoading}
              >
                Limpar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Usuário"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}