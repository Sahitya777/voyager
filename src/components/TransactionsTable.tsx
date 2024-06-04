import AcceptedonL2 from "@/assets/AcceptedonL2";
import { Box, HStack, Skeleton, Tab, TabList, Table, TableContainer, Tabs, Tbody, Td, Text, Thead, Tooltip, Tr, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Copy } from "lucide-react";
import { useDrawContext } from "@/context/DrawerContext";
import { timeElapsed } from "@/lib/utils";
const TransactionsTable = ({transactions,blockNumber}:any) => {
    const [actionSelected, setactionSelected] = useState<String>("ALL")
    const router=useRouter();
    const [copied, setCopied] = useState(false);
    const [currentCopiedIdnex, setcurrentCopiedIdnex] = useState<Number>(-1)
    const [currentCopiedBlockIndex, setcurrentCopiedBlockIndex] = useState<Number>(-1)
    const [hoverCopy, sethoverCopy] = useState<Number>(0)
    const [currentHoverIndex, setcurrentHoverIndex] = useState<Number>()
    const { timestampBlockwise, settimestampBlockwise,currentSelectedtxIndex, setcurrentSelectedtxIndex,selectedTransactionDetails, setselectedTransactionDetails } = useDrawContext();
    const handleCopy = (copyValue: string) => {
      navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    };
    const columnItems = [
        'STATUS',
        'HASH',
        'TYPE',
        'BLOCK',
        'AGE',
      ]
      const bgColorType:any={
        "DEPLOY":"rgb(34, 54, 85)",
        "DEPLOY_ACCOUNT":"rgb(34, 54, 85)",
        "INVOKE":"rgb(32, 46, 38)",
        "L1_HANDLER":"rgb(56, 56, 56)",
        "DECLARE":"rgb(32, 46, 38)"
      }
      const ColorType:any={
        "DEPLOY":"rgb(210, 229, 255)",
        "DEPLOY_ACCOUNT":"rgb(210, 229, 255)",
        "INVOKE":"rgb(130, 244, 187)",
        "L1_HANDLER":"rgb(255, 255, 255)",
        "DECLARE":"rgb(254, 255, 181)"
      }
      const BorderColorType:any={
        "DEPLOY":"1px solid rgb(60, 80, 110)",
        "DEPLOY_ACCOUNT":"1px solid rgb(60, 80, 110)",
        "INVOKE":"1px solid rgb(46, 76, 60)",
        "L1_HANDLER":"1px solid rgb(94, 94, 94)",
        "DECLARE":"1px solid rgb(107, 125, 7)"
      }
  return (
    <Box
      bg="#1b1b1b"
      width="70%"
      borderRadius="6px"
      padding="32px"
      display="flex"
      flexDirection="column"
    >
      <Text fontSize="22px" fontWeight="500" fontStyle="normal" color="#fff">
        Transactions
      </Text>
      <Text
        fontSize="14px"
        fontWeight="400"
        lineHeight="1.4"
        fontStyle="normal"
        color="rgb(202, 202, 202)"
        mt="0.2rem"
      >
        A list of transactions on Starknet
      </Text>
      <Tabs mt="2.5rem">
        <TabList borderRadius="md">
          <Tab
            paddingLeft="16px"
            paddingRight="16px"
            height="32px"
            fontSize="14px"
            color="#fff"
            border="1px solid rgb(75, 75, 75)"
            borderLeftRadius="4px"
            fontWeight="normal"
            _selected={{
              color: "white",
              bg: "rgb(75, 75, 75)",
              border: "none",
            }}
            _hover={{
                bg:'rgb(56, 56, 56)'
            }}
            onClick={()=>{
                setactionSelected("ALL");
            }}
            //   isDisabled={unstakeTransactionStarted == true}
            //   onClick={() => {
            //     setSelectedTab('stake')
            //     resetStates()
            //   }}
          >
            All
          </Tab>
          <Tab
            paddingLeft="16px"
            paddingRight="16px"
            height="32px"
            fontSize="14px"
            color="#fff"
            border="1px solid rgb(75, 75, 75)"
            borderLeftRadius="md"
            fontWeight="normal"
            _selected={{
              color: "white",
              bg: "rgb(75, 75, 75)",
              border: "none",
            }}
            _hover={{
                bg:'rgb(56, 56, 56)'
            }}
            onClick={()=>{
                setactionSelected("DECLARE");
            }}
            //   isDisabled={transactionStarted == true}
            //   onClick={() => {
            //     setSelectedTab('unstake')
            //     resetStates()
            //   }}
          >
            declare
          </Tab>
          <Tab
            paddingLeft="16px"
            paddingRight="16px"
            height="32px"
            fontSize="14px"
            color="#fff"
            border="1px solid rgb(75, 75, 75)"
            borderLeftRadius="md"
            fontWeight="normal"
            _selected={{
              color: "white",
              bg: "rgb(75, 75, 75)",
              border: "none",
            }}
            _hover={{
                bg:'rgb(56, 56, 56)'
            }}
            onClick={()=>{
                setactionSelected("DEPLOY");
            }}
            //   isDisabled={transactionStarted == true}
            //   onClick={() => {
            //     setSelectedTab('unstake')
            //     resetStates()
            //   }}
          >
            deploy
          </Tab>
          <Tab
            paddingLeft="16px"
            paddingRight="16px"
            height="32px"
            fontSize="14px"
            color="#fff"
            border="1px solid rgb(75, 75, 75)"
            borderLeftRadius="md"
            fontWeight="normal"
            _selected={{
              color: "white",
              bg: "rgb(75, 75, 75)",
              border: "none",
            }}
            _hover={{
                bg:'rgb(56, 56, 56)'
            }}
            onClick={()=>{
                setactionSelected("DEPLOY_ACCOUNT");
            }}
            //   isDisabled={transactionStarted == true}
            //   onClick={() => {
            //     setSelectedTab('unstake')
            //     resetStates()
            //   }}
          >
            deploy_account
          </Tab>
          <Tab
            paddingLeft="16px"
            paddingRight="16px"
            height="32px"
            fontSize="14px"
            color="#fff"
            border="1px solid rgb(75, 75, 75)"
            borderLeftRadius="md"
            fontWeight="normal"
            _selected={{
              color: "white",
              bg: "rgb(75, 75, 75)",
              border: "none",
            }}
            _hover={{
                bg:'rgb(56, 56, 56)'
            }}
            onClick={()=>{
                setactionSelected("INVOKE");
            }}
            //   isDisabled={transactionStarted == true}
            //   onClick={() => {
            //     setSelectedTab('unstake')
            //     resetStates()
            //   }}
          >
            invoke
          </Tab>
          <Tab
            paddingLeft="16px"
            paddingRight="16px"
            height="32px"
            fontSize="14px"
            color="#fff"
            border="1px solid rgb(75, 75, 75)"
            borderRightRadius="4px"
            fontWeight="normal"
            _selected={{
              color: "white",
              bg: "rgb(75, 75, 75)",
              border: "none",
            }}
            _hover={{
                bg:'rgb(56, 56, 56)'
            }}
            onClick={()=>{
                setactionSelected("L1_HANDLER");
            }}
            //   isDisabled={transactionStarted == true}
            //   onClick={() => {
            //     setSelectedTab('unstake')
            //     resetStates()
            //   }}
          >
            l1_handler
          </Tab>
        </TabList>
      </Tabs>
      <Box>
      <TableContainer
        bg="transparent"
        color="white"
        borderRadius="md"
        w="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflowX="visible"
        overflowY="visible"
        mt="2rem"
      >
        <Table variant="unstyled" width="100%" height="100%" mb="0.5rem" borderTop="1px solid rgb(56, 56, 56)">
          <Thead width={'100%'} height={'2rem'}>
            <Tr width={'100%'} height="1rem">
              {columnItems.map((val: any, idx1: any) => (
                <Td
                  key={idx1}
                  width={'14%'}
                  fontWeight={400}
                  p={0}
                //   px={idx1 == 0 ? '1rem' : '2rem'}
                >
                  <Text
                    whiteSpace="pre-wrap"
                    overflowWrap="break-word"
                    textTransform="capitalize"
                    width={'100%'}
                    height={'2rem'}
                    fontSize="12px"
                    fontWeight='500'
                    pt="5"
                    textAlign={
                      idx1 == 0
                        ? 'left'
                        : idx1 == columnItems?.length - 1
                          ? 'center'
                          : 'center'
                    }
                    // pl={idx1 == 0 ? 2 : idx1 == 1 ? '55%' : '32%'}
                    pr={idx1 == columnItems.length - 1 ? 5 : 10}
                    color={'#AAAAAA'}
                    cursor="context-menu"
                  >
                      {val}
                  </Text>
                </Td>
              ))}
            </Tr>
          </Thead>

          <Tbody position="relative" overflowX="hidden">
            {transactions.filter((transaction:any)=>
                actionSelected === 'ALL' || transaction?.type === actionSelected  )
              .map((transaction: any, idx: any) => {
                return (
                  <>
                  <Tr
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '1px',
                        borderBottom: '1px solid rgb(56, 56, 56)',
                        display: `block`,
                      }}
                    />
                    <Tr
                      key={transaction.idx}
                      width={'100%'}
                      position="relative"
                      p={0}
                      _hover={{
                        bg:'rgb(56, 56, 56)'
                      }}
                    >
                      <Td
                        width={'12.5%'}
                        fontSize={'14px'}
                        fontWeight={400}
                        padding={2}
                        textAlign="center"
                      >
                        <VStack
                          width="100%"
                          display="flex"
                          alignItems="flex-start"
                          height="2.5rem"
                        >
                          <HStack
                            height="2rem"
                            width="2rem"
                            alignItems="center"
                            justifyContent="center"
                            cursor="pointer"
                          >
                            <Tooltip
                            hasArrow
                            label={
                                'Accepted on L2'
                            }
                            placement="top-end"
                            ml="8rem"
                            rounded="md"
                            boxShadow="dark-lg"
                            bg="white"
                            fontSize={'13px'}
                            fontWeight={'400'}
                            borderRadius={'6px'}
                            padding={'8px 16px'}
                            color="black"
                            border="1px solid"
                            borderColor="#23233D"
                            arrowShadowColor="#2B2F35"
                            maxWidth="100rem"
                            >
                                <Box  width="16px" >
                                    <AcceptedonL2/>
                                </Box>
                          </Tooltip>
                          </HStack>
                        </VStack>
                      </Td>

                      <Td
                        width={'12.5%'}
                        fontSize={'14px'}
                        fontWeight={400}
                        overflow={'hidden'}
                        textAlign={'center'}
                      >
                        <Box
                          width="100%"
                          pl="20%"
                          height="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontWeight="400"
                          textAlign="center"
                        >
                          <VStack
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="flex-start"
                            height="2.5rem"
                          >
                            <Box display='flex' gap="0.5rem">
                                <Text fontSize="14px" fontWeight="400" color="#8BA3DF" cursor="pointer" _hover={{color:''}} onClick={()=>{
                                    setcurrentSelectedtxIndex(idx);
                                    setselectedTransactionDetails(transaction)
                                    if(transaction?.type==="INVOKE"){
                                        router.push(`/tx/${transaction?.transaction_hash}`)
                                    }
                                }}>
                                    {transaction?.transaction_hash.substring(0,6)}...{transaction?.transaction_hash.substring(transaction?.transaction_hash.length-5,transaction?.transaction_hash.length)}
                                </Text>
                                <Box display="flex" gap="0.5rem" cursor="pointer" onClick={()=>{
                                    setcurrentCopiedIdnex(idx);
                                    navigator.clipboard.writeText(
                                        transaction?.transaction_hash
                                    )                                   
                                }}
                                onMouseEnter={()=>{
                                    sethoverCopy(1);
                                    setcurrentHoverIndex(idx)
                                }}
                                onMouseLeave={()=>{
                                    sethoverCopy(0);
                                    setcurrentHoverIndex(-1);
                                }}
                                >
                                    <Copy height="14px" width="14px" color={(hoverCopy==1 && idx===currentHoverIndex) ?"#999898": "#7E7E7E"} style={{marginTop:"3"}} onClick={()=>{
                                        handleCopy(transaction?.transaction_hash)
                                    }}/>
                                    {(copied && currentCopiedIdnex==idx) && <Text bg="#1B1B1B" fontSize="12px" px="6px" border="1px solid #4B4B4B" borderRadius="6px">
                                        COPIED!
                                    </Text>}
                                </Box>
                            </Box>
                          </VStack>
                        </Box>
                      </Td>
                      <Td
                        width={'12.5%'}
                        maxWidth={'5rem'}
                        fontSize={'14px'}
                        fontWeight={400}
                        textAlign={'center'}
                      >
                        <VStack
                          width="100%"
                          display="flex"
                          alignItems="center"
                          height="2.5rem"
                        >
                          <HStack
                            height="2rem"
                            // width="2rem"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Box
                              display="flex"
                              border="1px"
                              borderColor="#2B2F35"
                              justifyContent="space-between"
                              ml="2rem"
                              pt="7"
                              pl="3"
                              pr="3"
                              width="7rem"
                              borderRadius="md"
                              cursor="pointer"
                            >
                            <Box
                              bg={bgColorType[transaction?.type]}
                              color={ColorType[transaction?.type]}
                              lineHeight="20px"
                              letterSpacing="-0.15px"
                              padding="1px 8px"
                              fontSize="12px"
                              borderRadius="4px"
                              border={BorderColorType[transaction?.type]}
                            >
                              {transaction?.type}
                            </Box>
                            </Box>
                          </HStack>
                        </VStack>
                      </Td>
                      <Td
                        width={'12.5%'}
                        maxWidth={'3rem'}
                        fontSize={'14px'}
                        fontWeight={400}
                        overflow={'hidden'}
                        textAlign={'center'}
                      >
                        <Box display='flex' gap="0.5rem" justifyContent="center" cursor="pointer">
                            <Text fontSize="14px" fontWeight="400" color="#8BA3DF" cursor="pointer" onClick={()=>{
                                router.push(`https://voyager.online/block/${blockNumber}`)
                            }}>
                                {blockNumber}
                            </Text>
                            <Box display="flex" onClick={()=>{
                                setcurrentCopiedBlockIndex(idx)
                            }}>
                                <Copy height="14px" width="14px" color={(hoverCopy==2 && idx===currentCopiedBlockIndex) ?"#999898": "#7E7E7E"} style={{marginTop:"3"}} onClick={()=>{
                                            handleCopy(blockNumber)
                                        }}/>
                                {(copied && currentCopiedBlockIndex==idx) && <Text bg="#1B1B1B" fontSize="12px" px="6px" border="1px solid #4B4B4B" borderRadius="6px">
                                            COPIED!
                                        </Text>}
                            </Box>
                        </Box>
                      </Td>
                      <Td
                        width={'12.5%'}
                        maxWidth={'5rem'}
                        fontSize={'14px'}
                        fontWeight={400}
                        textAlign={'center'}
                        p="0"
                      >
                        <Box
                          width="100%"
                          height="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontWeight="400"
                        >
                          <Box
                          >
                          {timeElapsed(timestampBlockwise?.timeStamp)}
                            {/* <TransactionCancelModal/> */}
                          </Box>
                        </Box>
                      </Td>
                    </Tr>

                    <Tr
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '1px',
                        borderBottom: '1px solid #2b2f35',
                        display: `block`,
                      }}
                    />
                  </>
                )
              })}
          </Tbody>
        </Table>
      </TableContainer>
      </Box>
    </Box>
  );
};

export default TransactionsTable;
