import { Types } from 'mongoose';
import { IDefault } from '../default/default.interface';
import { IEdgePopulated } from '../edge/edge.interface';
import { IChain } from '../chain/chain.interface';
import { IAddress } from '../address/address.interface';
import { IChainBranch } from '../chainBranch/chainBranch.interface';


interface IBranchBase extends IDefault, IChainBranch, IAddress {
	branchId: number,
	setupId: string,
}

export interface IBranch extends IBranchBase {
	chain: Types.ObjectId,
}

export interface IBranchPopulated extends IBranchBase {
	chain: IChain,
	edges:[IEdgePopulated]
}

  