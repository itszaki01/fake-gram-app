import { Button } from "@mantine/core";
import { IconLogin } from "@tabler/icons-react";

type Props = {
    handleLoginBtnClick?: ()=> void
}
export default function LoginBtn({handleLoginBtnClick}:Props) {

    return (
        <Button onClick={handleLoginBtnClick} leftSection={<IconLogin fontSize={50} />} variant="light">
            Login
        </Button>
    );
}
