import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Backend } from "../target/types/backend";
import {
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
  TOKEN_2022_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from "@solana/spl-token";


describe("backend", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const payer = anchor.AnchorProvider.env().wallet;
  const program = anchor.workspace.Backend as Program<Backend>;
  const mint = new Keypair();
  // const mint1 = new Keypair();
  const nftAutho = PublicKey.findProgramAddressSync(
    [Buffer.from("nft_auth")],
    program.programId,
  );

  it("Is initialized!", async () => {
    // Add your test here.
    // const data = new anchor.BN(100)
    // const [mint] = PublicKey.findProgramAddressSync(
    //   [Buffer.from('ocean'), anchor.AnchorProvider.env().publicKey.toBuffer()],
    //   program.programId
    // )
    // const tokenAccount = await anchor.utils.token.associatedAddress({mint, owner: anchor.AnchorProvider.env().wallet.publicKey})

    // const tx = await program.methods
    //     .initialize(data)
    //     .accounts({
    //       user: anchor.AnchorProvider.env().wallet.publicKey,
    //       mint,
    //       tokenAccount,
    //       tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
    //       associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
    //       systemProgram: anchor.web3.SystemProgram.programId,
    //       rent: anchor.web3.SYSVAR_RENT_PUBKEY
    //     })
    //     .rpc()
    // console.log(`Your transaction signature: ${tx}`)
    // const tokenAccountData = await program.account.token.fetch(tokenAccount)
    // console.log(`Token Account Data: ${tokenAccountData}`)


    const destination = getAssociatedTokenAddressSync(
      mint.publicKey,
      payer.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    );
    getOrCreateAssociatedTokenAccount;
    // const signature = await program.provider.connection.requestAirdrop(mint.publicKey, 2 * LAMPORTS_PER_SOL)
    // await program.provider.connection.confirmTransaction(signature)
    console.log(`My balance: ${await anchor.getProvider().connection.getBalance(payer.publicKey)}, friend Balance: ${await anchor.getProvider().connection.getBalance(mint.publicKey)}`)
    console.log(`My destination: ${destination}`)
    const tx = await program.methods
      .minNft(new anchor.BN(1000), "newData", "Sa", "https:www/google.com")
      .accounts({
        signer: payer.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        tokenAccount: destination,
        mint: mint.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        nftAuth: nftAutho[0],
      })
      .signers([mint])
      .rpc()
    console.log(`Min nft: ${tx}`)
    await anchor.getProvider().connection.confirmTransaction(tx, 'confirmed')
    console.log(`My balance: ${await anchor.getProvider().connection.getBalance(payer.publicKey)}, friend Balance: ${await anchor.getProvider().connection.getBalance(mint.publicKey)}`)
    console.log(`My destination: ${destination}`)
  });
});
