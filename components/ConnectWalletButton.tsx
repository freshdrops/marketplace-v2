import { ConnectKitButton } from 'connectkit'
import Box from 'components/primitives/Box'
import Button from 'components/primitives/Button'
import { FC } from 'react'

type Props = {}

export const ConnectWalletButton: FC<Props> = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, chain, show }) => {
        return (
          <Box
            style={{
              flex: '1',
              display: 'flex',
              justifyContent: 'flex',
            }}
          >
            {(() => {
              if (!isConnected || !chain) {
                return (
                  <Button
                    css={{ 
                      flex: 1, 
                      justifyContent: 'center',
                      textShadow: '0px 0px 10px #ffb3cc' 
                    }}
                    corners="square"
                    onClick={show}
                    color="ghost1"
                    type="button"
                  >
                    CONNECT WALLET
                  </Button>
                )
              }
            })()}
          </Box>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
