import { useNavigate, useParams } from "react-router-dom";
import { BannerForm } from "../BannerForm";
import { FormDatas } from "../../Types/data-types";
import { message } from "antd";
import { useGetSingleBannerData } from "../../Service/Query/useGetSingleBannerData";
import { useBannerEdit } from "../../Service/Mutation/useBannerEdit";

export const BannerEdit = () => {
  const { id } = useParams();
  const { data: BannerSingleData, isLoading } = useGetSingleBannerData(id);
  const { mutate } = useBannerEdit();
  const navigate = useNavigate();
  const BannerEditSubmit = (data: FormDatas) => {
    console.log(data);
    const Dataaa = new FormData();
    Dataaa.append("title", data.title);
    Dataaa.append("description", data.description);
    if (data?.image?.file) {
      Dataaa.append("image", data?.image.file);
    }
    mutate(
      { id, data: Dataaa },
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

  return (
    <>
      <BannerForm
        submit={BannerEditSubmit}
        data={BannerSingleData}
        isLoading={isLoading}
        // defaultFileList={defaultFileList}
        BooleanImage={true}
      />
    </>
  );
};
