import { Box, Text, Flex, CheckBox, Popover } from "@components/base";
import { More } from "@components/icons";
import useStore from "@store";
import * as React from "react";
import { styled } from "stitches.config";

function TodoItem({
  todo,
}: {
  todo: { id: number; text: string; completed: boolean };
}) {
  const [toggleTodo, editTodo] = useStore((state) => [
    state.toggleTodo,
    state.editTodo,
  ]);
  const [text, setText] = React.useState(todo.text);
  const [isEditing, setIsEditing] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editTodo(todo.id, text);
      toggleEditing();
      setText("");
    }
  };
  return (
    <Flex
      gap="2"
      ai="center"
      css={{
        width: "100%",
        "&:hover": {
          ".options": {
            opacity: 1,
          },
        },
      }}
    >
      <CheckBox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
      />
      {isEditing ? (
        <Input
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          onKeyDown={onEnter}
          ref={(e) => e?.focus()}
        />
      ) : (
        <Text
          fs="sm"
          css={{
            textDecoration: todo.completed ? "line-through" : "none",
            flex: 1,
          }}
        >
          {todo.text}
        </Text>
      )}
      <Popover
        side="top"
        showClose={false}
        open={show}
        openChange={(open) => setShow(open)}
        content={
          <TodoItemOptions
            id={todo.id}
            toggleEdit={() => {
              toggleEditing();
              setShow(false);
            }}
          />
        }
      >
        <Box
          as="button"
          className="options"
          onClick={() => setShow(true)}
          css={{
            include: "buttonReset",
            color: "$text",
            opacity: 0,
            transition: "all 300ms ease-in-out",
          }}
        >
          <More />
          <Text css={{ include: "screenReaderOnly" }}>more options</Text>
        </Box>
      </Popover>
    </Flex>
  );
}
function TodoItemOptions({
  id,
  toggleEdit,
}: {
  id: number;
  toggleEdit: () => void;
}) {
  const [removeTodo] = useStore((state) => [state.removeTodo]);
  return (
    <Flex fd="column" gap="1" css={{ width: 100 }}>
      <MenuButton onClick={toggleEdit}>Edit</MenuButton>
      <MenuButton onClick={() => removeTodo(id)}>Delete</MenuButton>
    </Flex>
  );
}

export const Input = styled("input", {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: "$sm",
  bg: "transparent",
  color: "$text",
  "&:focus": {
    outline: "none",
  },
});
export default TodoItem;

export const MenuButton = styled("button", {
  include: "buttonReset",
  color: "$text",
  fontSize: "$sm",
  fontWeight: "$medium",
  br: "$2",
  py: 2,
  px: 5,
  width: "100%",
  textAlign: "left",
  "&:hover": {
    bg: "rgba($textRGB, 0.1)",
  },
});
