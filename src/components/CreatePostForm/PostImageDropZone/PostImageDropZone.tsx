import "@mantine/dropzone/styles.css";
import { useEffect, useState } from "react";
import { Text, Center, Image } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CreatePostRequest } from "../../../types/PostsTypes";

type ImageDropZomeProps = {
    setValue: UseFormSetValue<CreatePostRequest>;
    register: UseFormRegister<CreatePostRequest>;
};
export default function PostImageDropZone({ setValue, register }: ImageDropZomeProps) {
    const [files, setFiles] = useState<FileWithPath[]>([]);
    useEffect(() => {
        setValue("image", files[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} src={imageUrl} mt={5} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
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
