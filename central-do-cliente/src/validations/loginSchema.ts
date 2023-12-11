import { z } from "zod";

const validateCPF = (cpf: string) => {
 return true
};

const validateDate = (date: string) => {
  const [year, month, day] = date.split("-");
  const dateObj = new Date(`${month}/${day}/${year}`);
  if (dateObj.getFullYear() !== Number(year)) return {valid: false, message: "Ano inválido"};
  if (dateObj.getMonth() + 1 !== Number(month)) return {valid: false, message: "Mês inválido"};
  if (dateObj.getDate() !== Number(day)) return { valid: false, message: "Dia inválido" };
  const today = new Date();
  if(dateObj > today) return { valid: false, message: "Data maior que a data atual" };
  today.setFullYear(today.getFullYear() - 18);
  if (dateObj > today) return { valid: false, message: "Você deve ter mais de 18 anos" };
  return { valid: true, message: "" };
};

const loginSchema = z.object({
  cpf: z
    .string()
    .min(11)
    .max(11)
    .refine(validateCPF, { message: "CPF inválido" }),
    birth: z
    .string()
    .min(10, "Data de nascimento deve ter 10 caracteres")
    .max(10, "Data de nascimento deve ter 10 caracteres")
    .superRefine((date, ctx) => {
      const validation = validateDate(date);
      if (!validation.valid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: validation.message,
        });
      }
    }),
});

export default loginSchema;
