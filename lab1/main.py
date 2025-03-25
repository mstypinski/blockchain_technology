from dataclasses import dataclass, field, asdict
import argparse
from server import Server
from threading import Thread, Lock
import hashlib
import time
import requests
import schnorr
import logging


logger = logging.getLogger("blockchain")
logger.setLevel(logging.DEBUG)
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
ch.setFormatter(formatter)
logger.addHandler(ch)

SHA_LEN = 32

@dataclass
class Transaction:
    sender: str
    recipient: str
    value: int
    nonce: int
    signature: bytes
    hash: bytes

    def generate_signature(self, private_key: bytes):
        raise NotImplementedError
    
    def verify_signature(self, public_key):
        raise NotImplementedError

    def generate_hash(self):
        raise NotImplementedError
    
    def to_json(self):
        return {
            # return something here
        }


@dataclass
class Blockchain:
    server: Server | None = None
    accounts: dict = field(default_factory=dict)
    peers: list = field(default_factory=list)
    chain: list["Block"] = field(default_factory=list)
    pending_transactions: list[Transaction] = field(default_factory=list)
    lock: Lock = field(default_factory=Lock)

    def new_block(self):
        raise NotImplementedError
        block = Block(
            # something here
        )
        if block.mine():
            logger.info(f"Mined blockchain `{block.hash.hex()}`")

            # add block to chain

            for peer in self.peers:
                ...

    def execute_transactions(self, transaction: Transaction):
        raise NotImplementedError

    def run(self):
        Thread(target=self.server.run_app).start()
        while True:
            self.new_block()

    @staticmethod
    def get_genesis(blockchain) -> "Block":
        raise NotImplementedError
        # return Block(
        # )

    @classmethod
    def from_scratch(cls):
        obj = cls()
        server = Server(obj, Block, Transaction)
        obj.server = server
        obj.chain.append(cls.get_genesis(obj))
        return obj
    
    def from_external(cls):
        raise NotImplementedError
    
    def get_last_block(self):
        return self.chain[-1]

@dataclass
class Block:
    prev_hash: bytes
    nonce: int
    blockchain: Blockchain
    timestamp: int
    difficulty: int
    transactions: list = field(default_factory=list)
    hash: bytes = b"1" * SHA_LEN

    def get_hash_contents(self):
        raise NotImplementedError

    def compute_hash(self):
        self.hash = hashlib.sha256(self.get_hash_contents().encode()).digest()

    def mine(self):
        self.compute_hash()
        while not self.check_difficulty():
            # implement something here
            ...
        
        return True

    def check_difficulty(self, total_bits=SHA_LEN * 8):
        # magic function to check difficulty
        hash_int = int.from_bytes(self.hash, byteorder="big", signed=False)
        mask = ((1 << self.difficulty) - 1) << (total_bits - self.difficulty)
        return (hash_int & mask) == 0

    def verify(self):
        raise NotImplementedError
    
    def as_dict(self):
        return {
            # implement something here
        }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Blockchain application")
    parser.add_argument("--public", type=int, required=False, help="Public address")

    args = parser.parse_args()
    logger.info("Example log")
    b = Blockchain.from_scratch()
    b.run()
