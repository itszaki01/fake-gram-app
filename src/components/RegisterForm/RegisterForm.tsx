import { Button, Flex, PasswordInput, Stack, TextInput } from "@mantine/core";
import ImageDropZone from "./ImageDropZone/ImageDropZone";
import { useForm } from "react-hook-form";
import { SignUpRequset } from "../../types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useModalsContext } from "../../contexts/ModalsContext";
import { useSignUpMutation } from "../../redux/services/auth/authApiService";

const SignUpSchema = yup.object().shape({
    email: yup.string().email("Please Inter A Valid Email").required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required").min(8).max(21),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
    name: yup.string().required("Email is required"),
});

export default function RegisterForm() {
    const [SignUp, { isLoading }] = useSignUpMutation();
    const { closeRegisterModal } = useModalsContext();
    //FormHook
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm<SignUpRequset>({
        mode: "all",
        defaultValues: {
            image: null,
        },
        resolver: yupResolver(SignUpSchema),
    });

    //SubmitForm
    const onSubmit = async (data: SignUpRequset) => {
        try {
            await SignUp(data).unwrap();
            toast.success("Account Created Successfuly");
            closeRegisterModal();
        } catch (error) {
            const _error = error as { message: string };
            console.log(_error);
            toast.error(_error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Flex  gap={5} justify="space-between" align="flex-start">
                    <TextInput
                        error={errors.username?.message}
                        {...register("username")}
                        label="Username"
                        withAsterisk
                        description="Enter username"
                    />
                    <TextInput error={errors.name?.message} {...register("name")} label="Fullname" withAsterisk description="Enter your fullname" />
                </Flex>
                <TextInput error={errors.email?.message} {...register("email")} label="Email" withAsterisk description="Enter your email" />
                <PasswordInput
                    error={errors.password?.message}
                    {...register("password")}
                    label="Password"
                    withAsterisk
                    description="Enter your password"
                />
                <PasswordInput error={errors.confirmPassword?.message} {...register("confirmPassword")} withAsterisk description="Confirm password" />
                <ImageDropZone setValue={setValue} register={register} />
                <Button fullWidth type="submit" loading={isLoading}>
                    Register
                </Button>
            </Stack>
        </form>
    );
}
