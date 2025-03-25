from flask import Flask, abort, request
from http import HTTPStatus

class Server:
    def __init__(self, blockchain, block_class, transaction_class):
        self.blockchain = blockchain
        self.block_class = block_class
        self.transaction_class = transaction_class

    def run_app(self):
        app = Flask("blockchain")

        app.get("/full")(self.get_full_blockchain)
        app.get("/one/<int:id>")(self.get_one)
        app.get("/len")(self.get_len)
        app.post("/new")(self.new_block_external)
        app.post("/get_balance/<string:account>")(self.get_balance)
        app.post("/new_transaction")(self.new_transaction)

        app.run(host="0.0.0.0", port=8080)
    
    def new_block_external(self):
        block_json = request.get_json()
        block = self.block_class(
            # something here
        )

        if not block.verify():
            abort(HTTPStatus.BAD_REQUEST)

        with self.blockchain.lock:
            self.blockchain.chain.append(block)

        return ('', HTTPStatus.NO_CONTENT)

    def get_len(self):
        return {
            "len": len(self.blockchain.chain)
        }

    def get_one(self, id):
        if len(self.blockchain.chain) > id + 1:
            return self.blockchain.chain[id].as_dict()
        abort(HTTPStatus.NOT_FOUND)


    def get_full_blockchain(self):
        with self.blockchain.lock:
            return [b.as_dict() for b in self.blockchain.chain]
        
    def new_transaction(self):
        transaction_json = request.get_json()
        raise NotImplementedError
    
    def get_balance(self, account):
        raise NotImplementedError