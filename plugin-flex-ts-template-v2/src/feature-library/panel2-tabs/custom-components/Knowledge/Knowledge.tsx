import React, { useEffect, useState } from "react";
import { withTaskContext } from "@twilio/flex-ui";
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Heading,
  Input,
  Label,
  SkeletonLoader,
  Stack,
  Text,
} from "@twilio-paste/core";

import * as Flex from "@twilio/flex-ui";

import { searchRequest } from "../../utils/Knowledge/KnowledgeService";
import { KnowledgeItem } from "../../types/Knowledge/KnowledgeItem";

type Props = {
  task?: Flex.ITask;
};

export const Knowledge = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [kbResponses, setKbResponses] = useState<KnowledgeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  async function getSearchResult(message: any, worker: string) {
    console.log("getSearchResult - start");

    if (message.author === worker) {
      console.log("getSearchResult - worker");
      return;
    }

    if (message.type !== "text") {
      console.log("getSearchResult - not text");
      return;
    }

    console.log("*** Search message:", message.body);
    const kbResponse = await searchRequest(message.body);

    return kbResponse;
  }

  useEffect(() => {
    async function init() {
      console.log("*** Search init called", props.task);
      const manager = Flex.Manager.getInstance();
      const worker = manager.workerClient?.name;

      const conversation =
        await manager.conversationsClient.getConversationBySid(
          props.task?.attributes.conversationSid
        );

      conversation.on("messageAdded", async (message) => {
        console.log("*** Search messageAdded:", message);
        setLoading(true);
        const response = await getSearchResult(message, worker || "unknown");
        console.log("*** Search response:", response);
        setLoading(false);
        if (response) setKbResponses(response);
      });
    }

    init().catch((err) => {
      console.log("***CJC: Error init() search", err);
    });
  }, [props.task?.attributes.conversationSid]);

  useEffect(() => {
    console.log("KB Responses updated");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [kbResponses]);

  const onSearchInputChange = (e: any) => {
    console.log("onSearchInputChange", e.target.value);
    setSearchTerm(e.target.value);
  };

  const onSearchKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setLoading(true);
      setKbResponses([]);
      console.log("enter press here! ");
      if (searchTerm !== "") {
        console.log("Searching for:", searchTerm);
        searchRequest(searchTerm).then((response) => {
          console.log("*** Manual Search response:", response);
          if (response) setKbResponses(response);
          setLoading(false);
        });
      }
    }
  };

  const handleInsert = (article: string) => {
    if (!props.task?.attributes?.conversationSid) return;
    Flex.Actions.invokeAction("SetInputText", {
      conversationSid: props.task.attributes.conversationSid,
      body: article,
    });
  };

  return (
    <Box padding={"space20"}>
      <Stack orientation={"vertical"} spacing={"space20"}>
        <Card>
          <Heading as={"label"} variant={"heading40"}>
            Knowledge Base Results
          </Heading>
          <Label htmlFor="name">Search Term</Label>
          <Input
            id="searchTerm"
            name="searchTerm"
            type="text"
            onChange={onSearchInputChange}
            onKeyUp={onSearchKeyPress}
          />
        </Card>
        {loading && (
          <Card>
            <Heading as="h3" variant="heading30">
              <SkeletonLoader />
            </Heading>
            <Text as="div">
              <SkeletonLoader />
            </Text>
          </Card>
        )}
        {!loading &&
          kbResponses &&
          kbResponses.map((item, idx) => {
            return (
              <Card key={idx}>
                <Anchor href={item.url} target="_blank">
                  <Heading as="h3" variant="heading40">
                    {item.title}
                  </Heading>
                </Anchor>

                <Text as={"div"}>
                  {item.body}
                  <Button
                    variant="link"
                    size="small"
                    onClick={() => handleInsert(`[${item.body}](${item.url})`)}
                  >
                    Insert response
                  </Button>
                </Text>

                <Box
                  display="flex"
                  columnGap="space40"
                  rowGap="space60"
                  flexWrap="wrap"
                  marginTop={"space20"}
                >
                  {item.keywords &&
                    item.keywords.map((keyword, keywordIdx) => {
                      return (
                        <Badge variant="info" key={keywordIdx} as="span">
                          {keyword}
                        </Badge>
                      );
                    })}
                </Box>
              </Card>
            );
          })}
      </Stack>
    </Box>
  );
};

export default withTaskContext(Knowledge);
