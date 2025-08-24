# Documento de Design - Tela de Cadastro de Usuário

## Visão Geral

A tela de cadastro de usuário será implementada como uma nova rota no sistema, seguindo os padrões arquiteturais existentes do projeto. A funcionalidade utilizará React Hook Form com Zod para validação, mantendo consistência com os componentes UI já estabelecidos e integrando-se ao sistema de autenticação Firebase existente.

## Arquitetura

### Estrutura de Arquivos

```
app/
├── routes/
│   └── _protected.users.new.tsx          # Nova rota para cadastro
├── components/
│   ├── forms/
│   │   └── UserRegistrationForm.tsx      # Componente do formulário
│   └── ui/
│       ├── form.tsx                      # Form components do shadcn/ui
│       └── select.tsx                    # Select component do shadcn/ui
├── lib/
│   ├── types/
│   │   ├── user.ts                       # Tipos reutilizáveis (UserRole, etc.)
│   │   └── user-registration.ts          # Tipos específicos do formulário
│   └── validations/
│       └── user-registration.ts          # Schema Zod
└── .server/
    ├── repositories/
    │   └── users-repository.ts           # Extensão do repositório existente
    └── services/
        └── user-registration.service.ts  # Lógica de negócio
```

### Fluxo de Dados

1. **Entrada do Usuário** → Formulário com validação em tempo real
2. **Validação Client-side** → Zod schema + React Hook Form
3. **Submissão** → Action do React Router
4. **Processamento Server-side** → Service layer + Repository
5. **Persistência** → Firebase/Local DB via repositório existente
6. **Resposta** → Redirecionamento ou exibição de erro

## Componentes e Interfaces

### UserRegistrationForm Component

```typescript
interface UserRegistrationFormProps {
  onSuccess?: (user: User) => void;
  onError?: (error: string) => void;
  className?: string;
}

// Implementação usando shadcn/ui Form com React Hook Form + Zod
const UserRegistrationForm = ({
  onSuccess,
  onError,
  className,
}: UserRegistrationFormProps) => {
  const form = useForm<UserRegistrationFormData>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      workGroup: "",
      email: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: UserRegistrationFormData) => {
    // Lógica de submissão via React Router action
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perfil *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(USER_ROLE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Outros campos seguem o mesmo padrão */}
      </form>
    </Form>
  );
};
```

### Tipos Reutilizáveis

```typescript
// Tipo reutilizável para roles do sistema
export type UserRole = "admin" | "volunteer" | "leader";

// Mapeamento de labels para exibição na UI
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrador",
  volunteer: "Voluntário",
  leader: "Líder de GT",
} as const;

// Schema Zod como fonte única da verdade
export const userRegistrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  phone: z.string().optional(),
  workGroup: z.string().min(1, "Grupo de Trabalho é obrigatório"),
  email: z.string().email("Por favor, insira um email válido"),
  role: z.enum(["admin", "volunteer", "leader"] as const, {
    required_error: "Perfil é obrigatório",
  }),
});

// Tipo inferido do schema Zod
export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;
```

## Modelos de Dados

### Estrutura do Formulário

- **fullName**: string (obrigatório, 2-100 caracteres)
- **phone**: string (opcional, formato livre)
- **workGroup**: string (obrigatório, lista pré-definida ou texto livre)
- **email**: string (obrigatório, validação de email)
- **role**: UserRole (obrigatório, valores: 'admin', 'volunteer', 'leader')

### Mapeamento para User Entity

```typescript
const mapRegistrationToUser = (data: UserRegistrationFormData): UserCreate => ({
  email: data.email,
  displayName: data.fullName,
  role: data.role,
  // phone e workGroup podem ser adicionados como campos opcionais no User type
  // ou armazenados em uma estrutura de perfil separada se necessário
});
```

## Tratamento de Erros

### Categorias de Erro

1. **Erros de Validação Client-side**

   - Campos obrigatórios vazios
   - Formato de email inválido
   - Tamanho de nome inadequado

2. **Erros de Submissão Server-side**

   - Email já cadastrado
   - Erro de conexão com banco
   - Falha na criação do usuário

3. **Erros de Rede**
   - Timeout de requisição
   - Perda de conectividade

### Estratégia de Exibição

- **Erros de campo**: Mensagem abaixo do campo específico
- **Erros gerais**: Banner no topo do formulário
- **Estados de loading**: Desabilitar formulário + spinner no botão

## Estratégia de Testes

### Testes Unitários

- Validação do schema Zod
- Funções de mapeamento de dados
- Lógica de habilitação/desabilitação do botão

### Testes de Integração

- Submissão do formulário completo
- Integração com repositório de usuários
- Fluxo de validação end-to-end

### Testes de Componente

- Renderização correta dos campos
- Comportamento de validação em tempo real
- Estados de loading e erro
- Responsividade em diferentes viewports

## Design Responsivo

### Breakpoints (seguindo Tailwind CSS)

- **Mobile** (< 768px): Layout em coluna única, campos full-width
- **Tablet** (768px - 1024px): Layout em coluna única com espaçamento otimizado
- **Desktop** (> 1024px): Layout em duas colunas ou centralizado com max-width

### Adaptações por Dispositivo

```css
/* Mobile First Approach */
.registration-form {
  @apply flex flex-col gap-4 p-4;
}

/* Tablet */
@media (min-width: 768px) {
  .registration-form {
    @apply gap-6 p-6 max-w-2xl mx-auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .registration-form {
    @apply grid grid-cols-2 gap-x-8 gap-y-6 max-w-4xl;
  }
}
```

## Integração com Sistema Existente

### Roteamento

- Nova rota: `/users/new` (protegida por autenticação)
- Integração com sistema de permissões existente
- Redirecionamento pós-cadastro para lista de usuários

### Componentes UI Utilizados

- `Form` do shadcn/ui (integração React Hook Form + Zod)
- `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`
- `Button` (com estados disabled/loading)
- `Input` (com validação visual)
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`
- `Card` (container do formulário)

### Padrões de Código

- Uso do padrão Repository existente
- Integração com sistema de sessão/autenticação
- Seguir convenções de nomenclatura do projeto
- Utilizar utilitários de classe CSS existentes
- Implementação com shadcn/ui Form components
- React Hook Form com zodResolver para validação

### Dependências Necessárias

```bash
# Dependências já existentes no projeto
- react-hook-form (verificar se já instalado)
- @hookform/resolvers (para zodResolver)
- zod (verificar se já instalado)

# Componentes shadcn/ui necessários
npx shadcn@latest add form
npx shadcn@latest add select
```

## Considerações de Performance

### Otimizações Client-side

- Lazy loading do componente se necessário (se usado em modal ou rota dinâmica)
- React Hook Form já otimiza re-renders automaticamente
- Zod schema é compilado uma vez e reutilizado

### Otimizações Server-side

- Validação eficiente no backend
- Cache de listas de grupos de trabalho
- Transações atômicas para criação de usuário

## Acessibilidade

### Conformidade WCAG 2.1

- Labels associados corretamente aos inputs
- Mensagens de erro anunciadas por screen readers
- Navegação por teclado funcional
- Contraste adequado para estados de erro
- Indicação clara de campos obrigatórios

### Implementação

```typescript
// Exemplo de campo acessível
<div className="space-y-2">
  <Label htmlFor="fullName" className="required">
    Nome Completo
    <span className="text-red-500 ml-1" aria-label="obrigatório">
      *
    </span>
  </Label>
  <Input
    id="fullName"
    {...register("fullName")}
    aria-invalid={!!errors.fullName}
    aria-describedby={errors.fullName ? "fullName-error" : undefined}
  />
  {errors.fullName && (
    <p id="fullName-error" className="text-red-500 text-sm" role="alert">
      {errors.fullName.message}
    </p>
  )}
</div>
```
