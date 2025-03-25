import schnorr
import os


def generate_private_key() -> bytes:
    raise NotImplementedError

def generate_public_key(private_key: bytes) -> bytes:
    raise NotImplementedError


if __name__ == "__main__":
    private = generate_private_key()
    public = generate_public_key(private)
    print(f"Public key: {public.hex()}")
    print(f"Private key: {private.hex()}")