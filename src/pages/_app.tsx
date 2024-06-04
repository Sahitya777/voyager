import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import {DrawerContextProvider} from '../context/DrawerContext'

export const theme = extendTheme({

  colors: {
    customBlue: {
      500: '#0969DA',
    },
    customPurple: {
      500: '#4D59E8',
    },
  },
  fonts: {
    html:'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return( 
  <ChakraProvider theme={extendTheme}>
    <DrawerContextProvider>
      <Component {...pageProps} />
    </DrawerContextProvider>
  </ChakraProvider>
  )
}
