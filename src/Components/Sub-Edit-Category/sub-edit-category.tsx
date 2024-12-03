import { useParams, useNavigate } from "react-router-dom";
import { useEditCategory } from "../../Service/Mutation/useEditCategory";
import { useGetSingleData } from "../../Service/Query/useGetSingleData";
import { FormDatas } from "../../Types/data-types";
import { message } from "antd";
import { SubCategoryForm } from "../Sub-Category-Form";

export const SubEditCategory = () => {
  const { id } = useParams();
  const { data: singleData } = useGetSingleData(id);
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
          message.success("gap yo");
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
      <SubCategoryForm submit={submit} data={singleData} />
    </>
  );
};
