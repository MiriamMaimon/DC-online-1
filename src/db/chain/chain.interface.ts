
import { IAddress } from '../address/address.interface';
import { IDefault } from '../default/default.interface';
import { IBranchPopulated } from '../branch/branch.interface';
import { Schema } from 'mongoose';
import { INetwork } from '../network/network.interface';
import { IChainBranch } from '../chainBranch/chainBranch.interface';

export interface IChain extends IDefault, IChainBranch, IAddress, Partial<INetwork> {
	chainId: number,
	dataCenterId?: Schema.Types.ObjectId,
	syncMainDataCenter?: boolean,
	branches:[IBranchPopulated],
}
