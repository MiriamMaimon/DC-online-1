import { Optional } from '../../shared/utils';
import { IDefault } from '../default/default.interface';
import { INetwork } from '../network/network.interface';
import { IBranchPopulated } from '../branch/branch.interface';
import { IChain } from '../chain/chain.interface';

export interface IEdgeBase extends IDefault, Optional<INetwork, 'ip'> {
	name: string,
	loginToken: string,
	edgeId?: number,
}


export interface IEdgePopulated extends IEdgeBase {
	branches: IBranchPopulated[],
	chains: IChain[],
}
