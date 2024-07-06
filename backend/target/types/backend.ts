export type Backend = {
  "version": "0.1.0",
  "name": "backend",
  "instructions": [
    {
      "name": "minNft",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftAuth",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "nft_auth"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "nftAuthority",
      "type": {
        "kind": "struct",
        "fields": []
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMintAccountSpace",
      "msg": "Invalid Mint account space"
    },
    {
      "code": 6001,
      "name": "CantInitializeMetadataPointer",
      "msg": "Cant initialize metadata_pointer"
    }
  ]
};

export const IDL: Backend = {
  "version": "0.1.0",
  "name": "backend",
  "instructions": [
    {
      "name": "minNft",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftAuth",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "nft_auth"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "nftAuthority",
      "type": {
        "kind": "struct",
        "fields": []
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMintAccountSpace",
      "msg": "Invalid Mint account space"
    },
    {
      "code": 6001,
      "name": "CantInitializeMetadataPointer",
      "msg": "Cant initialize metadata_pointer"
    }
  ]
};
