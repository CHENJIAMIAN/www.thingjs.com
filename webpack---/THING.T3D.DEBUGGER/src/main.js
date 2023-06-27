// eslint-disable-next-line no-unused-vars
import * as external from './external/external.js';
import { Factory } from './Factory';

if (typeof THING != 'undefined') {
	THING.Utils.addFactory(new Factory(), 'thing.t3d.debugger.factory');
}