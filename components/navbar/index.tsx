import { useRef } from 'react'
import { Box, Flex } from '../primitives'
import GlobalSearch from './GlobalSearch'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
import Link from 'next/link'
import Image from 'next/image'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import NavItem from './NavItem'
import ThemeSwitcher from './ThemeSwitcher'
import HamburgerMenu from './HamburgerMenu'
import MobileSearch from './MobileSearch'
import { useTheme } from 'next-themes'
import { useMediaQuery } from 'react-responsive'
import { useMounted } from '../../hooks'
import { useAccount } from 'wagmi'
import { ProfileDropdown } from './ProfileDropdown'
import CartButton from './CartButton'

export const NAVBAR_HEIGHT = 62
export const NAVBAR_HEIGHT_MOBILE = 62

const Navbar = () => {
  const { theme } = useTheme()
  const { isConnected } = useAccount()
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const isMounted = useMounted()

  let searchRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  useHotkeys('meta+k', () => {
    if (searchRef?.current) {
      searchRef?.current?.focus()
    }
  })

  if (!isMounted) {
    return null
  }

  return isMobile ? (
    <Flex
      css={{
        height: NAVBAR_HEIGHT_MOBILE,
        px: '$4',
        width: '100%',
        borderBottom: '1px solid $gray4',
        zIndex: 999,
        background: '$slate1',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
      align="center"
      justify="between"
    >
      <Box css={{ flex: 1 }}>
        <Flex align="center">
          <Link href="/">
            <Box css={{ width: 92, cursor: 'pointer' }}>
              {theme == 'dark' ? (
                <Image
                  src="/freshdrops-logo-pink.svg"
                  width={92}
                  height={39}
                  alt="freshdrops"
                />
              ) : (
                <Image
                  src="/freshdrops-logo-black.svg"
                  width={112}
                  height={39}
                  alt="freshdrops"
                />
              )}
            </Box>
          </Link>
        </Flex>
      </Box>
      <Flex align="center" css={{ gap: '$3' }}>
        <MobileSearch key={`${router.asPath}-search`} />
        <CartButton />
        <HamburgerMenu key={`${router.asPath}-hamburger`} />
      </Flex>
    </Flex>
  ) : (
    <Flex
      css={{
        height: NAVBAR_HEIGHT,
        px: '$5',
        width: '100%',
        maxWidth: 1920,
        mx: 'auto',
        borderBottom: '1px solid $gray4',
        zIndex: 999,
        background: '$neutralBg',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
      align="center"
      justify="between"
    >
      <Box css={{ flex: 1 }}>
        <Flex align="center">
          <Link href="/">
            <Box css={{ width: 92, cursor: 'pointer' }}>
              {theme == 'dark' ? (
                <Image
                  src="/freshdrops-logo-pink.svg"
                  width={112}
                  height={36}
                  alt="freshdrops"
                />
              ) : (
                <Image
                  src="/freshdrops-logo-black.svg"
                  width={112}
                  height={36}
                  alt="freshdrops"
                />
              )}
            </Box>
          </Link>
          <Box css={{ flex: 1, px: '$5', maxWidth: 460 }}>
            <GlobalSearch
              ref={searchRef}
              placeholder="Search collections and addresses"
              containerCss={{ width: '100%' }}
              key={router.asPath}
            />
          </Box>
          <Flex align="center" css={{ gap: '$5', mr: '$5' }}>
            <Link href="/collection-rankings">
              <NavItem active={router.pathname == '/collection-rankings'}>
                COLLECTIONS
              </NavItem>
            </Link>
            <Link href="/portfolio">
              <NavItem active={router.pathname == '/portfolio'}>SELL</NavItem>
            </Link>
          </Flex>
        </Flex>
      </Box>

      <Flex css={{ gap: '$3' }} justify="end" align="center">
        <ThemeSwitcher />
        <CartButton />
        {isConnected ? (
          <ProfileDropdown />
        ) : (
          <Box css={{ maxWidth: '185px' }}>
            <ConnectWalletButton />
          </Box>
        )}
      </Flex>
    </Flex>
  )
}

export default Navbar
