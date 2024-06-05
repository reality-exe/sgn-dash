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
  Badge,
} from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { ListResult, RecordAuthResponse } from "pocketbase";
import { useEffect, useState } from "react";
import { pb } from "@/services/pocketbase.service";


export default function AdminStargate() {
  const router = useRouter();
  const [init, setInit] = useState<boolean>(false);
  const [user, setUser] = useState<RecordAuthResponse<User>>();
  const [users, setUsers] = useState<ListResult<User>>();
  const [usrPg, setUsrPg] = useState<number>(1);
  

  useEffect(() => {
    pb.collection("users")
      .authRefresh()
      .then((user) => {
        setUser(user);
        pb.collection("users").getList(usrPg, 5).then((v) => {
          setUsers(v);
        })
        })
      .catch((err) => {
        router.push("/");
      });
  }, [router, usrPg]);

  function changeGatePage(page: number) {
    pb.collection("users")
      .getList(page, 5)
      .then((users) => {
        setUsers(users) 
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
                        Registered Users - {users?.items.length ?? "--"}
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
                              Administrators
                            </Text>
                            <Text size="6" align="center">
                              {}
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
                            <Text size="6" align="center">
                              {users?.items.filter((v) => v.tags.includes("admin")).length ?? "--"}
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
                            disabled={users?.page == 1}
                            onClick={() => {
                              let page = users?.page ?? 1;
                              let newpage = page - 1;
                              changeGatePage(newpage);
                            }}
                          >
                            Previous Page
                          </Button>
                          <Box flexGrow="1" asChild>
                            <Text align="center" size="6" weight="medium">
                             All Users 
                            </Text>
                          </Box>
                          <Button
                            variant="surface"
                            disabled={users?.page == users?.totalPages}
                            onClick={() => {
                              let page = users?.page ?? 1;
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
                        <Box maxHeight="30rem" overflowY="scroll">
                          <Table.Root>
                            <Table.Header>
                              <Table.Row>
                                <Table.ColumnHeaderCell width="5.2rem" />
                                <Table.ColumnHeaderCell>
                                  Email
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                  Username 
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                  Discord ID
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                  Tags
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell width="4rem" />
                              </Table.Row>
                            </Table.Header>
                            <Table.Body  >
                              {users?.items.map((v, i) => (
                                <Table.Row key={`${v.username}-${i}`}>
                                  <Table.Cell><Avatar size="2" src={`https://aor-db.rxserver.net/api/files/users/${v.id}/${v.avatar}?thumb=64x64`} fallback={v.username.slice(0,2)} /></Table.Cell>
                                  <Table.Cell>{v.email}</Table.Cell>
                                  <Table.Cell>{v.username}</Table.Cell>
                                  <Table.Cell>{v.discord_id ? <Text>{v.discord_id}</Text> :  <Text>Not Linked</Text>}</Table.Cell>
                                  <Table.Cell>{v.tags.length == 0 ? <Badge>No Tags</Badge> : v.tags.map((txt) => (<Badge key={txt}>{txt}</Badge>))}</Table.Cell>
                                  <Table.Cell />
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
