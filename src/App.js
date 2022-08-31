import { Box, useToast, Button, Flex, HStack, Stack, Text, Input, IconButton, VStack, Divider, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaMoon, FaSun } from "react-icons/fa"
import { SubjectItem } from "./components/SubjectItem";

function App() {

  const [subject, setSubject] = useState("")
  const [credit, setCredit] = useState(1)
  const [note, setNote] = useState(1)
  const [list, setList] = useState(JSON.parse(localStorage.getItem('subjectList')) || [])
  const [satlag, setSAtlag] = useState(0.00)
  const [cindex, setCIndex] = useState(0.00)
  const [ccindex, setCCIndex] = useState(0.00)

  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()

  const removeSubject = (id) => {
    const filtered = list.filter(s => s.subject !== id)
    setList(filtered)

    toast({
      title: 'Success',
      description: `${id} has been removed from the list.`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })

  }

  const minusCredit = () => {
    if (credit > 1) {
      let current = credit - 1
      setCredit(current)
    }
  }

  const plusCredit = () => {
    let current = credit + 1
    setCredit(current)
  }

  const minusNote = () => {
    if (note > 1) {
      let current = note - 1
      setNote(current)
    }
  }

  const plusNote = () => {
    if (note < 5) {
      let current = note + 1
      setNote(current)
    }
  }

  const addSubject = () => {
    if (subject === "") {
      toast({
        title: 'Error',
        description: "Please give the subject's name",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    } else {
      setList([...list, { subject: subject, credit: credit, note: note }])
      toast({
        title: 'Success',
        description: `${subject} has been added to the list successfully.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      setSubject("")
      setCredit(1)
      setNote(1)
    }
  }

  const calculate = () => {
    let sum = 0
    let sumCompleted = 0
    let completedCredits = 0
    let assignedCredits = 0

    list.map((subject) => {
      if (subject.note > 1) {
        completedCredits += subject.credit
        sumCompleted += subject.note * subject.credit
      }
      assignedCredits += subject.credit

      sum += subject.credit * subject.note
    })
    if (sum !== 0 && completedCredits !== 0) {
      setSAtlag((sumCompleted / completedCredits).toFixed(2))
      setCIndex((sumCompleted / 30).toFixed(2))
      setCCIndex(((sumCompleted / 30) * (completedCredits / assignedCredits)).toFixed(2))
    } else {
      setSAtlag(0.00)
      setCIndex(0.00)
      setCCIndex(0.00)
    }
  }

  const plusCredit2 = (id) => {
    const changed = list.map(s => {
      if (s.subject === id) {
        return { ...s, credit: s.credit + 1 }
      } else {
        return s
      }
    })

    setList(changed)
  }

  const minusCredit2 = (id) => {
    const changed = list.map(s => {
      if (s.subject === id) {
        return { ...s, credit: s.credit - 1 }
      } else {
        return s
      }
    })

    setList(changed)
  }

  const plusNote2 = (id) => {
    const changed = list.map(s => {
      if (s.subject === id) {
        if (s.note < 5) {
          return { ...s, note: s.note + 1 }
        } else {
          return s
        }
      } else {
        return s
      }
    })

    setList(changed)
  }

  const minusNote2 = (id) => {
    const changed = list.map(s => {
      if (s.subject === id) {
        if (s.note > 1) {
          return { ...s, note: s.note - 1 }
        } else {
          return s
        }
      } else {
        return s
      }
    })

    setList(changed)
  }

  useEffect(() => {
    localStorage.setItem("subjectList", JSON.stringify(list))
  }, [list])

  return (
    <Flex justifyContent={"center"}>
      <IconButton onClick={toggleColorMode} position={"absolute"} right={10} top={5} icon={colorMode === "light" ? <FaSun /> : <FaMoon />} borderRadius={10} />
      <Flex boxShadow={"xl"} p={10} gap="20px" flexDir={"column"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>Grade calculator</Text>
        </Box>
        <Stack direction={["column", "row"]} spacing={"30px"}>
          <Box>
            <Text marginBottom={"20px"} fontWeight={"medium"} fontSize={{ lg: "xl", sm: 'lg', base: 'md' }}>Subject's name</Text>
            <Input w={"auto"} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject's name" />
          </Box>
          <Box>
            <Text marginBottom={"20px"} fontWeight={"medium"} fontSize={{ lg: "xl", sm: 'lg', base: 'md' }}>Credit value</Text>
            <HStack>
              <IconButton
                icon={<FaMinus />}
                isRound={true}
                onClick={() => minusCredit()}
              ></IconButton>
              <Text>{credit}</Text>
              <IconButton
                icon={<FaPlus />}
                isRound={true}
                onClick={() => plusCredit()}
              ></IconButton>
            </HStack>
          </Box>
          <Box>
            <Text marginBottom={"20px"} fontWeight={"medium"} fontSize={{ lg: "xl", sm: 'lg', base: 'md' }}>Grade</Text>
            <HStack>
              <IconButton
                icon={<FaMinus />}
                isRound={true}
                onClick={() => minusNote()}
              ></IconButton>
              <Text>{note}</Text>
              <IconButton
                icon={<FaPlus />}
                isRound={true}
                onClick={() => plusNote()}
              ></IconButton>
            </HStack>
          </Box>
          <Box >
            <Text marginBottom={"20px"} fontWeight={"medium"} fontSize={{ lg: "xl", sm: 'lg', base: 'md' }}>Add</Text>
            <IconButton
              size={"sm"}
              icon={<FaPlus />}
              isRound={false}
              onClick={addSubject}
            ></IconButton>
          </Box>
        </Stack>
        <VStack>
          <Box w={"100%"}>
            {(list && list.length !== 0) ? (
              list.map((item) => {
                return <SubjectItem plusNote2={plusNote2} minusNote2={minusNote2} minusCredit2={minusCredit2} plusCredit2={plusCredit2} removeSubject={removeSubject} key={item.subject} subject={item.subject} credit={item.credit} note={item.note} />
              })
            ) : ""}
          </Box>
        </VStack>
        <HStack>
          <Button onClick={calculate} variant={"outline"} bgColor={"teal"}>Calculate</Button>
          <Text color={"gray"} fontWeight={"small"} fontSize={"md"}>{list.length} subject has added</Text>
        </HStack>
        <Divider />
        <Box>
          <Text fontSize={{ lg: "2xl", sm: 'lg', base: 'md' }} fontWeight={"bold"}>Statistics</Text>
        </Box>
        <Flex gap={"10%"}>
          <VStack>
            <Text fontWeight={"sm"} fontSize={"md"} color={"gray"}>Credit index</Text>
            <Text fontWeight={"bold"} fontSize={"3xl"}>{cindex}</Text>
          </VStack>
          <VStack>
            <Text fontWeight={"sm"} fontSize={"md"} color={"gray"}>Corrigated credit index</Text>
            <Text fontWeight={"bold"} fontSize={"3xl"}>{ccindex}</Text>
          </VStack>
          <VStack>
            <Text fontWeight={"sm"} fontSize={"md"} color={"gray"}>Weighted avg.</Text>
            <Text fontWeight={"bold"} fontSize={"3xl"}>{satlag}</Text>
          </VStack>
        </Flex>
      </Flex>
    </Flex >
  );
}

export default App;
