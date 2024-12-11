import { useNavigate, useParams } from "react-router-dom";
import { BannerForm } from "../BannerForm";
import { FormDatas } from "../../Types/data-types";
import { message, UploadFile } from "antd";
import { useGetSingleBannerData } from "../../Service/Query/useGetSingleBannerData";
import { useBannerEdit } from "../../Service/Mutation/useBannerEdit";

export const BannerEdit = () => {
  const { id } = useParams();
  const { data: BannerSingleData, isLoading } = useGetSingleBannerData(id);
  const { mutate } = useBannerEdit();
  const navigate = useNavigate();
  const BannerEditSubmit = (values: FormDatas) => {
    console.log(values);

    const Dataaa = new FormData();
    Dataaa.append("title", values.title);
    Dataaa.append("description", values.description);
    if (values?.image?.file) {
      Dataaa.append("image", values?.image.file);
    }
    mutate(
      { id, values: Dataaa },

      {
        onSuccess: () => {
          message.success("success");
          navigate("/app/banner");
        },
        onError: (err: any) => {
          console.log(err);
          message.error("error");
        },
      }
    );
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
        data={BannerSingleData}
        isLoading={isLoading}
        defaultFileList={defaultFileList}
      />
    </>
  );
};
