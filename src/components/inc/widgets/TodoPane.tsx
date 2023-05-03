import { Box, Text, Flex, CheckBox, Popover } from "@components/base";
import { AddIcon, More } from "@components/icons";
import useStore from "@store";
import * as React from "react";
import { styled } from "stitches.config";
import TodoItem, { Input, MenuButton } from "../TodoItem";

function TodoPane() {
  const todos = useStore((state) => state.todos);
  return (
    <Box css={{ width: 380, px: "$5", pb: "$4", spacey: "$2" }}>
      <Flex jc="between" ai="center" css={{ width: "100%" }}>
        <Text>My Todo</Text>
        <Popover showClose={false} content={<TodoPaneOptions />}>
          <Box as="button" css={{ include: "buttonReset", color: "$text" }}>
            <More />
            <Text css={{ include: "screenReaderOnly" }}>more options</Text>
          </Box>
        </Popover>
      </Flex>
      <Flex fd="column" gap="2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        <AddTodo />
      </Flex>
    </Box>
  );
}

function TodoPaneOptions() {
  const [toggleAll, clearCompleted] = useStore((state) => [
    state.toggleAll,
    state.clearCompleted,
  ]);
  return (
    <Box css={{ width: 150 }}>
      <MenuButton onClick={toggleAll}>Mark all as completed</MenuButton>
      <MenuButton onClick={clearCompleted}>Clear completed</MenuButton>
    </Box>
  );
}
function AddTodo() {
  const [showInput, setShowInput] = React.useState(false);
  const addTodo = useStore((state) => state.addTodo);
  const [text, setText] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleAddTodo = () => {
    addTodo({
      id: Math.floor(Math.random() * 1000),
      text,
      completed: false,
    });
  };
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
      setShowInput(false);
      setText("");
    }
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <>
      {showInput ? (
        <Box>
          <Input
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            onKeyDown={onEnter}
            ref={inputRef}
          />
        </Box>
      ) : (
        <Flex
          as="button"
          css={{ include: "buttonReset", color: "$text" }}
          ai="center"
          gap="2"
          onClick={() => setShowInput(true)}
        >
          <AddIcon />
          <Text fs="sm" fw="medium">
            Add a todo
          </Text>
        </Flex>
      )}
    </>
  );
}
export default TodoPane;
