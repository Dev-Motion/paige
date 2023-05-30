import {
  Box,
  Card,
  Dropdown,
  Flex,
  IconButton,
  Popover,
  Text,
} from "@components/base";
import { AddIcon, AlarmIcon, More, StarIcon } from "@components/icons";
import useStore from "@store";
import * as React from "react";
import DatePicker from "../DatePicker";
import TodoItem, { Input } from "../TodoItem";

function TodoPane() {
  const [todos, toggleAll, clearCompleted] = useStore((state) => [
    state.todos.sort((a) => (a.important ? -1 : 1)),
    state.toggleAll,
    state.clearCompleted,
  ]);
  return (
    <Box css={{ width: 330, spacey: "$1" }}>
      <Card
        as={Flex}
        jc="between"
        ai="center"
        css={{ pd: "$2", width: "100%" }}
      >
        <Text fw="medium">Todos</Text>
        <Dropdown>
          <Dropdown.Button asChild>
            <IconButton bg="transparent" size="xs">
              <More />
              <Text css={{ include: "screenReaderOnly" }}>more options</Text>
            </IconButton>
          </Dropdown.Button>
          <Dropdown.Menu side="top">
            <Dropdown.MenuItem onClick={toggleAll}>
              Mark all as completed
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={clearCompleted}>
              Clear completed
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
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

interface addTodoState {
  text: string;
  showInput: boolean;
  important: boolean;
  popoverOpen: boolean;
  dateTime: Date | null;
}
function addTddoReducer(
  state: addTodoState,
  action: Partial<addTodoState> | ((state: addTodoState) => addTodoState)
): addTodoState {
  if (typeof action === "function") {
    return { ...state, ...action(state) };
  }
  return { ...state, ...action };
}

function AddTodo() {
  const [{ text, showInput, important, popoverOpen, dateTime }, setState] =
    React.useReducer(addTddoReducer, {
      text: "",
      showInput: false,
      important: false,
      popoverOpen: false,
      dateTime: null,
    });
  const addTodo = useStore((state) => state.addTodo);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleAddTodo = () => {
    if (dateTime) {
      addTodo({
        id: Math.floor(Math.random() * 1000),
        text,
        completed: false,
        important,
        reminder: true,
        date: dateTime,
      });
    } else {
      addTodo({
        id: Math.floor(Math.random() * 1000),
        text,
        completed: false,
        important,
        reminder: false,
      });
    }
  };
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text) {
      handleAddTodo();
      setState({ showInput: false, text: "", important: false });
    }
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);
  return (
    <Card css={{ py: "$2", px: "$2" }}>
      {showInput ? (
        <Flex>
          <Input
            value={text}
            onChange={(e) => setState({ text: e.currentTarget.value })}
            onKeyDown={onEnter}
            ref={inputRef}
            css={{ flex: 1, pl: "$2" }}
          />
          <Flex>
            <Popover
              open={popoverOpen}
              onOpenChange={(open) => setState({ popoverOpen: open })}
            >
              <Popover.Button asChild>
                <IconButton bg="transparent" size="xs">
                  <AlarmIcon css={{ size: "$3", color: "$text" }} />
                </IconButton>
              </Popover.Button>
              <Popover.Content>
                <DatePicker
                  onChange={(d) =>
                    setState({ dateTime: d, popoverOpen: false })
                  }
                />
                <Popover.Close />
              </Popover.Content>
            </Popover>
            <IconButton
              bg="transparent"
              size="xs"
              onClick={() => setState({ important: !important })}
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
            width: "100%",
          }}
          ai="center"
          gap="2"
          onClick={() => setState({ showInput: true })}
        >
          <IconButton bg="transparent" size="xs">
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
