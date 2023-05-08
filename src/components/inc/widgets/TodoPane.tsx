import { Box, Card, Flex, IconButton, Popover, Text } from "@components/base";
import { AddIcon, AlarmIcon, More, StarIcon } from "@components/icons";
import useStore from "@store";
import * as React from "react";
import TodoItem, { Input, MenuButton } from "../TodoItem";

function TodoPane() {
  const todos = useStore((state) =>
    state.todos.sort((a) => (a.important ? -1 : 1))
  );
  return (
    <Box css={{ width: 330, spacey: "$2" }}>
      <Card
        as={Flex}
        jc="between"
        ai="center"
        css={{ pd: "$1", width: "100%" }}
      >
        <Text fw="medium">My To-dos</Text>
        <Popover>
          <Popover.Button asChild>
            <Box
              as="button"
              css={{
                "--radix-popover-trigger-width": "100px",
                include: "buttonReset",
                color: "$text",
              }}
            >
              <More />
              <Text css={{ include: "screenReaderOnly" }}>more options</Text>
            </Box>
          </Popover.Button>
          <Popover.Content side="top">
            <Card css={{ pd: "$1" }}>
              <TodoPaneOptions />
            </Card>
            <Popover.Arrow />
          </Popover.Content>
        </Popover>
      </Card>
      <Flex fd="column" gap="1">
        {todos.map((todo, i) => (
          <TodoItem key={todo.id.toString() + i.toString()} todo={todo} />
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
  const [text, setText] = React.useState("");
  const [showInput, setShowInput] = React.useState(false);
  const [important, setImportant] = React.useState(false);
  const addTodo = useStore((state) => state.addTodo);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleAddTodo = () => {
    addTodo({
      id: Math.floor(Math.random() * 1000),
      text,
      completed: false,
      important,
    });
  };
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
      setShowInput(false);
      setText("");
      setImportant(false);
    }
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <Card>
      {showInput ? (
        <Flex css={{ px: "$1", py: "$2" }}>
          <Input
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            onKeyDown={onEnter}
            ref={inputRef}
            css={{ flex: 1, pl: "$2" }}
          />
          <Flex>
            <IconButton bg="transparent" size="sm">
              <AlarmIcon css={{ size: "$3", color: "$text" }} />
            </IconButton>
            <IconButton
              bg="transparent"
              size="sm"
              onClick={() => setImportant(!important)}
            >
              <StarIcon
                css={{
                  size: "$3",
                  fill: important ? "$text" : "transparent",
                  transition: "all 300ms ease-in-out",
                  color: "$text",
                }}
              />
            </IconButton>
          </Flex>
        </Flex>
      ) : (
        <Flex
          as="button"
          css={{
            include: "buttonReset",
            color: "$text",
            mx: "$1",
            my: "$2",
            width: "100%",
          }}
          ai="center"
          gap="2"
          onClick={() => setShowInput(true)}
        >
          <IconButton bg="transparent" size="sm">
            <AddIcon css={{ color: "$text" }} />
          </IconButton>
          <Text fs="sm" fw="medium">
            Add a todo
          </Text>
        </Flex>
      )}
    </Card>
  );
}
export default TodoPane;
