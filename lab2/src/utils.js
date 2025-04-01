import { ethers } from "ethers"

const API_KEY = ""

function getAlchemyProvider() {
    return new ethers.AlchemyProvider("sepolia", API_KEY)
}

function getBrowserProvider() {
    return new ethers.BrowserProvider(window.ethereum);
}

function getContractABI() {
    return []
}

function getContractAddress() {
    return ""
}

export { getAlchemyProvider, getBrowserProvider, getContractABI, getContractAddress }