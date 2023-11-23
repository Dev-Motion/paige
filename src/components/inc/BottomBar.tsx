import React from "react";
import { Flex } from "@components/base";
import { Quotes, Todo, ImageInfo } from "@components/inc/widgets";
import useStore from "@store";

const BottomBar = () => {
  const showTodo = useStore((state) => state.showTodo);

  return (
    <Flex
      jc="between"
      ai="center"
      css={{
        height: "8vh",
        px: "$6",
        color: "$text",
        width: "100%",
        "& .fixed": {
          width: "10vw",
          minWidth: 200,
        },
      }}
    >
      <div className="fixed">
        <ImageInfo />
      </div>
      <Quotes />
      <Flex ai="center" jc="end" gap={2} className="fixed">
        {showTodo && <Todo />}
      </Flex>
    </Flex>
  );
};
export default BottomBar;
