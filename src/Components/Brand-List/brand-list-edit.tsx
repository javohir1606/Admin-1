import { message, UploadFile } from "antd";
import { useBrandEdit } from "../../Service/Mutation/useBrandEdit";
import { FormDatas } from "../../Types/data-types";
import { BrandDataForm } from "../Brand-Form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBrandData } from "../../Service/Query/useGetSingleBrandData";
import { useQueryClient } from "@tanstack/react-query";

export const BrandListEdit = () => {
  const { id } = useParams();
  const { data: BrandData, isLoading } = useGetSingleBrandData(id);
  const { mutate } = useBrandEdit();
  const navigate = useNavigate();
  const client = useQueryClient();
  const submit = (data: FormDatas) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data?.image?.file) {
      formData.append("image", data?.image.file);
    }

    mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          message.success("Edited successfully");
          navigate("/app/brand-list");
          client.invalidateQueries({ queryKey: ["brand"] });
        },
        onError: (err) => {
          message.error("You might miss to edit something ");
          console.log(err);
        },
      }
    );
  };

  const defaultFileList: UploadFile[] = [
    {
      uid: "-1",
      status: "done",
      url: `${BrandData?.image}`,
    },
  ];
  return (
    <>
      <BrandDataForm
        submit={submit}
        data={BrandData}
        isLoading={isLoading}
        defaultFileList={defaultFileList}
      />
    </>
  );
};
