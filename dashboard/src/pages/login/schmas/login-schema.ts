import { requiredString } from "@helpers/form-schemas-validators";
import { z } from "zod";

export const loginSchema = z.object({
  email: requiredString("Username is required!"),
  password: requiredString("Password is required!"),
});
