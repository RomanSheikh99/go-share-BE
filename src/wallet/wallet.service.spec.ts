import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(async () => {
    const mockWallet = {
      _id: 'test-id',
      name: 'Test Wallet',
      balance: 200,
      currency: 'USD',
      userId: 'test-user-id',
      __v: 0,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: getModelToken('Wallet'),
          useValue: {
            new: () => ({
              save: jest.fn().mockResolvedValue(mockWallet),
            }),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockWallet),
            findOne: jest.fn().mockResolvedValue(mockWallet),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockWallet),
            find: jest.fn().mockResolvedValue([mockWallet]),
          },
        },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  // it('should create a wallet', async () => {
  //   const createWalletDto = {
  //     name: 'Test Wallet',
  //     balance: 200,
  //     currency: 'USD',
  //     userId: 'test-user-id',
  //   };

  //   const createdWallet = await service.create(createWalletDto);

  //   expect(createdWallet).toHaveProperty('_id');
  //   expect(createdWallet).toHaveProperty('name', 'Test Wallet');
  //   expect(createdWallet).toHaveProperty('balance', 200);
  //   expect(createdWallet).toHaveProperty('currency', 'USD');
  //   expect(createdWallet).toHaveProperty('userId', 'test-user-id');
  // });

  it('should update a wallet balance', async () => {
    expect(
      await service.updateBalance({ id: 'test-id', balance: 200 }),
    ).toBeTruthy();
  });

  it('should find a wallet by user id', async () => {
    expect(await service.findOneByUserId('test-user-id')).toBeTruthy();
  });

  it('should delete a wallet', async () => {
    expect(await service.delete('test-id')).toBeTruthy();
  });

  it('should find all wallets', async () => {
    expect(await service.findAll()).toBeTruthy();
  });
});
