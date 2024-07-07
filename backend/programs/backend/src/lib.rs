pub use anchor_lang::prelude::*;

pub mod transfer;
use transfer::*;

declare_id!("6Dz1KhuyqPKh4MmVjsNXKY12BuihenzcHM6jfwd8jMSG");

#[program]
pub mod backend {
    use super::*;

    pub fn min_nft(ctx: Context<MyMintNfts>, amount: u64, name : String, symbol: String, uri: String) -> Result<()> {
        initialize::min_nft(ctx, amount, name, symbol, uri)
    }
    pub fn burn_nft(ctx: Context<MyMintNfts>, amount: u64, name : String, symbol: String, uri: String) -> Result<()> {
        initialize::burn_nft(ctx, amount, name, symbol, uri)
    }
    // pub fn initialize<'a, 'b, 'c, 'info>(ctx: Context<'a, 'b, 'c, 'info, InitializeMint<'info>>, data: u64) -> Result<()> {
    //     // initialize::exec(ctx, data)
    //     Ok(())
    // }
    // pub fn mint_action(ctx: Context< MintNft>) -> Result<()> {
    //     Ok(())
    // }
}
