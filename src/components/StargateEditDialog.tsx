import { pb } from "@/services/pocketbase.service";
import { Stargate } from "@/types/PocketBase/Records/Stargate";
import {
  Dialog,
  Button,
  Flex,
  TextField,
  Select,
  Text,
  Box,
} from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditDialog({ gate }: { gate: Stargate }) {
  const [name, setName] = useState<string>(gate.session_name);
  const [owner, setOwner] = useState<string>(gate.owner_name);
  const [status, setStatus] = useState<string>(gate.gate_status);
  const [privacy, setPrivacy] = useState<boolean>(gate.public_gate);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger>
        <Button
          variant="ghost"
          color="gray"
          style={{ margin: "1px", color: "white" }}
          onClick={(e) => {
            setOpen(true);
          }}
        >
          <Flex width={"100%"}>
            <Text align={"left"}>Edit {gate.session_name}</Text>
          </Flex>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="32rem">
        <Dialog.Title>Edit Stargate</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to {gate.session_name}
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <Flex gap={"3"} width="100%">
            <Box flexGrow="1">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Stargate Address
                </Text>
                <TextField.Root
                  disabled
                  defaultValue={gate.gate_address}
                  placeholder="Enter a new stargate address"
                />
              </label>
            </Box>
            <Box flexGrow="1">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Stargate Group Code
                </Text>
                <TextField.Root
                  disabled
                  defaultValue={gate.gate_code}
                  placeholder="Enter a new stargate address"
                />
              </label>
            </Box>
          </Flex>
          <Flex gap={"3"} width="100%">
            <Box flexGrow="1">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Session Name
                </Text>
                <TextField.Root
                  defaultValue={name}
                  placeholder="Enter a new Session name"
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}
                />
              </label>
            </Box>
            <Box flexGrow="1">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Session Owner
                </Text>
                <TextField.Root
                  defaultValue={owner}
                  placeholder="Enter a new owner name"
                  onChange={(e) => setOwner(e.currentTarget.value)}
                />
              </label>
            </Box>
          </Flex>
          <Flex gap="3" justify="center">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Gate Status
              </Text>
              <Select.Root
                defaultValue={gate.gate_status}
                onValueChange={(v) => setStatus(v)}
              >
                <Select.Trigger variant="surface" />
                <Select.Content>
                  <Select.Item value="IDLE">Idle</Select.Item>
                  <Select.Item value="INCOMING7">Incoming 7</Select.Item>
                  <Select.Item value="INCOMING8">Incoming 8</Select.Item>
                  <Select.Item value="INCOMING9">Incoming 9</Select.Item>
                  <Select.Item value="OPEN" disabled>
                    Open
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Session Privacy
              </Text>
              <Select.Root
                defaultValue={gate.public_gate ? "true" : "false"}
                onValueChange={(val) => {
                  setPrivacy(val == "true");
                }}
              >
                <Select.Trigger variant="surface" />
                <Select.Content>
                  <Select.Item value={"true"}>Public</Select.Item>
                  <Select.Item value={"false"}>Private/Hidden</Select.Item>
                </Select.Content>
              </Select.Root>
            </label>
          </Flex>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              let response = pb
                .collection("stargates")
                .update(gate.id, {
                  session_name: name,
                  owner_name: owner,
                  gate_status: status,
                  public_gate: privacy,
                })
                .then(() => {
                  setOpen(false);
                });
              toast.promise(response, {
                loading: "Saving",
                success: `Saved Stargate ${name}`,
                error: `Failed to save ${name}`,
              });
            }}
          >
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
