"use client";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { usePathname } from "next/navigation";

export default function Admin() {
  const path = usePathname();
  return (
    <Box>
      <Box className="hidden lg:block">
        <Box className="flex overflow-hidden">
          <AdminSidebar />

          <Box className="main overflow-auto w-full justify-center">
            <Box
              width="100%"
              style={{ backgroundColor: "Background" }}
              height="5rem"
            ></Box>
            <Flex direction="column"></Flex>
          </Box>
        </Box>
      </Box>
      <Box className="hidden md:block lg:hidden">md</Box>
      <Box className="block md:hidden lg:hidden">sm</Box>
    </Box>
  );
}
