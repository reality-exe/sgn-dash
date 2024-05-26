"use client";
import { pb } from "@/services/pocketbase.service";
import {
  Card,
  Flex,
  Box,
  Tabs,
  TextField,
  Heading,
  Button,
  Separator,
  Portal,
  Text,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { At, DiscordLogo, Password, User } from "@phosphor-icons/react";
import { Toaster, toast } from "react-hot-toast";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { ClientResponseError } from "pocketbase";
import { RiLoginCircleLine } from "react-icons/ri";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { TbBrandDiscord } from "react-icons/tb";
import { PiDiscordLogo } from "react-icons/pi";
import { RxDiscordLogo } from "react-icons/rx";
import { AuthentikAuth } from "@/types/AuthentikAuth";
import { DiscordAuth } from "@/types/DiscordAuth";

export default function Login() {
  const [init, setInit] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [username, setUsername] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();

  // Errors
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>();
  const [usernameError, setUsernameError] = useState<string>();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  });

  async function checkAuth() {
    try {
      let response = await pb.collection("users").authRefresh();
      router.push("/");
    } catch (err) {}
  }

  useEffect(() => {
    checkAuth();
  }, []);
  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 90,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: false,
    }),
    []
  );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-24">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <Portal>
        <Toaster position="top-left" />
      </Portal>
      <Box asChild height={"fit-content"} width={"25rem"}>
        <Card>
          <Flex
            width={"100%"}
            direction={"column"}
            gap={"4"}
            align={"center"}
            justify={"center"}
          >
            <Heading>Stargate Network Auth</Heading>
            <Box width={"100%"}>
              <Tabs.Root defaultValue="login">
                <Tabs.List justify={"center"}>
                  <Tabs.Trigger value="login">Login</Tabs.Trigger>
                  <Tabs.Trigger value="register">Register</Tabs.Trigger>
                </Tabs.List>
                <Box pt="3">
                  <Tabs.Content value="login">
                    <Flex direction={"column"} gap={"4"}>
                      <Box width={"100%"}>
                        <TextField.Root
                          placeholder="Email"
                          size="3"
                          value={email}
                          type="email"
                          onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.currentTarget.value);
                          }}
                        >
                          <TextField.Slot>
                            <At size={18} />
                          </TextField.Slot>
                        </TextField.Root>
                      </Box>
                      <Box width={"100%"}>
                        <TextField.Root
                          placeholder="Password"
                          size="3"
                          value={password}
                          type="password"
                          onChange={(e) => {
                            e.preventDefault();
                            setPassword(e.currentTarget.value);
                          }}
                        >
                          <TextField.Slot>
                            <Password size={18} />
                          </TextField.Slot>
                        </TextField.Root>
                      </Box>
                      <Button
                        onClick={() => {
                          pb.collection("users")
                            .authWithPassword(
                              email as string,
                              password as string
                            )
                            .then(() => {
                              router.push("/");
                            })
                            .catch(() => {
                              toast.error(
                                "Something went wrong.\nCheck your email and password for typos and try again."
                              );
                            });
                        }}
                      >
                        Login with Email
                      </Button>
                      <Separator size={"4"}></Separator>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          pb.collection("users")
                            .authWithOAuth2({
                              provider: "discord",
                            })
                            .then((val) => {
                              let auth: DiscordAuth = val as DiscordAuth;
                              pb.collection("users").update(auth.record.id, {
                                discord_id: auth.meta.id,
                              });
                              // router.push("/");
                            });
                        }}
                      >
                        <RxDiscordLogo size={22} /> Continue with Discord
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          pb.collection("users")
                            .authWithOAuth2({
                              provider: "oidc",
                            })
                            .then((val) => {
                              let auth: AuthentikAuth = val as AuthentikAuth;
                              router.push("/");
                            });
                        }}
                      >
                        <RiLoginCircleLine size={22} /> Continue with Authentik
                      </Button>
                    </Flex>
                  </Tabs.Content>
                  <Tabs.Content value="register">
                    <Flex direction={"column"} gap={"4"}>
                      <Box width={"100%"}>
                        <label>
                          <TextField.Root
                            placeholder="Username"
                            size="3"
                            value={username}
                            type="text"
                            onChange={(e) => {
                              e.preventDefault();
                              setUsername(e.currentTarget.value);
                            }}
                          >
                            <TextField.Slot>
                              <User size={18} />
                            </TextField.Slot>
                          </TextField.Root>
                          {usernameError ?? (
                            <Text color="red">{usernameError}</Text>
                          )}
                        </label>
                      </Box>
                      <Box width={"100%"}>
                        <label>
                          <TextField.Root
                            placeholder="Email"
                            size="3"
                            value={email}
                            type="email"
                            onChange={(e) => {
                              e.preventDefault();
                              setEmail(e.currentTarget.value);
                            }}
                          >
                            <TextField.Slot>
                              <At size={18} />
                            </TextField.Slot>
                          </TextField.Root>
                          {emailError ?? <Text color="red">{emailError}</Text>}
                        </label>
                      </Box>
                      <Box width={"100%"}>
                        <label>
                          <TextField.Root
                            placeholder="Password"
                            size="3"
                            value={password}
                            type="password"
                            onChange={(e) => {
                              e.preventDefault();
                              setPassword(e.currentTarget.value);
                            }}
                          >
                            <TextField.Slot>
                              <Password size={18} />
                            </TextField.Slot>
                          </TextField.Root>
                          {passwordError ?? (
                            <Text color="red">{passwordError}</Text>
                          )}
                        </label>
                      </Box>
                      <Box width={"100%"}>
                        <label>
                          <TextField.Root
                            placeholder="Confirm Password"
                            size="3"
                            value={passwordConfirm}
                            type="password"
                            onChange={(e) => {
                              e.preventDefault();
                              setPasswordConfirm(e.currentTarget.value);
                            }}
                          >
                            <TextField.Slot>
                              <Password size={18} />
                            </TextField.Slot>
                          </TextField.Root>

                          {passwordConfirmError ?? (
                            <Text color="red">{passwordConfirmError}</Text>
                          )}
                        </label>
                      </Box>
                      <Button
                        onClick={(e) => {
                          let response = pb
                            .collection("users")
                            .create({
                              username: username,
                              email: email,
                              password: password,
                              passwordConfirm: passwordConfirm,
                            })
                            .then(() => {
                              pb.collection("users")
                                .authWithPassword(
                                  email as string,
                                  password as string
                                )
                                .then(() => router.push("/"));
                            })
                            .catch((err: ClientResponseError) => {
                              let res = err.response;
                              setEmailError(
                                res.data.email?.message ?? undefined
                              );
                              setPasswordError(
                                res.data.password?.message ?? undefined
                              );
                              setPasswordConfirmError(
                                res.data.passwordConfirm?.message ?? undefined
                              );
                              if (!username) {
                                setUsernameError("Cannot be blank.");
                              } else {
                                setUsernameError(
                                  res.data.username?.message ?? undefined
                                );
                              }
                            });
                        }}
                      >
                        Register with Email
                      </Button>
                    </Flex>
                  </Tabs.Content>
                </Box>
              </Tabs.Root>
            </Box>
          </Flex>
        </Card>
      </Box>
    </div>
  );
}
