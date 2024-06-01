"use client";
import { Flex, Avatar, Separator, Box, Text, Button } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();
  const path = usePathname();

  return (
    <Box
      className="sidebar"
      p="4"
      style={{ backgroundColor: "var(--color-panel-translucent)", backdropFilter: "blur(64px)" }}
      asChild
    >
      <Flex direction="column" gap="2">
        <Flex align={"center"} gap="4">
          <Avatar
            src="https://aor-db.rxserver.net/api/files/5mi9aigq1vllq5y/qoactmfy9114zga/ao_r_vNLeJJrHu2.ico"
            fallback="A"
            size={"4"}
          />
          <Separator orientation={"vertical"} size={"2"} />
          <Text>SGN Admin</Text>
        </Flex>
        <Box my="3" />

        <Box
          asChild
          style={{
            backgroundColor: path === "/admin" ? "var(--gray-a4)" : "",
            borderRadius: 10,
          }}
          p="2"
        >
          <a href="/admin" className="text-center">
            Overview
          </a>
        </Box>

        <Box
          asChild
          style={{
            backgroundColor: path === "/admin/stargates" ? "var(--gray-a4)" : "",
            borderRadius: 10,
          }}
          p="2"
        >
          <a href="/admin/stargates" className="text-center bg-[--primary] ">
            Stargates
          </a>
        </Box>

        <Box
          asChild
          style={{
            backgroundColor: path === "/admin/users" ? "var(--gray-a4)" : "",
            borderRadius: 10,
          }}
          p="2"
        >
          <a href="/admin/users" className="text-center bg-[--primary] ">
            Users
          </a>
        </Box>

        <Box flexGrow="1" />
        <Button color="gray" highContrast size="2" variant="soft" asChild>
          <a href="/">Home</a>
        </Button>
      </Flex>
    </Box>
  );
}
