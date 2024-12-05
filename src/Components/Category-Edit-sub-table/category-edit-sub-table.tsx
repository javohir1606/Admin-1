// import { message,  Table } from "antd";

// import { useQueryClient } from "@tanstack/react-query";
// import { useDeleteData } from "../../Service/Mutation/useDeleteData";
// import { useGetData } from "../../Service/Query/useGetData";

// export const CategoryEditSubTable = ({ dataSource }: any) => {
//   const { mutate } = useDeleteData();
//   const { data } = useGetData();
//   console.log("datttttttttttttttttttttt",data);

//   const client = useQueryClient();
//   const DeleteCategory = (id: number) => {
//     mutate(id, {
//       onSuccess: () => {
//         message.success("success");
//         client.invalidateQueries({ queryKey: ["get-data"] });
//       },
//       onError: (error) => {
//         console.log(error);

//         message.error("error");
//       },
//     });
//   };


//   return ;
// };
