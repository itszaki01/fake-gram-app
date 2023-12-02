import { Center, Loader, MantineSize } from "@mantine/core";

export default function MyLoader(args: { size?: MantineSize }) {
    return (
        <Center>
            <Loader {...args} />
        </Center>
    );
}
