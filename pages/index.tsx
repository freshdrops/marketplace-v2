import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives'
import TrendingCollectionsList from 'components/home/TrendingCollectionsList'
import Layout from 'components/Layout'
import { ComponentPropsWithoutRef, useState } from 'react'
import { Footer } from 'components/home/Footer'
import { useMediaQuery } from 'react-responsive'
import { useMarketplaceChain, useMounted } from 'hooks'
import { useAccount } from 'wagmi'
import { paths } from '@reservoir0x/reservoir-sdk'
import { useCollections } from '@reservoir0x/reservoir-kit-ui'
import fetcher from 'utils/fetcher'
import { NORMALIZE_ROYALTIES, COLLECTION_SET_ID, COMMUNITY } from './_app'
import supportedChains from 'utils/chains'
import Link from 'next/link'
import ChainToggle from 'components/common/ChainToggle'
import CollectionsTimeDropdown, {
  CollectionsSortingOption,
} from 'components/common/CollectionsTimeDropdown'
import { Head } from 'components/Head'
import { CollectionRankingsTable } from 'components/rankings/CollectionRankingsTable'


// All-seeing instrument, supreme perception
// Omnifocal accumulator
// Thief of integrity, its gaze upon the blind
// Information divinity by man designed

// The lives of all they occupy, their eyes in dismal gloom
// The all-piercing, dead oculi, mirrors of our doom
// Oblivious to the trespass as you gaze into the black
// The demon of surveillance insultingly staring back
// Into you
// Into you

// They own your every secret, your life is in their files
// The grains of your every waking second sifted through and scrutinized
// They know your every right, they know your every wrong
// Each put in their due compartment, sins where sins belong

// - Meshuggah, The Demon's Name Is Surveillance


type Props = InferGetStaticPropsType<typeof getStaticProps>

const IndexPage: NextPage<Props> = ({ ssr }) => {
  const isSSR = typeof window === 'undefined'
  const isMounted = useMounted()
  const compactToggleNames = useMediaQuery({ query: '(max-width: 800px)' })
  const [sortByTime, setSortByTime] =
    useState<CollectionsSortingOption>('1DayVolume')
  const marketplaceChain = useMarketplaceChain()
  const { isDisconnected } = useAccount()

  let collectionQuery: Parameters<typeof useCollections>['0'] = {
    limit: 10,
    sortBy: sortByTime,
  }

  if (COLLECTION_SET_ID) {
    collectionQuery.collectionsSetId = COLLECTION_SET_ID
  } else if (COMMUNITY) {
    collectionQuery.community = COMMUNITY
  }

  const { data, isValidating } = useCollections(collectionQuery, {
    fallbackData: [ssr.collections[marketplaceChain.id]],
  })

  let collections = data || []

  let volumeKey: ComponentPropsWithoutRef<
    typeof TrendingCollectionsList
  >['volumeKey'] = 'allTime'

  switch (sortByTime) {
    case '1DayVolume':
      volumeKey = '1day'
      break
    case '7DayVolume':
      volumeKey = '7day'
      break
    case '30DayVolume':
      volumeKey = '30day'
      break
  }

  return (
    <Layout>
      <Head />
      <Box
        css={{
          p: 24,
          height: '100%',
          '@bp800': {
            p: '$5'
          },
        }}
      >
        {isDisconnected && (
          <Flex
            direction="column"
            align="center"
            css={{ mx: 'auto', maxWidth: 728, pt: '$5', textAlign: 'center' }}
          >
            <Text style="h3" css={{ mb: 24 }}>
              freshdrops
            </Text>
            <Text style="body1" css={{ mb: 48 }}>
              freshdrops is the original, fastest, and most accurate NFT metadata reveal tool
            </Text>
          </Flex>
        )}
        <Flex css={{ mb: '$6', gap: 20 }} direction="column">
          <Flex
            justify="between"
            align="start"
            css={{
              flexDirection: 'column',
              '@bp800': {
                alignItems: 'center',
                flexDirection: 'row',
              },
            }}
          >
            <Text style="h4" as="h4">
              Popular Collections
            </Text>
            <Flex align="center" css={{ gap: '$4' }}>
              <CollectionsTimeDropdown
                compact={compactToggleNames && isMounted}
                option={sortByTime}
                onOptionSelected={(option) => {
                  setSortByTime(option)
                }}
              />
              <ChainToggle />
            </Flex>
          </Flex>
          {isSSR || !isMounted ? null : (
            <CollectionRankingsTable
            collections={collections}
            loading={isValidating}
            volumeKey={volumeKey}
          />
          )}
          <Box css={{ alignSelf: 'center' }}>
            <Link href="/collection-rankings">
              <Button
                css={{
                  minWidth: 224,
                  justifyContent: 'center',
                }}
                size="large"
              >
                View All
              </Button>
            </Link>
          </Box>
        </Flex>
        <Footer />
      </Box>
    </Layout>
  )
}

type CollectionSchema =
  paths['/collections/v5']['get']['responses']['200']['schema']
type ChainCollections = Record<string, CollectionSchema>

export const getStaticProps: GetStaticProps<{
  ssr: {
    collections: ChainCollections
  }
}> = async () => {
  let collectionQuery: paths['/collections/v5']['get']['parameters']['query'] =
    {
      sortBy: '1DayVolume',
      normalizeRoyalties: NORMALIZE_ROYALTIES,
      limit: 10,
    }

  if (COLLECTION_SET_ID) {
    collectionQuery.collectionsSetId = COLLECTION_SET_ID
  } else if (COMMUNITY) {
    collectionQuery.community = COMMUNITY
  }

  const promises: ReturnType<typeof fetcher>[] = []
  supportedChains.forEach((chain) => {
    promises.push(
      fetcher(`${chain.reservoirBaseUrl}/collections/v5`, collectionQuery, {
        headers: {
          'x-api-key': chain.apiKey || '',
        },
      })
    )
  })
  const responses = await Promise.allSettled(promises)
  const collections: ChainCollections = {}
  responses.forEach((response, i) => {
    if (response.status === 'fulfilled') {
      collections[supportedChains[i].id] = response.value.data
    }
  })

  return {
    props: { ssr: { collections } },
    revalidate: 5,
  }
}

export default IndexPage
