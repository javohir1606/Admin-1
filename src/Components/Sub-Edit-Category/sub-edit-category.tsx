import { useParams, useNavigate } from "react-router-dom";
import { useEditCategory } from "../../Service/Mutation/useEditCategory";
import { useGetSingleData } from "../../Service/Query/useGetSingleData";
import { FormDatas } from "../../Types/data-types";
import { message, UploadFile } from "antd";
import { ReusableForm } from "../Form";

export const SubEditCategory = () => {
  const { id } = useParams();
  const { data: singleData, isLoading } = useGetSingleData(id);
  console.log(singleData);

  const { mutate } = useEditCategory();
  const navigate = useNavigate();

  const submit = (data: FormDatas) => {
    const formData = new FormData();
    formData.append("title", data.title);
    // formData.append("parent", data.parent);

    if (data.image) {
      formData.append("image", data.image.file);
    }

    mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          navigate("/app/sub-category-list");
          message.success("U just edited sub-category");
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
      url: `${singleData?.image}`,
    },
  ];
  return (
    <>
      <ReusableForm
        submit={submit}
        data={singleData}
        isLoading={isLoading}
        defaultFileList={defaultFileList}
      />
    </>
  );
};
