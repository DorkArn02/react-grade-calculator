import React from 'react'
import { Box, HStack, Text, IconButton, Input, Stack } from "@chakra-ui/react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa"

export const SubjectItem = ({ plusNote2, minusNote2, plusCredit2, minusCredit2, subject, credit, note, removeSubject }) => {
    return (
        <Stack direction={["column", "row"]} marginBottom={"20px"} spacing={"30px"}>
            <Box>
                <Input w={"auto"} value={subject} isDisabled={true} />
            </Box>
            <Box>
                <HStack>
                    <IconButton
                        onClick={() => minusCredit2(subject)}
                        icon={<FaMinus />}
                        isRound={true}
                    ></IconButton>
                    <Text>{credit}</Text>
                    <IconButton
                        onClick={() => plusCredit2(subject)}
                        icon={<FaPlus />}
                        isRound={true}
                    ></IconButton>
                </HStack>
            </Box>
            <Box>
                <HStack>
                    <IconButton
                        onClick={() => minusNote2(subject)}
                        icon={<FaMinus />}
                        isRound={true}
                    ></IconButton>
                    <Text>{note}</Text>
                    <IconButton
                        onClick={() => plusNote2(subject)}
                        icon={<FaPlus />}
                        isRound={true}
                    ></IconButton>
                </HStack>
            </Box>
            <Box >
                <IconButton
                    size={"sm"}
                    onClick={() => removeSubject(subject)}
                    icon={<FaTrash />}
                    isRound={false}
                    bgColor={"red.800"}
                ></IconButton>
            </Box>
        </Stack>
    )
}
