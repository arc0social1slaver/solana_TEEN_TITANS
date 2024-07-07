// use {
//     anchor_lang::{prelude::*, solana_program::program::invoke, system_program},
//     anchor_spl::{associated_token, token},
//     mpl_token_metadata::{instructions as token_instructions, ID as TOKEN_METADATA_ID},
// };

use anchor_lang::{prelude::*, system_program};
use anchor_spl::{
    associated_token::{self, AssociatedToken},
    token_2022,
    token_interface::{spl_token_2022::instruction::AuthorityType, Token2022},
};
use solana_program::program::{invoke, invoke_signed};
use spl_token_2022::{extension::ExtensionType, state::Mint};
pub fn burn_nft(ctx: Context<MyMintNfts>, amount: u64, name: String, symbol: String, uri: String) -> Result<()> {
    let space =
        match ExtensionType::try_calculate_account_len::<Mint>(&[ExtensionType::MetadataPointer]) {
            Ok(space) => space,
            Err(_) => {
                return err!(ProgramCode::InvalidMintAccountSpace);
            }
        };
    let meta_data_space = 250;
    let lamports_required = Rent::get()?.minimum_balance(space + meta_data_space);
    system_program::create_account(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            system_program::CreateAccount {
                from: ctx.accounts.signer.to_account_info(),
                to: ctx.accounts.mint.to_account_info(),
            },
        ),
        lamports_required,
        space as u64,
        &ctx.accounts.token_program.key(),
    )?;
    system_program::assign(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            system_program::Assign {
                account_to_assign: ctx.accounts.mint.to_account_info(),
            },
        ),
        &token_2022::ID,
    )?;
    let init_meta_data_pointer_ix =
        match spl_token_2022::extension::metadata_pointer::instruction::initialize(
            &Token2022::id(),
            &ctx.accounts.mint.key(),
            Some(ctx.accounts.nft_auth.key()),
            Some(ctx.accounts.mint.key()),
        ) {
            Ok(ix) => ix,
            Err(_) => {
                return err!(ProgramCode::CantInitializeMetadataPointer);
            }
        };
    invoke(
        &init_meta_data_pointer_ix,
        &[
            ctx.accounts.mint.to_account_info(),
            ctx.accounts.nft_auth.to_account_info(),
        ],
    )?;
    let mint_cpi_ix = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        token_2022::InitializeMint2 {
            mint: ctx.accounts.mint.to_account_info(),
        },
    );
    token_2022::initialize_mint2(mint_cpi_ix, 0, &ctx.accounts.nft_auth.key(), None).unwrap();

    let seeds = b"nft_auth";
    let bump = ctx.bumps.nft_auth;
    let signer: &[&[&[u8]]] = &[&[seeds, &[bump]]];
    msg!(
        "Init metadata: {}",
        ctx.accounts.nft_auth.to_account_info().key
    );
    let init_token_meta_data_ix = &spl_token_metadata_interface::instruction::initialize(
        &spl_token_2022::id(),
        ctx.accounts.mint.key,
        ctx.accounts.nft_auth.to_account_info().key,
        ctx.accounts.mint.key,
        ctx.accounts.nft_auth.to_account_info().key,
        name.to_string(),
        symbol.to_string(),
        uri.to_string(),
    );
    invoke_signed(
        init_token_meta_data_ix,
        &[
            ctx.accounts.mint.to_account_info().clone(),
            ctx.accounts.nft_auth.to_account_info().clone(),
        ],
        signer,
    )?;
    invoke_signed(
        &spl_token_metadata_interface::instruction::update_field(
            &spl_token_2022::id(),
            ctx.accounts.mint.key,
            ctx.accounts.nft_auth.to_account_info().key,
            spl_token_metadata_interface::state::Field::Key("level".to_string()),
            "1".to_string(),
        ),
        &[
            ctx.accounts.mint.to_account_info().clone(),
            ctx.accounts.nft_auth.to_account_info().clone(),
        ],
        signer,
    )?;
    associated_token::create(CpiContext::new(
        ctx.accounts.associated_token_program.to_account_info(),
        associated_token::Create {
            payer: ctx.accounts.signer.to_account_info(),
            associated_token: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.signer.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
        },
    ))?;
    // token_2022::transfer_checked(
    //     CpiContext::new_with_signer(
    //         ctx.accounts.token_program.to_account_info(),
    //         token_2022::TransferChecked {
    //             from: ctx.accounts.mint.to_account_info(),
    //             mint: ctx.accounts.mint.to_account_info(),
    //             to: ctx.accounts.token_account.to_account_info(),
    //             authority: ctx.accounts.nft_auth.to_account_info(),
    //         },
    //         signer,
    //     ),
    //     1,
    //     0,
    // )?;
    // transfer
    // token_2022::transfer_checked(ctx, amount, decimals){

    token_2022::burn(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token_2022::Burn {
                mint: ctx.accounts.mint.to_account_info(),
                from: ctx.accounts.token_account.to_account_info(),
                authority: ctx.accounts.nft_auth.to_account_info(),
            },
            signer,
        ),
        amount,
    )?;
    token_2022::set_authority(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token_2022::SetAuthority {
                current_authority: ctx.accounts.nft_auth.to_account_info(),
                account_or_mint: ctx.accounts.mint.to_account_info(),
            },
            signer,
        ),
        AuthorityType::MintTokens,
        None,
    )?;
    Ok(())
}

pub fn min_nft(ctx: Context<MyMintNfts>, amount: u64, name: String, symbol: String, uri: String) -> Result<()> {
    let space =
        match ExtensionType::try_calculate_account_len::<Mint>(&[ExtensionType::MetadataPointer]) {
            Ok(space) => space,
            Err(_) => {
                return err!(ProgramCode::InvalidMintAccountSpace);
            }
        };
    let meta_data_space = 250;
    let lamports_required = Rent::get()?.minimum_balance(space + meta_data_space);
    system_program::create_account(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            system_program::CreateAccount {
                from: ctx.accounts.signer.to_account_info(),
                to: ctx.accounts.mint.to_account_info(),
            },
        ),
        lamports_required,
        space as u64,
        &ctx.accounts.token_program.key(),
    )?;
    system_program::assign(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            system_program::Assign {
                account_to_assign: ctx.accounts.mint.to_account_info(),
            },
        ),
        &token_2022::ID,
    )?;
    let init_meta_data_pointer_ix =
        match spl_token_2022::extension::metadata_pointer::instruction::initialize(
            &Token2022::id(),
            &ctx.accounts.mint.key(),
            Some(ctx.accounts.nft_auth.key()),
            Some(ctx.accounts.mint.key()),
        ) {
            Ok(ix) => ix,
            Err(_) => {
                return err!(ProgramCode::CantInitializeMetadataPointer);
            }
        };
    invoke(
        &init_meta_data_pointer_ix,
        &[
            ctx.accounts.mint.to_account_info(),
            ctx.accounts.nft_auth.to_account_info(),
        ],
    )?;
    let mint_cpi_ix = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        token_2022::InitializeMint2 {
            mint: ctx.accounts.mint.to_account_info(),
        },
    );
    token_2022::initialize_mint2(mint_cpi_ix, 0, &ctx.accounts.nft_auth.key(), None).unwrap();

    let seeds = b"nft_auth";
    let bump = ctx.bumps.nft_auth;
    let signer: &[&[&[u8]]] = &[&[seeds, &[bump]]];
    msg!(
        "Init metadata: {}",
        ctx.accounts.nft_auth.to_account_info().key
    );
    let init_token_meta_data_ix = &spl_token_metadata_interface::instruction::initialize(
        &spl_token_2022::id(),
        ctx.accounts.mint.key,
        ctx.accounts.nft_auth.to_account_info().key,
        ctx.accounts.mint.key,
        ctx.accounts.nft_auth.to_account_info().key,
        name.to_string(),
        symbol.to_string(),
        uri.to_string(),
    );
    invoke_signed(
        init_token_meta_data_ix,
        &[
            ctx.accounts.mint.to_account_info().clone(),
            ctx.accounts.nft_auth.to_account_info().clone(),
        ],
        signer,
    )?;
    invoke_signed(
        &spl_token_metadata_interface::instruction::update_field(
            &spl_token_2022::id(),
            ctx.accounts.mint.key,
            ctx.accounts.nft_auth.to_account_info().key,
            spl_token_metadata_interface::state::Field::Key("level".to_string()),
            "1".to_string(),
        ),
        &[
            ctx.accounts.mint.to_account_info().clone(),
            ctx.accounts.nft_auth.to_account_info().clone(),
        ],
        signer,
    )?;
    associated_token::create(CpiContext::new(
        ctx.accounts.associated_token_program.to_account_info(),
        associated_token::Create {
            payer: ctx.accounts.signer.to_account_info(),
            associated_token: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.signer.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
        },
    ))?;
    // token_2022::transfer_checked(
    //     CpiContext::new_with_signer(
    //         ctx.accounts.token_program.to_account_info(),
    //         token_2022::TransferChecked {
    //             from: ctx.accounts.mint.to_account_info(),
    //             mint: ctx.accounts.mint.to_account_info(),
    //             to: ctx.accounts.token_account.to_account_info(),
    //             authority: ctx.accounts.nft_auth.to_account_info(),
    //         },
    //         signer,
    //     ),
    //     1,
    //     0,
    // )?;
    // transfer
    // token_2022::transfer_checked(ctx, amount, decimals){

    token_2022::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token_2022::MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.token_account.to_account_info(),
                authority: ctx.accounts.nft_auth.to_account_info(),
            },
            signer,
        ),
        amount,
    )?;
    token_2022::set_authority(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token_2022::SetAuthority {
                current_authority: ctx.accounts.nft_auth.to_account_info(),
                account_or_mint: ctx.accounts.mint.to_account_info(),
            },
            signer,
        ),
        AuthorityType::MintTokens,
        None,
    )?;
    Ok(())
}
#[derive(Accounts)]
pub struct MyMintNfts<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    /// CHECK: Need to create this one
    #[account(mut)]
    pub token_account: AccountInfo<'info>,
    #[account(mut)]
    pub mint: Signer<'info>,
    #[account(
        init,
        seeds = [b"nft_auth".as_ref()],
        bump,
        space = 8,
        payer = signer
    )]
    pub nft_auth: Account<'info, NftAuthority>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token2022>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}
#[account]
pub struct NftAuthority {}
#[error_code]
pub enum ProgramCode {
    #[msg("Invalid Mint account space")]
    InvalidMintAccountSpace,
    #[msg("Cant initialize metadata_pointer")]
    CantInitializeMetadataPointer,
}
// #[derive(Accounts)]
// pub struct MintNft<'info> {
//     /// CHECK: Something here with Metaplex
//     #[account(mut)]
//     pub metadata: UncheckedAccount<'info>,
//     /// CHECK: Something here with Metaplex
//     #[account(mut)]
//     pub master_edition: UncheckedAccount<'info>,
//     #[account(mut)]
//     pub mint: Signer<'info>,
//     /// CHECK: Something here with Anchor
//     #[account(mut)]
//     pub token_account: UncheckedAccount<'info>,
//     #[account(mut)]
//     pub mint_authority: Signer<'info>,
//     pub system_program: Program<'info, System>,
//     pub token_program: Program<'info, token::Token>,
//     pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
//     pub rent: Sysvar<'info, Rent>,
//     /// CHECK: Something here with Metaplex
//     pub token_metadata_program: UncheckedAccount<'info>,
// }

// pub fn createMyAccount(ctx: Context<MintNft>) -> Result<()> {
//     msg!("Creating mint account...");
//     msg!("Mint: {}", &ctx.accounts.mint.key());

//     system_program::create_account(
//         CpiContext::new(
//             ctx.accounts.token_program.to_account_info(),
//             system_program::CreateAccount {
//                 from: ctx.accounts.mint_authority.to_account_info(),
//                 to: ctx.accounts.mint.to_account_info(),
//             },
//         ),
//         10000000,
//         82,
//         &ctx.accounts.token_program.key(),
//     )?;
//     Ok(())
// }
// pub fn InitMintAccount(ctx: Context<MintNft>) -> Result<()> {
//     msg!("Inittializing mint account");
//     msg!("Mint: {}", &ctx.accounts.mint.key());
//     token::initialize_mint(
//         CpiContext::new(
//             ctx.accounts.token_program.to_account_info(),
//             token::InitializeMint {
//                 mint: ctx.accounts.token_program.to_account_info(),
//                 rent: ctx.accounts.rent.to_account_info(),
//             },
//         ),
//         0,
//         &ctx.accounts.mint_authority.key(),
//         Some(&ctx.accounts.mint_authority.key()),
//     )?;
//     Ok(())
// }
// pub fn createTokenAccount(ctx: Context<MintNft>) -> Result<()> {
//     msg!("Creating token account");
//     msg!("Token Address: {}", &ctx.accounts.token_account.key());
//     associated_token::create(CpiContext::new(
//         ctx.accounts.associated_token_program.to_account_info(),
//         associated_token::Create {
//             payer: ctx.accounts.mint_authority.to_account_info(),
//             associated_token: ctx.accounts.token_account.to_account_info(),
//             authority: ctx.accounts.mint_authority.to_account_info(),
//             mint: ctx.accounts.mint.to_account_info(),
//             system_program: ctx.accounts.system_program.to_account_info(),
//             token_program: ctx.accounts.token_program.to_account_info(),
//         },
//     ))?;
//     Ok(())
// }
// pub fn mintTo(ctx: Context<MintNft>) -> Result<()> {
//     msg!("Minting token to token account ...");
//     msg!("Mint: {}", &ctx.accounts.mint.to_account_info().key());
//     msg!("Token Address: {}", &ctx.accounts.token_account.key());
//     token::mint_to(
//         CpiContext::new(
//             ctx.accounts.token_program.to_account_info(),
//             token::MintTo {
//                 mint: ctx.accounts.mint.to_account_info(),
//                 to: ctx.accounts.token_account.to_account_info(),
//                 authority: ctx.accounts.associated_token_program.to_account_info(),
//             },
//         ),
//         1,
//     )?;
//     Ok(())
// }
// pub fn createMetaData(ctx: Context<MintNft>,
//      metadata_title: String,
//       metadata_symbol: String,
//     metadata_url: String) -> Result<()> {
//     msg!("Create metadata account");
//     msg!(
//         "Metadata account address: {}",
//         &ctx.accounts.metadata.to_account_info().key()
//     );
//     invoke(
//         &token_instructions::CreateMetadataAccountV3{
//             TOKEN_METADATA_ID,
//             ctx.accounts.metadata.key(),
//             ctx.accounts.mint.key(),
//             ctx.accounts.mint_authority.key(),
//             ctx.accounts.mint_authority.key(),
//             ctx.accounts.mint_authority.key(),
//             metadata_title,
//             metadata_symbol,
//             metadata_url,
//             None,
//             1,
//             true,
//             false,
//             None,
//             None,
//         },
//         &[
//             ctx.accounts.metadata.to_account_info(),
//             ctx.accounts.mint.to_account_info(),
//             ctx.accounts.mint_authority.to_account_info(),
//             ctx.accounts.rent.to_account_info()
//         ],
//     )?;
//     Ok(())
// }

// #[derive(Accounts)]
// pub struct InitializeMint<'info> {
//     #[account(mut)]
//     pub user: Signer<'info>,
//     #[account(
//         init,
//         seeds = [
//             b"ocean",
//             user.key().as_ref(),
//         ],
//         bump,
//         payer = user,
//         mint::decimals = 9,
//         mint::authority = mint,
//     )]
//     pub mint: Account<'info, token::Mint>,

//     #[account(
//         init,
//         payer = user,
//         associated_token::mint = mint,
//         associated_token::authority = user
//     )]
//     pub token_account: Account<'info, token::TokenAccount>,
//     pub system_program: Program<'info, System>,
//     pub token_program: Program<'info, token::Token>,
//     pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
//     pub rent: Sysvar<'info, Rent>,
// }
// pub fn exec<'a, 'b, 'c, 'info>(
//     ctx: Context<'a, 'b, 'c, 'info, InitializeMint<'info>>,
//     data: u64
// ) -> Result<()> {
//     let seeds: &[&[&[u8]]]  = &[&[
//         "ocean".as_ref(),
//         &ctx.accounts.user.key().to_bytes(),
//         &[*ctx.bumps.get("ocean").unwrap()],
//     ]];
//     let min_to_ctx = CpiContext::new_with_signer(ctx.accounts.token_account.to_account_info(),
//         token::MintTo {
//             to: ctx.accounts.token_account.to_account_info(),
//             mint: ctx.accounts.mint.to_account_info(),
//             authority: ctx.accounts.mint.to_account_info()
//         },
//         seeds);
//     token::mint_to(min_to_ctx, data)?;
//     Ok(())
// }
