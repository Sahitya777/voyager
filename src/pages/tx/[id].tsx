import EventsTable from "@/components/EventsTable";
import { useDrawContext } from "@/context/DrawerContext";
import { formatTimestamp, timeElapsed } from "@/lib/utils";
import {
  Box,
  Spinner,
  Tab,
  TabList,
  Tabs,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { Check, Copy, InfoIcon, Loader, LoaderCircle } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [transactionData, settransactionData] = useState<any>();
  const [copied, setCopied] = useState(false);
  const [selectedCopyItem, setselectedCopyItem] = useState<Number>(-1);
  const [selectedSign, setselectedSign] = useState<Number>(-1);
  const {
    timestampBlockwise,
    settimestampBlockwise,
    currentSelectedtxIndex,
    selectedTransactionDetails,
  } = useDrawContext();
  const [actionSelected, setactionSelected] = useState("overview");
  const [ethPrice, setethPrice] = useState<Number>();

  const bgColorType: any = {
    DEPLOY: "rgb(34, 54, 85)",
    DEPLOY_ACCOUNT: "rgb(34, 54, 85)",
    INVOKE: "rgb(32, 46, 38)",
    L1_HANDLER: "rgb(56, 56, 56)",
    DECLARE: "rgb(32, 46, 38)",
  };
  const ColorType: any = {
    DEPLOY: "rgb(210, 229, 255)",
    DEPLOY_ACCOUNT: "rgb(210, 229, 255)",
    INVOKE: "rgb(130, 244, 187)",
    L1_HANDLER: "rgb(255, 255, 255)",
    DECLARE: "rgb(254, 255, 181)",
  };
  const BorderColorType: any = {
    DEPLOY: "1px solid rgb(60, 80, 110)",
    DEPLOY_ACCOUNT: "1px solid rgb(60, 80, 110)",
    INVOKE: "1px solid rgb(46, 76, 60)",
    L1_HANDLER: "1px solid rgb(94, 94, 94)",
    DECLARE: "1px solid rgb(107, 125, 7)",
  };
  const [hoverStatus, sethoverStatus] = useState(0);

  const handleCopy = (copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchEthPrice = async () => {
      const res = await axios.get("/api/ethPrice");
      setethPrice(res?.data?.Ethprice?.ethereum?.usd);
    };
    try {
      fetchEthPrice();
    } catch (err) {
      console.log(err, "err in eth price");
    }
  }, []);

  useEffect(() => {
    const fetchTransactionData = async () => {
      const res = await axios.get(
        `/api/transactionData?txhash=${router.query.id}`
      );
      if (res?.data) {
        settransactionData(res?.data?.transactionData?.result);
      }
    };
    if (router.query.id) {
      fetchTransactionData();
    }
  }, [router.query.id]);

  return (
    <Box display="flex" mt="2.5rem" justifyContent="center" fontFamily="Inter">
      <Box
        bg="#1b1b1b"
        width="80%"
        borderRadius="6px"
        padding="32px"
        display="flex"
        flexDirection="column"
        marginBottom="2rem"
      >
        <Text fontSize="22px" fontWeight="500" fontStyle="normal" color="#fff">
          Transaction
        </Text>
        <Text
          fontSize="12px"
          fontWeight="400"
          lineHeight="1.4"
          fontStyle="normal"
          color="rgb(202, 202, 202)"
          mt="2.5rem"
        >
          HASH
        </Text>
        <Box display="flex" gap="0.5rem">
          <Text color="white" fontSize="16px" lineHeight="32px">
            {transactionData?.transaction_hash}
          </Text>
          <Box
            display="flex"
            cursor="pointer"
            gap="0.2rem"
            justifyContent="center"
            alignItems="center"
          >
            <Copy
              height="16px"
              width="16px"
              color={"#7E7E7E"}
              //   style={{ marginTop: "8" }}
              onClick={() => {
                setselectedCopyItem(0);
                handleCopy(transactionData?.transaction_hash);
              }}
            />
            {copied && selectedCopyItem == 0 && (
              <Text
                bg="black"
                fontSize="12px"
                px="6px"
                height="24px"
                color="white"
                border="1px solid #4B4B4B"
                borderRadius="6px"
              >
                COPIED!
              </Text>
            )}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" width="30%">
          <Box>
            <Box display="flex">
              <Text
                fontSize="12px"
                fontWeight="400"
                lineHeight="1.4"
                fontStyle="normal"
                color="rgb(202, 202, 202)"
                mt="1rem"
              >
                TYPE
              </Text>
            </Box>
            <Box
              bg={bgColorType[transactionData?.type]}
              color={ColorType[transactionData?.type]}
              lineHeight="20px"
              letterSpacing="-0.15px"
              padding="1px 8px"
              fontSize="12px"
              borderRadius="4px"
              mt="4"
              border={BorderColorType[transactionData?.type]}
            >
              {transactionData?.type}
            </Box>
          </Box>
          <Box>
            <Text
              fontSize="12px"
              fontWeight="400"
              lineHeight="1.4"
              fontStyle="normal"
              color="#CACACA"
              mt="1rem"
            >
              TIMESTAMP
            </Text>
            <Box display="flex" gap="0.5rem">
              <Text color="white" fontSize="16px" lineHeight="32px">
                {formatTimestamp(timestampBlockwise?.timeStamp).substring(
                  0,
                  11
                )}
              </Text>
              <Text color="white" fontSize="12px" lineHeight="32px">
                {formatTimestamp(timestampBlockwise?.timeStamp).substring(
                  formatTimestamp(timestampBlockwise?.timeStamp).length - 9,
                  formatTimestamp(timestampBlockwise?.timeStamp).length
                )}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text
            fontSize="12px"
            fontWeight="400"
            lineHeight="1.4"
            fontStyle="normal"
            color="rgb(202, 202, 202)"
            mt="1rem"
          >
            STATUS
          </Text>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            mt="0.5rem"
            cursor="pointer"
          >
            <Box
              borderRadius="100px"
              bg="#107D49"
              color="white"
              py="6px"
              pl="3px"
              px="16px"
              display="flex"
              alignItems="center"
              gap="0.2rem"
              width="fit-content"
              fontSize="11px"
            >
              <Check height="12px" width="12px" strokeWidth="3" color="white" />
              Received
            </Box>
            <Box height="2px" width="32px" bg="#107D49"></Box>
            <Box
              borderRadius="100px"
              bg="#107D49"
              color="white"
              py="6px"
              pl="3px"
              px="16px"
              display="flex"
              alignItems="center"
              gap="0.2rem"
              width="fit-content"
              fontSize="11px"
            >
              <Check height="12px" width="12px" strokeWidth="3" color="white" />
              Accepted on L2
            </Box>
            <Box height="2px" width="32px" bg="#4B4B4B"></Box>
            <Box
              border="1px solid #4B4B4B"
              borderRadius="100px"
              bg="transparent"
              color="#808080"
              py="6px"
              px={hoverStatus == 0 ? "6px" : "10px"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="0.4rem"
              width="fit-content"
              fontSize="11px"
              onMouseEnter={() => {
                sethoverStatus(1);
              }}
              onMouseLeave={() => {
                sethoverStatus(0);
              }}
            >
              <Spinner
                height="14px"
                width="14px"
                thickness="1px"
                speed="0.65s"
                emptyColor="#808080"
                color="#BFBFBF"
              />
              {hoverStatus == 1 && <Text>Accepted on L1</Text>}
            </Box>
          </Box>
        </Box>
        <Box display="flex" gap="2rem" mt="2rem">
          <Text
            color={actionSelected === "overview" ? "white" : "#AAAAAA"}
            cursor="pointer"
            borderBottom={
              actionSelected === "overview" ? "2px solid rgb(191, 109, 76)" : ""
            }
            fontWeight="500"
            height="40px"
            onClick={() => {
              setactionSelected("overview");
            }}
            _hover={
              actionSelected == "events"
                ? {
                    borderBottom: "2px solid rgb(76, 52, 42)",
                  }
                : {}
            }
          >
            Overview
          </Text>
          <Text
            display="flex"
            gap="0.5rem"
            color={actionSelected === "events" ? "white" : "#AAAAAA"}
            borderBottom={
              actionSelected === "events" ? "2px solid rgb(191, 109, 76)" : ""
            }
            fontWeight="500"
            height="40px"
            cursor="pointer"
            onClick={() => {
              setactionSelected("events");
            }}
            _hover={
              actionSelected == "overview"
                ? {
                    borderBottom: "2px solid rgb(76, 52, 42)",
                  }
                : {}
            }
          >
            Events
            <Text
              mt="3"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="rgb(18, 18, 18)"
              padding="5px 8px"
              borderRadius="100px"
              height="20px"
              color="rgb(170, 170, 170)"
              fontWeight="600"
            >
              {transactionData?.events.length}
            </Text>
          </Text>
        </Box>
        <Box>
          {actionSelected === "overview" && (
            <Box>
              <Box mt="2rem">
                <Text fontSize="22px" fontWeight="500" color="white">
                  Transaction Details
                </Text>
                <Box mt="1rem">
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={
                          "Unique number of the block in which the transaction is processed"
                        }
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        BLOCK NUMBER:
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      height="38px"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                    >
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="#8BA3DF"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {timestampBlockwise?.blockNumber}
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Time at which the transaction was processed"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        TIMESTAMP:
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      height="38px"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                    >
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="white"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {timeElapsed(timestampBlockwise?.timeStamp)} ({" "}
                        {formatTimestamp(timestampBlockwise?.timeStamp)} )
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Actual fee paid for executing the transaction"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        ACTUAL FEE:
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      height="38px"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                      gap="0.4rem"
                    >
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="white"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {Number(transactionData?.actual_fee.amount) /
                          Number(1000000000000000000)}
                      </Text>
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="#8BA3DF"
                        cursor="pointer"
                        _hover={{ color: "" }}
                        onClick={() => {
                          router.push(
                            "https://voyager.online/token/0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                          );
                        }}
                      >
                        ETH
                      </Text>
                      <Copy
                        height="16px"
                        width="16px"
                        color={"#7E7E7E"}
                        cursor="pointer"
                        //   style={{ marginTop: "8" }}
                        onClick={() => {
                          setselectedCopyItem(1);
                          handleCopy(
                            "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                          );
                        }}
                      />
                      {copied && selectedCopyItem == 1 && (
                        <Text
                          bg="black"
                          fontSize="12px"
                          px="6px"
                          height="24px"
                          color="white"
                          border="1px solid #4B4B4B"
                          position="absolute"
                          borderRadius="6px"
                        >
                          COPIED!
                        </Text>
                      )}
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="white"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {!ethPrice
                          ? "..."
                          : `($${(
                              Number(ethPrice) *
                              (Number(transactionData?.actual_fee.amount) /
                                Number(1000000000000000000))
                            ).toFixed(6)})`}
                      </Text>
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="white"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        to:
                      </Text>
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="#8BA3DF"
                        cursor="pointer"
                        _hover={{ color: "" }}
                        onClick={() => {
                          router.push(
                            "https://voyager.online/contract/0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8"
                          );
                        }}
                      >
                        StarkWare: Sequencer
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Max fee set when submitting the transaction"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        MAX FEE:
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="0.4rem"
                      height="38px"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                    >
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="white"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {Number(selectedTransactionDetails?.max_fee) /
                          Number(1000000000000000000)}
                      </Text>
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="#8BA3DF"
                        cursor="pointer"
                        _hover={{ color: "" }}
                        onClick={() => {
                          router.push(
                            "https://voyager.online/token/0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                          );
                        }}
                      >
                        ETH
                      </Text>
                      <Copy
                        height="16px"
                        width="16px"
                        color={"#7E7E7E"}
                        //   style={{ marginTop: "8" }}
                        cursor="pointer"
                        onClick={() => {
                          setselectedCopyItem(2);
                          handleCopy(
                            "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                          );
                        }}
                      />
                      {copied && selectedCopyItem == 2 && (
                        <Text
                          bg="black"
                          fontSize="12px"
                          px="6px"
                          height="24px"
                          color="white"
                          border="1px solid #4B4B4B"
                          borderRadius="6px"
                        >
                          COPIED!
                        </Text>
                      )}

                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="white"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {!ethPrice
                          ? "..."
                          : `($${(
                              Number(ethPrice) *
                              (Number(selectedTransactionDetails?.max_fee) /
                                Number(1000000000000000000))
                            ).toFixed(6)})`}
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Gas consumed for the transaction execution"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        GAS CONSUMED:
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      height="38px"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                    >
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="#8BA3DF"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {!ethPrice
                          ? "..."
                          : Number(transactionData?.actual_fee.amount) /
                            Number(1000000000000000000) /
                            Number(ethPrice)}
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Sending party of the transaction"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        SENDER ADDRESS:
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      gap="0.4rem"
                      alignItems="center"
                      height="38px"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                    >
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="#8BA3DF"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {selectedTransactionDetails?.sender_address}
                      </Text>
                      <Copy
                        height="16px"
                        width="16px"
                        color={"#7E7E7E"}
                        //   style={{ marginTop: "8" }}
                        cursor="pointer"
                        onClick={() => {
                          setselectedCopyItem(6);
                          handleCopy(
                            selectedTransactionDetails?.sender_address
                          );
                        }}
                      />
                      {copied && selectedCopyItem == 6 && (
                        <Text
                          bg="black"
                          fontSize="12px"
                          px="6px"
                          height="24px"
                          color="white"
                          border="1px solid #4B4B4B"
                          borderRadius="6px"
                        >
                          COPIED!
                        </Text>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box mt="2rem">
                <Text fontSize="22px" fontWeight="500" color="white">
                  Developer Info
                </Text>
                <Box mt="1rem">
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={
                          "Unix timestamp at which the transaction was processed"
                        }
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        UNIX TIMESTAMP:
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      gap="0.4rem"
                      alignItems="center"
                      height="38px"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                    >
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="white"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {timestampBlockwise?.timeStamp}
                      </Text>
                      <Copy
                        height="16px"
                        width="16px"
                        color={"#7E7E7E"}
                        //   style={{ marginTop: "8" }}
                        cursor="pointer"
                        onClick={() => {
                          setselectedCopyItem(3);
                          handleCopy(timestampBlockwise?.timeStamp);
                        }}
                      />
                      {copied && selectedCopyItem == 3 && (
                        <Text
                          bg="black"
                          fontSize="12px"
                          px="6px"
                          height="24px"
                          color="white"
                          border="1px solid #4B4B4B"
                          borderRadius="6px"
                        >
                          COPIED!
                        </Text>
                      )}
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Nonce of the transaction"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        NONCE:
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      height="38px"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                    >
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="white"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {selectedTransactionDetails?.nonce}
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Index of the transaction within the block"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        POSITION:
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      height="38px"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                    >
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="white"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {currentSelectedtxIndex}
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Version of the transaction"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        VERSION:
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      height="38px"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                    >
                      <Text
                        marginBottom="3px"
                        fontSize="14px"
                        fontWeight="400"
                        color="white"
                        cursor="pointer"
                        _hover={{ color: "" }}
                      >
                        {selectedTransactionDetails?.version.substring(2, 3)}
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Resource utilized to execute the transaction"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        EXECUTION RESOURCES:
                      </Text>
                    </Box>
                    <Box borderBottom="1px solid rgb(56, 56, 56)" width="100%">
                      <Box
                        bg="rgb(32, 46, 38)"
                        marginTop="4"
                        color="rgb(130, 244, 187)"
                        lineHeight="20px"
                        letterSpacing="-0.15px"
                        padding="4px 10px"
                        fontSize="14px"
                        width="fit-content"
                        borderRadius="4px"
                        border="1px solid rgb(46, 76, 60)"
                      >
                        {transactionData?.execution_resources?.steps} STEPS
                      </Box>
                      <Box display="flex" gap="0.4rem" mb="0.4rem">
                        <Box
                          bg="rgb(59, 42, 28)"
                          marginTop="4"
                          color="rgb(255, 200, 153)"
                          lineHeight="20px"
                          letterSpacing="-0.15px"
                          padding="4px 10px"
                          fontSize="14px"
                          width="fit-content"
                          borderRadius="4px"
                          border="1px solid rgb(88, 63, 42)"
                        >
                          {
                            transactionData?.execution_resources
                              ?.pedersen_builtin_applications
                          }{" "}
                          PEDERSEN_BUILTIN
                        </Box>
                        <Box
                          bg="rgb(59, 42, 28)"
                          marginTop="4"
                          color="rgb(255, 200, 153)"
                          lineHeight="20px"
                          letterSpacing="-0.15px"
                          padding="4px 10px"
                          fontSize="14px"
                          width="fit-content"
                          borderRadius="4px"
                          border="1px solid rgb(88, 63, 42)"
                        >
                          {
                            transactionData?.execution_resources
                              ?.range_check_builtin_applications
                          }{" "}
                          RANGE_CHECK_BUILTIN
                        </Box>
                        <Box
                          bg="rgb(59, 42, 28)"
                          marginTop="4"
                          color="rgb(255, 200, 153)"
                          lineHeight="20px"
                          letterSpacing="-0.15px"
                          padding="4px 10px"
                          fontSize="14px"
                          width="fit-content"
                          borderRadius="4px"
                          border="1px solid rgb(88, 63, 42)"
                        >
                          {
                            transactionData?.execution_resources
                              ?.ec_op_builtin_applications
                          }{" "}
                          EC_OP_BUILTIN
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Calldata that was sent in the transaction"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        CALLDATA:
                      </Text>
                    </Box>
                    <Box
                      gap="0.4rem"
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                    >
                      <Tabs mt="0.5rem">
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
                              bg: "rgb(56, 56, 56)",
                            }}
                            onClick={() => {
                              //   setactionSelected("ALL");
                            }}
                            //   isDisabled={unstakeTransactionStarted == true}
                            //   onClick={() => {
                            //     setSelectedTab('stake')
                            //     resetStates()
                            //   }}
                          >
                            Calls
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
                              bg: "rgb(56, 56, 56)",
                            }}
                            onClick={() => {
                              //   setactionSelected("L1_HANDLER");
                            }}
                            //   isDisabled={transactionStarted == true}
                            //   onClick={() => {
                            //     setSelectedTab('unstake')
                            //     resetStates()
                            //   }}
                          >
                            Transactions
                          </Tab>
                        </TabList>
                      </Tabs>
                    </Box>
                  </Box>
                  <Box display="flex" gap="4rem">
                    <Box display="flex" width="20%" gap="0.4rem">
                      <Tooltip
                        hasArrow
                        label={"Signature(s) of the transaction"}
                        placement="top"
                        // ml="8rem"
                        rounded="md"
                        boxShadow="dark-lg"
                        bg="white"
                        fontSize={"13px"}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                        padding={"8px 8px"}
                        color="black"
                        border="1px solid"
                        borderColor="#23233D"
                        arrowShadowColor="#2B2F35"
                        maxWidth="100rem"
                      >
                        <InfoIcon color="white" height="16px" width="16px" />
                      </Tooltip>
                      <Text color="white" fontSize="12px" fontWeight="500">
                        SIGNATURE(S):
                      </Text>
                    </Box>
                    <Box
                      borderBottom="1px solid rgb(56, 56, 56)"
                      width="100%"
                      mt="0.5rem"
                      display="flex"
                      flexDirection="column"
                      gap="1rem"
                    >
                      {selectedTransactionDetails?.signature.map(
                        (signature: any, idx1: any) => (
                          <Box
                          key={idx1}
                            display="flex"
                            gap="0.5rem"
                            justifyContent="space-between"
                          >
                            <Text
                              marginBottom="3px"
                              fontSize="14px"
                              fontWeight="400"
                              color="rgb(245, 171, 53)"
                              cursor="pointer"
                              _hover={{ color: "" }}
                            >
                              {signature}
                            </Text>
                            <Copy
                              height="14px"
                              width="14px"
                              color="#999898"
                              style={{ marginTop: "3" }}
                              cursor="pointer"
                              onClick={() => {
                                setselectedCopyItem(4);
                                handleCopy(signature);
                              }}
                            />
                            {copied && selectedCopyItem == 4 && (
                              <Text
                                bg="black"
                                fontSize="12px"
                                px="6px"
                                height="24px"
                                color="white"
                                border="1px solid #4B4B4B"
                                borderRadius="6px"
                              >
                                COPIED!
                              </Text>
                            )}
                          </Box>
                        )
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          {actionSelected === "events" && (
            <EventsTable events={transactionData?.events} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
