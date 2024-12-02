import { useNavigate, useParams } from "react-router-dom";
import { useEditCategory } from "../../Service/Mutation/useeditCategory";
import { ReusableForm } from "../Form";
import { useGetSingleData } from "../../Service/Query/useGetSingleData";
import { FormDatas } from "../../Types/data-types";
import { message } from "antd";

export const EditCategory = () => {
  const { id } = useParams();
  const { data: singleData } = useGetSingleData(id);
  const { mutate } = useEditCategory();
  const navigate = useNavigate();
  const submit = (data: FormDatas) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) {
      formData.append("image", data.image.file);
    }

    mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          message.success("Edited successfully");
          navigate("/app");
        },
        onError: (err) => {
          message.error("You might miss to edit something ");
          console.log(err);
        },
      }
    );
  };
  return (
    <>
      <ReusableForm submit={submit} data={singleData} />
    </>
  );
};
