import Immutable from 'seamless-immutable';
import {CREATE, DELETE, ERROR, FETCH, REQUEST, SUCCESS, UPDATE} from "../constants";
import {exceptRemovedItem, insertCreatedItem, insertUpdatedItem} from "../util/ReducerUtil";

const initialState = Immutable({
    item: null,
    items: [],
    isLoadingItem: false,
    isLoadingItems: false,
    isCreating: false,
    isSaving: false,
    isDeleting: false,
    requested: false,
});

const createReducer = (single, plural) => ({
    [FETCH + single + REQUEST]: (state, action) => state.merge({ requested: true, isLoading: true }),
    [FETCH + single + SUCCESS]: (state, action) => {},
    [FETCH + single + ERROR]: (state, action) => state.merge({ isLoading: false }),
    [CREATE + single + REQUEST]: (state, action) => state.merge({ isSaving: true }),
    [CREATE + single + SUCCESS]: (state, action) => state.merge({ isSaving: false, items: insertCreatedItem(state.items, action.payload.item) }),
    [CREATE + single + ERROR]: (state, action) => state.merge({ isSaving: false }),
    [UPDATE + single + REQUEST]: (state, action) => {},
    [UPDATE + single + SUCCESS]: (state, action) => state.merge({ isSaving: false, items: insertUpdatedItem(state.items, action.payload.item)}),
    [UPDATE + single + ERROR]: (state, action) => state.merge({ isSaving: false }),
    [DELETE + single + REQUEST]: (state, action) => {},
    [DELETE + single + SUCCESS]: (state, action) => state.merge({ isSaving: false, items: exceptRemovedItem(state.items, action.payload.item.id)}),
    [DELETE + single + ERROR]: (state, action) => state.merge({ isSaving: false }),
    [FETCH + plural + REQUEST]: (state, action) => state.merge({ requested: true, isLoading: true }),
    [FETCH + plural + SUCCESS]: (state, action) => state.merge({ items: action.payload.items, isLoading: false }),
    [FETCH + plural + ERROR]: (state, action) => state.merge({ isLoading: false }),
});

const reducerFactory = ({ single, plural }) => createReducer(single, plural);

export default reducerFactory;


