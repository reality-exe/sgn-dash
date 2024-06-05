"use client";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import { User } from "@/types/PocketBase/User";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Separator,
  Text,
  AlertDialog,
  Popover,
  Card,
  Table,
  Tooltip,
  Inset,
} from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { ListResult, RecordAuthResponse } from "pocketbase";
import { useEffect, useState } from "react";
import { pb } from "@/services/pocketbase.service";
import { Stargate } from "@/types/PocketBase/Records/Stargate";
import {
  Aperture,
  Circle,
  HardDrives,
  Pencil,
  User as UserIco,
} from "@phosphor-icons/react";
import StargateEditDialog from "@/components/StargateEditDialog";

export default function AdminStargate() {
  const router = useRouter();
  const [init, setInit] = useState<boolean>(false);
  const [user, setUser] = useState<RecordAuthResponse<User>>();
  const [users, setUsers] = useState<User[]>();
  const [allGates, setAllGates] = useState<Stargate[]>([]);
  const [gates, setGates] = useState<ListResult<Stargate>>();

  useEffect(() => {
    pb.collection("users")
      .authRefresh()
      .then((user) => {
        setUser(user);

        pb.collection("stargates")
          .getFullList()
          .then((sg) => {
            setAllGates(sg);
            pb.collection("stargates")
              .getList(1, 5, { sort: "+owner_name" })
              .then((sg) => {
                setGates(sg);
                setInit(true);
              });
          });
      })
      .catch((err) => {
        router.push("/");
      });
  }, [router]);

  function changeGatePage(page: number) {
    pb.collection("stargates")
      .getList(page, 5)
      .then((gates) => {
        setGates(gates);
        console.log(page);
      });
  }

  const path = usePathname();
  return (
    <Box>
      {/* Full Size Page */}
      <Box className="hidden lg:block">
        <Box className="flex overflow-hidden">
          <AdminSidebar />

          <Box className="main overflow-auto w-full justify-center">
            <Box
              width="100%"
              style={{
                backgroundColor: "var(--color-panel-translucent)",
                backdropFilter: "blur(64px)",
              }}
              height="5rem"
              p="4"
              asChild
            >
              <Flex justify="end" align="center">
                <UserDropdown />
              </Flex>
            </Box>
            <Box p="4" width="100%">
              <Flex gap="4">
                <Flex direction="column" justify="center" width="100%">
                  <Card>
                    <Flex direction="column">
                      <Text align="center" size="6" weight="medium">
                        Active Stargates - {allGates.length ?? "--"}
                      </Text>
                      <Separator my="4" size="4" />
                      <Flex
                        align="center"
                        justify="center"
                        width="100%"
                        gap="4"
                        mx="4"
                      >
                        <Box>
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                          >
                            <Text weight="bold" size="5" align="center">
                              Public Stargates
                            </Text>
                            <Text size="6" align="center">
                              {allGates.filter((v) => v.public_gate).length ??
                                "--"}
                            </Text>
                          </Flex>
                        </Box>
                        <Separator orientation="vertical" size={"3"} />
                        <Box>
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                          >
                            <Text weight="bold" size="5" align="center">
                              Hidden Stargates
                            </Text>
                            <Text size="6" align="center">
                              {allGates.filter((v) => !v.public_gate).length ??
                                "--"}
                            </Text>
                          </Flex>
                        </Box>
                        <Separator orientation="vertical" size={"3"} />
                        <Box>
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                          >
                            <Text weight="bold" size="5" align="center">
                              MilkyWay Stargates
                            </Text>
                            <Text size="6" align="center">
                              {allGates.filter((v) => v.gate_code == "M@")
                                .length ?? "--"}
                            </Text>
                          </Flex>
                        </Box>
                        <Separator orientation="vertical" size={"3"} />
                        <Box>
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                          >
                            <Text weight="bold" size="5" align="center">
                              Pegasus Stargates
                            </Text>
                            <Text size="6" align="center">
                              {allGates.filter((v) => v.gate_code == "P@")
                                .length ?? "--"}
                            </Text>
                          </Flex>
                        </Box>
                        <Separator orientation="vertical" size={"3"} />
                        <Box>
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                          >
                            <Text weight="bold" size="5" align="center">
                              Universe Stargates
                            </Text>
                            <Text size="6" align="center">
                              {allGates.filter((v) => v.gate_code == "U@")
                                .length ?? "--"}
                            </Text>
                          </Flex>
                        </Box>
                        <Separator orientation="vertical" size={"3"} />
                        <Box>
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                          >
                            <Text weight="bold" size="5" align="center">
                              Dawn Stargates
                            </Text>
                            <Text size="6" align="center">
                              {allGates.filter((v) => v.gate_code == "R*")
                                .length ?? "--"}
                            </Text>
                          </Flex>
                        </Box>
                        <Separator orientation="vertical" size={"3"} />
                        <Box>
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                          >
                            <Text weight="bold" size="5" align="center">
                              Other Stargates
                            </Text>
                            <Text size="6" align="center">
                              {allGates.filter(
                                (v) =>
                                  v.gate_code != "M@" &&
                                  v.gate_code != "P@" &&
                                  v.gate_code != "R*" &&
                                  v.gate_code != "U@"
                              ).length ?? "--"}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Flex>
                  </Card>
                </Flex>
              </Flex>
            </Box>
            <Box p="4" width="100%">
              <Flex gap="4">
                <Flex direction="column" justify="center" width="100%">
                  <Card>
                    <Flex direction="column">
                      <Box asChild px="6" width="100%">
                        <Flex justify="center" align="center">
                          <Button
                            variant="surface"
                            disabled={gates?.page == 1}
                            onClick={() => {
                              let page = gates?.page ?? 1;
                              let newpage = page - 1;
                              changeGatePage(newpage);
                            }}
                          >
                            Previous Page
                          </Button>
                          <Box flexGrow="1" asChild>
                            <Text align="center" size="6" weight="medium">
                              All Stargates
                            </Text>
                          </Box>
                          <Button
                            variant="surface"
                            disabled={gates?.page == gates?.totalPages}
                            onClick={() => {
                              let page = gates?.page ?? 1;
                              let newpage = page + 1;
                              changeGatePage(newpage);
                            }}
                          >
                            Next Page
                          </Button>
                        </Flex>
                      </Box>
                      <Inset mt="6" side="x">
                        <Separator size="4" />
                      </Inset>
                      <Inset clip={"padding-box"} side="x">
                        <Box maxHeight="17rem">
                          <Table.Root>
                            <Table.Header>
                              <Table.Row>
                                <Table.ColumnHeaderCell width="5.2rem" />
                                <Table.ColumnHeaderCell>
                                  Gate Address
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                  Gate Code
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                  Gate Status
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                  Owner
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                  Session Name
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                  Privacy
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell width="4rem" />
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              {gates?.items.map((v, i) => (
                                <Table.Row key={`${v.gate_address}-${i}`}>
                                  <Table.RowHeaderCell width="5.2rem">
                                    <Flex gap="2">
                                      <Tooltip
                                        content={
                                          v.is_headless
                                            ? "Headless Session"
                                            : "User Session"
                                        }
                                      >
                                        {v.is_headless ? (
                                          <HardDrives size="20" />
                                        ) : (
                                          <UserIco size="20" />
                                        )}
                                      </Tooltip>
                                      {v.iris_state ? (
                                        <Tooltip content="Iris Closed">
                                          <Aperture size="20" />
                                        </Tooltip>
                                      ) : (
                                        <Tooltip content="Iris Open">
                                          <Circle size="20" />
                                        </Tooltip>
                                      )}
                                    </Flex>
                                  </Table.RowHeaderCell>
                                  <Table.Cell>{v.gate_address}</Table.Cell>
                                  <Table.Cell>{v.gate_code}</Table.Cell>
                                  <Table.Cell>{v.gate_status}</Table.Cell>
                                  <Table.Cell>{v.owner_name}</Table.Cell>
                                  <Table.Cell>{v.session_name}</Table.Cell>
                                  <Table.Cell>
                                    {v.public_gate ? "Public" : "Hidden"}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <StargateEditDialog gate={v} icon={true} />
                                  </Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table.Root>
                        </Box>
                      </Inset>
                    </Flex>
                  </Card>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Medium Sized Page */}
      <Box className="hidden md:block lg:hidden">md</Box>

      {/* Phone Page */}
      <Box className="block md:hidden lg:hidden">sm</Box>
    </Box>
  );
}

function UserDropdown() {
  const router = useRouter();
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="ghost" asChild>
          <Flex gap="4">
            <Avatar
              src={`https://aor-db.rxserver.net/api/files/users/${pb.authStore.model?.id}/${pb.authStore.model?.avatar}`}
              fallback={pb.authStore.model?.username.slice(0, 2) ?? "UN"}
            />
            <Text>{pb.authStore.model?.username}</Text>
          </Flex>
        </Button>
      </Popover.Trigger>
      <Popover.Content size="2" maxWidth="400px">
        <Flex direction={"column"} gap={"4"} px="2">
          <Button variant="ghost" color="gray" asChild>
            <Flex width={"100%"} asChild>
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
