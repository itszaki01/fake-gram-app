import "@mantine/dropzone/styles.css";
import { useEffect, useState } from "react";
import { Text, Center, Avatar } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { SignUpRequset } from "../../../types/Auth";

type ImageDropZomeProps = {
    setValue: UseFormSetValue<SignUpRequset>;
    register: UseFormRegister<SignUpRequset>;
};
export default function ImageDropZone({ setValue, register }: ImageDropZomeProps) {
    const [files, setFiles] = useState<FileWithPath[]>([]);
    useEffect(() => {
        setValue("image", files[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Avatar key={index} src={imageUrl} size={"lg"} mt={5} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    return (
        <div>
            <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles} {...register("image")} mt={10} maxFiles={1}>
                <Text ta="center">Select / Drop Profile image here</Text>
            </Dropzone>
            <Center>{previews}</Center>
        </div>
    );
}
