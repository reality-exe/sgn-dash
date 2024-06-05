"use client";
import Navbar from "@/components/Navbar";
import {
  Box,
  Card,
  Heading,
  Separator,
  Badge,
  Skeleton,
  Popover,
  AlertDialog,
  ContextMenu,
  Avatar,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  Button,
  RadioCards,
  Text,
  Flex,
  Portal,
} from "@radix-ui/themes";
import { useAppContext } from "@/context";
import { pb } from "@/services/pocketbase.service";
import { useEffect, useState } from "react";

import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { NextFont } from "next/dist/compiled/@next/font";

import { Stargate } from "@/types/PocketBase/Records/Stargate";
import EditDialog from "@/components/StargateEditDialog";
import toast, { Toaster } from "react-hot-toast";
import StarBg from "@/components/StarBg";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });
const anquietas = localFont({ src: "../assets/fonts/anquietas.ttf" });
const milkyWay = localFont({ src: "../assets/fonts/stargate_sg1.ttf" });
const pegasus = localFont({ src: "../assets/fonts/stargate_atlantis.ttf" });
const universe = localFont({ src: "../assets/fonts/stargate_universe.ttf" });

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [stargates, setStargates] = useState<Stargate[]>();

  const { user, setUser } = useAppContext();

  useEffect(() => {
    pb.collection("users")
      .authRefresh()
      .then((val) => {
        setUser(val);
      })
      .catch(() => {});
  });

  async function getGates() {
    let response = await pb.collection("stargates").getFullList();
    setStargates(response);
    setLoading(false);
  }

  useEffect(() => {
    getGates();
  });

  return (
    <Box>
      <Portal>
        <Toaster position="top-left" />
      </Portal>
      <Navbar
        navbar_start={
          <Button asChild variant="ghost" size={"4"} color="gray" highContrast>
            <a href="/">Stargate Network</a>
          </Button>
        }
        navbar_center={
          <Text size={"8"} className={`${anquietas.className} hidden lg:block`}>
            We are the Ancients of Resonite
          </Text>
        }
        navbar_end={
          <Flex gap={"6"} align="center">
            {user ? (
              <UserDropdown />
            ) : (
              <Button asChild variant="ghost" color="gray" size={"3"}>
                <a href="/auth">Login</a>
              </Button>
            )}
            <GlyphDisplayDropdown />
          </Flex>
        }
      />
      <Flex gap={"6"} wrap={"wrap"} p={"4"} align={"center"} justify={"center"}>
        {loading ? (
          <>
            <GateItemSkeleton />
            <GateItemSkeleton />
            <GateItemSkeleton />
          </>
        ) : (
          stargates?.map((gate, i) =>
            user ? (
              <ContextMenu.Root key={i}>
                <ContextMenu.Trigger>
                  <a>
                    <GateItem gate={gate} />
                  </a>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                  <ContextMenu.Item asChild>
                    <EditDialog gate={gate} />
                  </ContextMenu.Item>
                  <ContextMenu.Separator />

                  <ContextMenu.Sub>
                    <ContextMenu.SubTrigger>Set Status</ContextMenu.SubTrigger>
                    <ContextMenu.SubContent>
                      <ContextMenu.CheckboxItem
                        checked={gate.gate_status === "IDLE"}
                        onClick={() => {
                          let response = pb
                            .collection("stargates")
                            .update(gate.id, {
                              gate_status: "IDLE",
                            });
                          toast.promise(response, {
                            error: "Failed to set status",
                            loading: "Setting status",
                            success: "Set gate status",
                          });
                        }}
                      >
                        Set Idle
                      </ContextMenu.CheckboxItem>
                      <ContextMenu.CheckboxItem
                        checked={gate.gate_status === "INCOMING7"}
                        onClick={() => {
                          let response = pb
                            .collection("stargates")
                            .update(gate.id, {
                              gate_status: "INCOMING7",
                            });
                          toast.promise(response, {
                            error: "Failed to set status",
                            loading: "Setting status",
                            success: "Set gate status",
                          });
                        }}
                      >
                        Set Incoming 7
                      </ContextMenu.CheckboxItem>
                      <ContextMenu.CheckboxItem
                        checked={gate.gate_status === "INCOMING8"}
                        onClick={() => {
                          let response = pb
                            .collection("stargates")
                            .update(gate.id, {
                              gate_status: "INCOMING8",
                            });
                          toast.promise(response, {
                            error: "Failed to set status",
                            loading: "Setting status",
                            success: "Set gate status",
                          });
                        }}
                      >
                        Set Incoming 8
                      </ContextMenu.CheckboxItem>
                      <ContextMenu.CheckboxItem
                        checked={gate.gate_status === "INCOMING9"}
                        onClick={() => {
                          let response = pb
                            .collection("stargates")
                            .update(gate.id, {
                              gate_status: "INCOMING9",
                            });
                          toast.promise(response, {
                            error: "Failed to set status",
                            loading: "Setting status",
                            success: "Set gate status",
                          });
                        }}
                      >
                        Set Incoming 9
                      </ContextMenu.CheckboxItem>
                      <ContextMenu.CheckboxItem
                        disabled
                        checked={gate.gate_status === "OPEN"}
                      >
                        Set Open
                      </ContextMenu.CheckboxItem>
                    </ContextMenu.SubContent>
                  </ContextMenu.Sub>

                  <ContextMenu.Sub>
                    <ContextMenu.SubTrigger>Set Privacy</ContextMenu.SubTrigger>
                    <ContextMenu.SubContent>
                      <ContextMenu.CheckboxItem
                        checked={gate.public_gate}
                        onClick={() => {
                          let response = pb
                            .collection("stargates")
                            .update(gate.id, {
                              public_gate: true,
                            });
                          toast.promise(response, {
                            error: "Failed to set privacy",
                            loading: "Setting privacy",
                            success: "Set gate privacy",
                          });
                        }}
                      >
                        Set Public
                      </ContextMenu.CheckboxItem>
                      <ContextMenu.CheckboxItem
                        checked={!gate.public_gate}
                        onClick={() => {
                          let response = pb
                            .collection("stargates")
                            .update(gate.id, {
                              public_gate: false,
                            });
                          toast.promise(response, {
                            error: "Failed to set privacy",
                            loading: "Setting privacy",
                            success: "Set gate privacy",
                          });
                        }}
                      >
                        Set Hidden
                      </ContextMenu.CheckboxItem>
                    </ContextMenu.SubContent>
                  </ContextMenu.Sub>
                </ContextMenu.Content>
              </ContextMenu.Root>
            ) : (
              <GateItem key={i} gate={gate} />
            )
          )
        )}
      </Flex>
    </Box>
  );
}

function GateItemSkeleton() {
  const { glyph } = useAppContext();
  const [glyphDisplay, setGlyphDisplay] = useState<NextFont>(inter);
  const [glyphSize, setGlyphSize] = useState<string>("text-[20px]");

  return (
    <Box minWidth={"20rem"} maxHeight={"30rem"}>
      <Card>
        <Flex align={"center"} direction={"column"} p={"4"}>
          <Heading>
            <Skeleton>Session Name</Skeleton>
          </Heading>
          <Separator my={"2"} size={"4"} />
          <Heading size={"6"}>
            <Skeleton>99999999</Skeleton>
          </Heading>
          <Flex mt={"3"} align={"center"} justify={"between"} width={"100%"}>
            <Text>Gate Status</Text>
            <Box>
              <Skeleton>OPEN</Skeleton>
            </Box>
          </Flex>
          <Flex mt={"3"} align={"center"} justify={"between"} width={"100%"}>
            <Text>Active/Max Users</Text>
            <Box>
              <Skeleton>00/00</Skeleton>
            </Box>
          </Flex>
          <Flex mt={"3"} align={"center"} justify={"between"} width={"100%"}>
            <Text>Host Type</Text>
            <Box>
              <Skeleton>PLACEHOLDER</Skeleton>
            </Box>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}

function GateItem({ gate }: { gate: Stargate }) {
  const { glyph } = useAppContext();
  const [glyphDisplay, setGlyphDisplay] = useState<NextFont>(inter);
  const [glyphSize, setGlyphSize] = useState<string>("text-[20px]");

  useEffect(() => {
    switch (glyph) {
      case "Text":
        setGlyphDisplay(inter);
        setGlyphSize("text-[20px]");
        break;
      case "MilkyWay":
        setGlyphDisplay(milkyWay);
        setGlyphSize("text-[26px]");
        break;
      case "Pegasus":
        setGlyphDisplay(pegasus);
        setGlyphSize("text-[28px]");
        break;
      case "Universe":
        setGlyphDisplay(universe);
        setGlyphSize("text-[60px]");
        break;

      default:
        break;
    }
  }, [glyph]);
  return (
    <>
      <Box minWidth={"25rem"} maxHeight={"50rem"}>
        <Card>
          <div className="absolute w-full flex">
            {gate.public_gate ? (
              <></>
            ) : (
              <Badge color="orange" variant="soft" radius="full">
                Hidden
              </Badge>
            )}
          </div>
          <Flex align={"center"} direction={"column"} p={"4"}>
            <Heading>{gate.session_name}</Heading>
            <Separator my={"2"} size={"4"} />
            <Heading
              size={"5"}
              className={`${glyphSize} ${glyphDisplay.className}`}
            >
              {gate.gate_address}
              <Text color="iris">{gate.gate_code}</Text>
            </Heading>
            <Flex mt={"3"} align={"center"} justify={"between"} width={"100%"}>
              <Text>Gate Status</Text>
              {gate.gate_status === "IDLE" ? (
                <Badge color="jade" variant="soft" radius="full">
                  Idle
                </Badge>
              ) : (
                <Badge color="red" variant="soft" radius="full">
                  Open
                </Badge>
              )}
            </Flex>
            <Flex mt={"3"} align={"center"} justify={"between"} width={"100%"}>
              <Text>Active/Max Users</Text>
              <Box>
                <Text>{gate.active_users}</Text>/<Text>{gate.max_users}</Text>
              </Box>
            </Flex>
            <Flex mt={"3"} align={"center"} justify={"between"} width={"100%"}>
              <Text>Host Type</Text>
              {gate.is_headless ? (
                <Badge color="jade" variant="soft" radius="full">
                  Headless Session
                </Badge>
              ) : (
                <Badge color="red" variant="soft" radius="full">
                  User Session
                </Badge>
              )}
            </Flex>
            <Flex mt={"3"} align={"center"} justify={"between"} width={"100%"}>
              <Text>Owner</Text>
              <Box>
                <Text>{gate.owner_name}</Text>
              </Box>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </>
  );
}

function GlyphDisplayDropdown() {
  const { glyph, setGlyph } = useAppContext();

  return (
    <DropdownMenu.Root dir="rtl">
      <DropdownMenu.Trigger>
        <Button variant="ghost" color="gray" highContrast size={"3"}>
          Glyph Display
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <RadioCards.Root
          defaultValue={glyph ?? "Text"}
          columns={{ initial: "2" }}
        >
          <RadioCards.Item
            value="Text"
            onClick={() => {
              setGlyph("Text");
            }}
          >
            <Text>Text Glyphs</Text>
          </RadioCards.Item>
          <RadioCards.Item
            value="MilkyWay"
            onClick={() => {
              setGlyph("MilkyWay");
            }}
          >
            <Text>MilkyWay Glyphs</Text>
          </RadioCards.Item>
          <RadioCards.Item
            value="Pegasus"
            onClick={() => {
              setGlyph("Pegasus");
            }}
          >
            <Text>Pegasus Glyphs</Text>
          </RadioCards.Item>
          <RadioCards.Item
            value="Universe"
            onClick={() => {
              setGlyph("Universe");
            }}
          >
            <Text>Universe Glyphs</Text>
          </RadioCards.Item>
        </RadioCards.Root>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function UserDropdown() {
  const router = useRouter();
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="ghost" highContrast color="gray" asChild>
          <Flex gap="4">
            <Avatar
              src={`https://aor-db.rxserver.net/api/files/users/${pb.authStore.model?.id}/${pb.authStore.model?.avatar}`}
              fallback={pb.authStore.model?.username.slice(0, 2) ?? "UN"}
            />
            {pb.authStore.model?.username}
          </Flex>
        </Button>
      </Popover.Trigger>
      <Popover.Content size="2" maxWidth="400px">
        <Flex direction={"column"} gap={"4"} px="2">
          <Button variant="ghost" color="gray" asChild>
            <Flex width={"100%"} justify="start" asChild>
              <a href="/profile">My Profile</a>
            </Flex>
          </Button>
          <Button variant="ghost" color="gray" asChild>
            <Flex width={"100%"} justify="start" asChild>
              <a href="/admin">Admin Dashboard</a>
            </Flex>
          </Button>
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button variant="ghost" color="red">
                <Flex width={"100%"}>
                  <Text align={"left"}>Logout</Text>
                </Flex>
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
              <AlertDialog.Title>Logout</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure you wish to logout?
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button
                    variant="solid"
                    color="red"
                    onClick={() => {
                      pb.authStore.clear();
                      location.reload();
                    }}
                  >
                    Logout
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
