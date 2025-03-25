import os
import schnorr

# use here schnorr sign and verify
PRIVATE = ""
PUBLIC = ""

if __name__ == "__main__":
    msg = os.urandom(32)
    signature = schnorr.schnorr_sign(msg, PRIVATE)
    print("Verification valid" if schnorr.schnorr_verify(msg, bytes.fromhex(PUBLIC), signature) else "Verification invalid")