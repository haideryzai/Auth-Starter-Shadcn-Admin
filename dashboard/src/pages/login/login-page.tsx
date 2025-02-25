import { Form } from "@components/ui/form";
import { toast } from "sonner";
import Text from "@components/commons/text";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schmas/login-schema";
import TextInput from "@components/inputs/text-input";
import PasswordInput from "@components/inputs/password-input";
import { Button } from "@components/ui/button";
import useAuthOperations from "@hooks/use-auth-operations";
import { useTranslation } from "react-i18next";
import publicApi from "@apis/instances/public-api";

type FormType = {
  email: string;
  password: string;
};

export function Login() {
  const { login } = useAuthOperations();
  const { t } = useTranslation();
  const form = useForm<FormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormType) {
      try {
        const response = await publicApi.post('/auth/login', values);
        if (response.status === 200) {
          toast.success('Login successful');
          login(response.data);
        } else {
          toast.error('Unexpected response from server');
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized: Wrong username or password');
        }else if(error.response.data.message) {
          toast.error(error.response.data.message);
        }
         else {
          toast.error('An error occurred while logging in');
        }
        console.error('Error in API call:', error);
      }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border rounded-lg p-4 space-y-4 w-full sm:w-[400px]"
      >
        <div>
          <Text size="xxl">{t("login.loginHere")}</Text>
          
        </div>

        <TextInput
          label={t("login.username")}
          placeholder={t("login.enterUsername")}
          name="email"
          withAsterisk
          form={form}
        />

        <PasswordInput
          label={t("login.password")}
          placeholder={t("login.enterPassword")}
          name="password"
          withAsterisk
          form={form}
        />

        <Button type="submit" fullWidth>
          {t("login.login")}
        </Button>
      </form>
    </Form>
  );
}
