"use client";
import { pb } from "@/services/pocketbase.service";
import {
  Card,
  Flex,
  Box,
  Heading,
  Button,
  Separator,
  Portal,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

export default function Error({
  code,
  message,
}: {
  code: number;
  message: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-24">
      <Portal>
        <Toaster position="top-left" />
      </Portal>
      <Box height={"fit-content"} width={"100%"}>
        <Flex>
          <Box p="6" asChild>
            <Card>
              <Heading>
                {code} | {message}
              </Heading>
              <Separator my="4" size="4" />
              <Flex justify="end">
                <Button variant="ghost" highContrast color="gray" asChild>
                  <a href="/">Go Back</a>
                </Button>
              </Flex>
            </Card>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}
