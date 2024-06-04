import AcceptedonL2 from '@/assets/AcceptedonL2'
import { useDrawContext } from '@/context/DrawerContext'
import { timeElapsed } from '@/lib/utils'
import { Box, Table, TableContainer, Td, Thead, Tr,Text, Tbody, VStack, HStack, Tooltip } from '@chakra-ui/react'
import { Copy } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const EventsTable = ({events}:any) => {
    const columnItems = [
        'ID',
        'BLOCK',
        'AGE',
      ]
    const router=useRouter();
    const [copied, setCopied] = useState(false);
    const [currentCopiedIdnex, setcurrentCopiedIdnex] = useState<Number>(-1)
    const [currentCopiedBlockIndex, setcurrentCopiedBlockIndex] = useState<Number>(-1)
    const [hoverCopy, sethoverCopy] = useState<Number>(0)
    const { timestampBlockwise, settimestampBlockwise,currentSelectedtxIndex } = useDrawContext();
    const [currentHoverIndex, setcurrentHoverIndex] = useState<Number>()
    const handleCopy = (copyValue: string) => {
        navigator.clipboard.writeText(copyValue);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      };
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
    <Box>
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
                      idx1 ==  columnItems?.length - 1
                        ?'center': 'left'
                    }
                    pl={idx1==1 ?'70':idx1==0?'10':''}
                    // pl={idx1 == 0 ? 2 : idx1 == 1 ? '55%' : '32%'}
                    pr={idx1 == columnItems.length - 1 ? 5 : 0}
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
            {events
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
                            pl="3rem"
                          >
                                <Text fontSize="14px" fontWeight="400" color="#8BA3DF" cursor="pointer" _hover={{color:''}} onClick={()=>{
                                    router.push(`https://voyager.online/event/${timestampBlockwise?.blockNumber}_${currentSelectedtxIndex}_${idx}`)
                                }}>
                                    {timestampBlockwise?.blockNumber}_{currentSelectedtxIndex}_{idx}
                                </Text>
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
                                    router.push(`/tx/}`)
                                }}>
                                    {timestampBlockwise.blockNumber}
                                </Text>
                                <Box display="flex" gap="0.5rem" cursor="pointer" onClick={()=>{
                                    setcurrentCopiedIdnex(idx);
                                    navigator.clipboard.writeText(
                                        timestampBlockwise.blockNumber
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
                          {timeElapsed(timestampBlockwise.timeStamp)} 
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
  )
}

export default EventsTable