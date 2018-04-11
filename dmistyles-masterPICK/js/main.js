import DmistylesFetch from './dmistyles_fetch';
import hideAndShow from './hideAndShow';
import realFetch from './real_fetch';
import Render from './render';
import Counters from './counters';
import CreateAndSave from './createANDsave';


CreateAndSave.bindTo(document);
Counters.bindTo(document);
Render.bindTo(document);
realFetch.bindTo(document);
hideAndShow.bindTo(document);
DmistylesFetch.bindTo(document);
