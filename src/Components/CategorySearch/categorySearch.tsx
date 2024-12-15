import { Image, Form, Input, Flex, Typography } from "antd";

import { useState } from "react";
import { useDebounce } from "../../Config/useDebaunce";
import { useSearchCategoryQuery } from "../../Service/Query/useSearchCategoryQuery";

export const CategorySearch = () => {
  const [input, setInput] = useState("");
  const debounceValue = useDebounce(input);
  const { data } = useSearchCategoryQuery(debounceValue);
  console.log(data);

  interface SearchType {
    key: number;
    id: number;
    image: string;
    title: string;
  }

  return (
    <Form style={{ position: "relative" }}>
      <Form.Item>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
        />
      </Form.Item>
      {data?.results?.map((item: SearchType) => (
        <div key={item.id} style={{ position: "relative" }}>
          <Flex
            key={item.id}
            align="center"
            gap={"20px"}
            style={{
              zIndex: 300,
              background: "#c2b6b6",
              boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
              width: "100%",
              padding: "20px",
              borderRadius: "20px",
              position: "absolute",
            }}
          >
            <Image width={"100px"} src={item.image} alt="#" />
            <Typography.Title level={3}>{item.title}</Typography.Title>
          </Flex>
        </div>
      ))}
    </Form>
  );
};
