import { useNavigate, useParams } from "react-router-dom";
import { BannerForm } from "../BannerForm";
import { FormDatas } from "../../Types/data-types";
import { message, UploadFile } from "antd";
import { useGetSingleBannerData } from "../../Service/Query/useGetSingleBannerData";
import { useBannerEdit } from "../../Service/Mutation/useBannerEdit";

export const BannerEdit = () => {
  const { id } = useParams();
  const { data: BannerSingleData, isLoading } = useGetSingleBannerData(
    Number(id)
  );

  const { mutate } = useBannerEdit(Number(id));
  const navigate = useNavigate();
  const initialValues = {
    title: BannerSingleData?.title,
    description: BannerSingleData?.description,
    image: BannerSingleData?.image,
  };

  const BannerEditSubmit = (data: FormDatas) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data?.image?.file) {
      formData.append("image", data?.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/banner");
      },
      onError: (err: any) => {
        console.log(err);
        message.error("error");
      },
    });
  };
  const defaultFileList: UploadFile[] = [
    {
      uid: "-1",
      status: "done",
      url: `${BannerSingleData?.image}`,
    },
  ];
  return (
    <>
      <BannerForm
        submit={BannerEditSubmit}
        data={initialValues}
        isLoading={isLoading}
        defaultFileList={defaultFileList}
        BooleanImage={true}
      />
    </>
  );
};
