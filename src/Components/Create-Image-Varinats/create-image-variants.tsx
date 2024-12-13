import { RcFile } from "antd/es/upload";
import { CreateImageForm } from "../CreateImageForm/create-image-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCreataProductVariantImage } from "../../Service/Mutation/useCreataProductVariantImage";
import { message } from "antd";

export const CreateImageVariants = () => {
  const param = useParams();
  console.log("idddd", param);

  const { mutate: CreateImageMutate } = useCreataProductVariantImage();
  const navigate = useNavigate();
  const CreateImage = (values: {
    product_variant: number | string | any;
    image: { file: RcFile };
  }) => {
    const formData = new FormData();
    values.product_variant = param.productId;
    formData.append("product_variant", values.product_variant);
    if (values?.image?.file) {
      formData.append("image", values?.image?.file);
    }
    CreateImageMutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate(`/app/product/variants/${param.id}`);
      },
      onError: (err) => {
        console.log(err);
        message.error("error");
      },
    });
  };

  return <CreateImageForm submit={CreateImage} />;
};
