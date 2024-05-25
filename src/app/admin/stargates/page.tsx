import AdminSidebar from "@/components/Admin/AdminSidebar";
import { Avatar, Box, Flex, Separator, Text } from "@radix-ui/themes";

export default function Admin() {
  return (
    <>
      <Box className="min-h-screen hidden lg:block">
        <AdminSidebar />
        <Box className="main">
          
        </Box>
      </Box>
      <Box className="min-h-screen hidden md:block lg:hidden">md</Box>
      <Box className="min-h-screen block md:hidden lg:hidden">sm</Box>
    </>
  );
}
