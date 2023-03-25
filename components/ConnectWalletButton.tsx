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
                      textShadow: '0px 0px 5px #ffb3cc' 
                    }}
                    corners="rounded"
                    onClick={show}
                    color="primary"
                    type="button"
                    size="xs"
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
