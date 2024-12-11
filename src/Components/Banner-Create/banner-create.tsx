import { message } from "antd";
import { useCreateBanner } from "../../Service/Mutation/useCreateBanner";
import { BannerForm } from "../BannerForm";
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";

export const BannerCreate = () => {
  const { mutate } = useCreateBanner();
  const navigate = useNavigate();
  const CreateBannerSubmit = (values: {
    title: string;
    description: string;
    image: { file: RcFile };
  }) => {
    const formData = new FormData();
    formData.append("", values.title);
    formData.append("title", values.title);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/banner");
      },
      onError: (err) => {
        console.log(err);
        message.error("error");
      },
    });
  };

  return (
    <>
      <BannerForm submit={CreateBannerSubmit} />
    </>
  );
};
