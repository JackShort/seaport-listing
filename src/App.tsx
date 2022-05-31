import { WagmiConfig, createClient, useAccount, useConnect, chain, useNetwork, useProvider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useState } from 'react'
import './App.css'
import { signListing } from './SignListing'

const client = createClient()

function App() {
    return (
        <WagmiConfig client={client}>
            <div className='App'>
                <header className='App-header'>
                    <Display />
                </header>
            </div>
        </WagmiConfig>
    )
}

const Display = () => {
    const { activeChain, switchNetwork } = useNetwork()
    const [contractAddress, setContractAddress] = useState('')
    const [tokenId, setTokenId] = useState('')
    const [price, setPrice] = useState('0.05')
    const { data } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector({
            chains: [chain.rinkeby],
        }),
    })

    const list = async () => {
        if (!data || !data.address) return
        await signListing(contractAddress, tokenId, data.address, parseFloat(price))
    }

    return (
        <>
            <div style={{ fontSize: '.5em' }}>
                <label htmlFor='contract'>Contract Address </label>
                <input
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    type='text'
                    name='contract'
                    id='contract'
                />
            </div>
            <div style={{ fontSize: '.5em' }}>
                <label htmlFor='tokenId'>Token ID </label>
                <input type='text' value={tokenId} onChange={(e) => setTokenId(e.target.value)} name='tokenId' id='tokenId' />
            </div>
            <div style={{ fontSize: '.5em' }}>
                <label htmlFor='price'>Price</label>
                <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} name='price' id='price' />
            </div>
            <div>
                <button
                    disabled={!!data && activeChain && activeChain.id === 4}
                    onClick={() => {
                        switchNetwork && activeChain?.id && activeChain.id !== 4 ? switchNetwork(4) : connect()
                    }}
                >
                    {activeChain && activeChain.id !== 4 ? 'Switch Network' : 'Connect'}
                </button>
            </div>
            <div>
                <button disabled={!data || (activeChain && activeChain.id !== 4)} onClick={list}>
                    List
                </button>
            </div>
        </>
    )
}

export default App
