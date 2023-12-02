import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useModalsContext } from "../../contexts/ModalsContext";
import { useSignInMutation } from "../../redux/services/auth/authApiService";

const LogininSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required").min(8).max(21),
});

export default function LoginForm() {
    const [SignIn, { isLoading }] = useSignInMutation();
    const { closeLoginModal } = useModalsContext();

    //FormHook
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginRequest>({
        mode: "all",
        resolver: yupResolver(LogininSchema),
    });

    //SubmitForm
    const onSubmit = async (data: LoginRequest) => {
        try {
            await SignIn(data).unwrap();
            toast.success("Login Successfuly");
            closeLoginModal();
        } catch (error) {
            const _error = error as { message: string };
            console.log(_error);
            toast.error(_error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextInput error={errors.username?.message} {...register("username")} label="Username" withAsterisk description="Enter username" />

                <PasswordInput
                    error={errors.password?.message}
                    {...register("password")}
                    label="Password"
                    withAsterisk
                    description="Enter your password"
                />
                <Button fullWidth type="submit" loading={isLoading}>
                    Login
                </Button>
            </Stack>
        </form>
    );
}
