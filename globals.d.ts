// This file will add both p5 instanced and global intellisence 
import * as p5Global from 'p5/global' 
import module = require('p5');
export = module;
export as namespace p5;

import * as BN from 'bignumber.js'
declare global {
    const BigNumber: typeof BN.BigNumber
}
