import DmistylesFetch from './dmistyles_fetch';
import DmistylesRenderUser from './dmistyles_render_user';
import DmistylesRenderGroup from './dmistyles_render_group';
import hideAndShow from './hideAndShow';


hideAndShow.bindTo(document);
DmistylesRenderUser.bindTo(document);
DmistylesRenderGroup.bindTo(document);
DmistylesFetch.bindTo(document);
