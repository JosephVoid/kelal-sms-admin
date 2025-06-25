import {
  Button,
  Card,
  CardBody,
  IconButton,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { FaCopy, FaTrash } from "react-icons/fa";
import { PiPencil } from "react-icons/pi";

export default function AppsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          🖥️ Manage your apps
        </Text>
        <Text fontWeight={"light"}>
          ✨ Create New Apps, also manage your API keys ✨
        </Text>
      </div>
      <div>
        <div className="w-full flex">
          <div className="w-5/6 flex flex-col gap-8">
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Apps
            </Text>
            <Card.Root className="w-3/4">
              <Card.Body className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <Text fontWeight={"bold"}>App Name</Text>
                  <div className="flex gap-2">
                    <IconButton size="sm">
                      <PiPencil />
                    </IconButton>
                    <IconButton size="sm">
                      <FaTrash />
                    </IconButton>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Text>API Keys</Text>
                  <Card.Root>
                    <Card.Body className="!p-4">
                      <div className="flex justify-between items-center">
                        <Text fontSize={"smaller"} fontWeight={"bold"}>
                          {" "}
                          API Key Name
                        </Text>
                        <div className="w-1/2">
                          <InputGroup
                            endAddon={
                              <FaCopy className="hover:cursor-pointer" />
                            }
                          >
                            <Input
                              disabled
                              value={"123456789012345678901234567890"}
                              type="password"
                              size={"xs"}
                            />
                          </InputGroup>
                        </div>
                      </div>
                      <div className="flex justify-between !italic !opacity-80 !my-2">
                        <Text fontSize={"smaller"}>
                          Last Used: 26 June 2025
                        </Text>
                        <Text fontSize={"smaller"}>
                          Expires On: 26 June 2026
                        </Text>
                      </div>
                      <div>
                        <Button size={"xs"} colorPalette={"red"}>
                          Delete Key
                        </Button>
                      </div>
                    </Card.Body>
                  </Card.Root>
                  <Button width={"1/3"}>Create API Key</Button>
                </div>
              </Card.Body>
            </Card.Root>
          </div>
          <div className="w-1/6 flex flex-col">
            <Button size="lg">Create App</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
