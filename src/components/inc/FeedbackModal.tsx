import React from "react";
import { Card, Dialog, IconButton, Text, Box, Flex } from "@components/base";
import { CommentIcon } from "@components/icons";
import { Button } from "@components/base/Button";
function FeedbackModal() {
  return (
    <Dialog>
      <Dialog.Button asChild>
        <IconButton
          size="sm"
          bg="bgLight"
          css={{
            boxShadow: "0 0 0 1px $colors$text",
            "& svg": {
              size: "60%",
            },
          }}
        >
          <CommentIcon
            css={{
              color: "$text",
            }}
          />
        </IconButton>
      </Dialog.Button>
      <Dialog.Content asChild>
        <Card
          css={{
            zIndex: "$max",
            maxWidth: 800,
            spacey: "$4",
            px: "$4",
            py: "$3",
          }}
        >
          <Dialog.Close />
          <Box css={{ spacey: "$2", textAlign: "center" }}>
            <Text fs="xl" fw="bold" as="h1">
              We Want to Hear from You
            </Text>
            <Text as="p" fs="sm">
              We value your opinion and feedback. Please share your thoughts and
              suggestions with us. Thank you!
            </Text>
          </Box>
          <Flex gap="2">
            <FeedbackCard
              title="Feature Request"
              body="Tell us what you want. We’re always looking for ways to enhance our
          service."
              action={{
                name: "Submit Request",
                href: "https://github.com/orgs/Dev-Motion/discussions/new?category=feature-request",
              }}
            />
            <FeedbackCard
              title="Bug Reports"
              body="Report any problems you encounter. We’ll fix them as soon as possible."
              action={{
                name: "Report Bug",
                href: "https://forms.gle/VUy9hQbgCsJgfMHKA",
              }}
            />
            <FeedbackCard
              title="General Feedback"
              body="Share your thoughts and feelings. We care about your satisfaction and opinions."
              action={{
                name: "Send Feedback",
                href: "https://forms.gle/ym4SrMB8dy52hqt8A",
              }}
            />
          </Flex>
        </Card>
      </Dialog.Content>
    </Dialog>
  );
}

function FeedbackCard({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action: {
    name: string;
    href: string;
  };
}) {
  return (
    <Flex
      fd="column"
      css={{ border: "1px solid $colors$text", br: "$4", pd: "$3" }}
      gap="2"
    >
      <Text fs="sm" fw="bold">
        {title}
      </Text>
      <Text fs="xs">{body}</Text>
      <Button
        as="a"
        href={action.href}
        size="sm"
        color="accent"
        css={{ color: "$text" }}
      >
        {action.name}
      </Button>
    </Flex>
  );
}

export default FeedbackModal;
