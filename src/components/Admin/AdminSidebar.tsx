"use client";
import {
  Flex,
  Avatar,
  Separator,
  Box,
  Text,
  Section,
  Button,
  RadioCards,
  Card,
} from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();
  const path = usePathname();
  console.log(path);

  return (
    <Box
      className="sidebar"
      p="4"
      style={{ backgroundColor: "Background" }}
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
        <Card asChild>
          <a href="/admin" className="text-center">Overview</a>
        </Card>

        <Box flexGrow="1" />
        <Button color="gray" highContrast size="2" variant="soft" asChild>
          <a href="/">Home</a>
        </Button>
      </Flex>
    </Box>
  );
}
