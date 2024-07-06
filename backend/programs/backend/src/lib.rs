pub use anchor_lang::prelude::*;

pub mod transfer;
use transfer::*;

declare_id!("9PCZFZ1gd2g9q5zUaKtaDs14TVGyBhiLeS6DZtF1g9ZC");

#[program]
pub mod backend {
    use super::*;

    pub fn min_nft(ctx: Context<MyMintNfts>) -> Result<()> {
        initialize::min_nft(ctx)
    }
    // pub fn initialize<'a, 'b, 'c, 'info>(ctx: Context<'a, 'b, 'c, 'info, InitializeMint<'info>>, data: u64) -> Result<()> {
    //     // initialize::exec(ctx, data)
    //     Ok(())
    // }
    // pub fn mint_action(ctx: Context< MintNft>) -> Result<()> {
    //     Ok(())
    // }
}
