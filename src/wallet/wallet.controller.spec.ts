import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('WalletController', () => {
  let walletController: WalletController;
  let walletService: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        WalletService,
        {
          provide: getModelToken('Wallet'),
          useValue: {
            new: jest.fn().mockImplementation(() => ({
              save: jest.fn(),
            })),
            findByIdAndUpdate: jest.fn(),
            findOne: jest.fn(),
            findByIdAndDelete: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    walletController = module.get<WalletController>(WalletController);
    walletService = module.get<WalletService>(WalletService);
  });

  it('should create a wallet', async () => {
    const createWalletDto = {
      name: 'Test Wallet',
      balance: 100,
      currency: 'USD',
      userId: 'test-user-id',
    };

    const result = {
      _id: 'test-id',
      name: 'Test Wallet',
      balance: 100,
      currency: 'USD',
      userId: 'test-user-id',
      __v: 0,
    };
    jest
      .spyOn(walletService, 'create')
      .mockImplementation(() => Promise.resolve(result));

    expect(await walletController.create(createWalletDto)).toBe(result);
  });

  it('should update a wallet balance', async () => {
    const updateBalanceDto = {
      id: 'test-id',
      balance: 200,
    };

    const result = {
      _id: 'test-id',
      name: 'Test Wallet',
      balance: 200,
      currency: 'USD',
      userId: 'test-user-id',
      __v: 0,
    };

    jest.spyOn(walletService, 'updateBalance').mockResolvedValue(result);

    expect(await walletController.updateBalance(updateBalanceDto)).toBe(result);
  });

  it('should find a wallet by user id', async () => {
    const result = {
      _id: 'test-id',
      name: 'Test Wallet',
      balance: 100,
      currency: 'USD',
      userId: 'test-user-id',
      __v: 0,
    };

    jest.spyOn(walletService, 'findOneByUserId').mockResolvedValue(result);

    expect(await walletController.findOneByUserId('test-user-id')).toBe(result);
  });

  it('should delete a wallet', async () => {
    const result = {
      _id: 'test-id',
      name: 'Test Wallet',
      balance: 100,
      currency: 'USD',
      userId: 'test-user-id',
      __v: 0,
    };

    jest.spyOn(walletService, 'delete').mockResolvedValue(result);

    expect(await walletController.delete('test-id')).toBe(result);
  });
});
