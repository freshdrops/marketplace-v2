import { Text, Box, Flex, FormatCryptoCurrency } from '../primitives'
import Link from 'next/link'
import { FC } from 'react'
import { useMarketplaceChain } from '../../hooks'
import { TrendingCollections } from 'components/home/TrendingCollectionsList'
import { PercentChange } from 'components/primitives/PercentChange'
import { OpenSeaVerified } from 'components/common/OpenSeaVerified'

type Props = {
  rank: string | number
  collection: NonNullable<TrendingCollections>[0]
  volumeKey: '1day' | '7day' | '30day' | 'allTime'
}

export const TrendingCollectionItem: FC<Props> = ({
  rank,
  collection,
  volumeKey,
}) => {
  const { routePrefix } = useMarketplaceChain()
  return (
    <Link
      href={`/collection/${routePrefix}/${collection.id}`}
      style={{ display: 'inline-block', minWidth: 0 }}
    >
      <Flex align="center" css={{ cursor: 'pointer' }}>
        <img
          src={collection?.image}
          style={{ borderRadius: 999, width: 56, height: 56, objectFit: 'cover' }}
        />
        <Box css={{ ml: '$4', width: '100%', minWidth: 0 }}>
          <Flex align="center" css={{ gap: '$2', mb: 4, maxWidth: '80%' }}>
            <Text
              css={{
                display: 'inline-block',
              }}
              style="subtitle1"
              ellipsify
            >
              {collection?.name}
            </Text>
            <OpenSeaVerified
              openseaVerificationStatus={collection?.openseaVerificationStatus}
            />
          </Flex>
          
        </Box>

        <Flex align="center" css={{ mx: 10, width: 120, justifyContent: 'flex-end'}}>
            <FormatCryptoCurrency
              amount={collection?.floorAsk?.price?.amount?.decimal}
              address={collection?.floorAsk?.price?.currency?.contract}
              decimals={collection?.floorAsk?.price?.currency?.decimals}
              logoHeight={16}
              maximumFractionDigits={2}
              textStyle="subtitle2"
            />
          </Flex>

        <Flex align="center" css={{ mx: 10, gap: '$1', width: 120, justifyContent: 'flex-end' }}>
          <FormatCryptoCurrency
            amount={collection?.volume?.[volumeKey]}
            maximumFractionDigits={1}
            logoHeight={16}
            textStyle="subtitle2"
          />
        </Flex>
        <Flex align="end" css={{ ml: 10, gap: '$1', width: 120, justifyContent: 'flex-end'}}>
        {volumeKey !== 'allTime' && (
            <PercentChange
              value={collection?.volumeChange?.[volumeKey]}
              decimals={1}
            />
          )}
        </Flex>
      </Flex>
    </Link>
  )
}
