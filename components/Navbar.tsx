import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';

const links = [
  {
    text: 'Home',
    href: '/',
  },
];

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <NextLink href={href} passHref>
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Link>
  </NextLink>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px='4'>
        <Flex h='16' align='center' justify='space-between'>
          <IconButton
            size='md'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label='Open Menu'
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems='center'>
            <NextLink href='/' passHref>
              <Link _hover={{ textDecor: 'none' }}>
                <Heading size='md'>Memories</Heading>
              </Link>
            </NextLink>
            <HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex' }}>
              {links.map(link => (
                <NavLink key={link.href} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex align='center' gap={2}>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode='modal'>
                <Button colorScheme='whatsapp' variant='ghost'>
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton mode='modal'>
                <Button colorScheme='whatsapp'>Sign up</Button>
              </SignUpButton>
            </SignedOut>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export { Navbar };
