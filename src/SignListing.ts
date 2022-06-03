import { OpenSeaPort, Network } from 'opensea-js'

export async function signListing(contractAddress: string, tokenId: string, address: string, price: number) {
    const seaport = new OpenSeaPort((window as any).ethereum, { networkName: Network.Rinkeby })
    try {
        const listing = await seaport.createSellOrder({
            asset: {
                tokenId: tokenId,
                tokenAddress: contractAddress,
            },
            startAmount: price,
            expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 24 * 20),
            accountAddress: address,
        })

        console.log('We listed it', listing)
    } catch (e) {
        console.log(e)
        throw new Error(JSON.stringify(e))
    }
}
