// Actions
const GET_CHATS = "chats/GET_CHATS";

// Action Creator
export const getChats = (chats) => {
	return {
		type: GET_CHATS,
		chats,
	};
};

// Thunks

// Reducer
const initialState = { byId: {}, allIds: [] };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_CHATS:
			newState = { ...state };
			let set = new Set(state.allIds);
			action.chats.forEach((chat) => {
				newState.byId[chat.id] = chat;
				set.add(chat.id);
			});
			newState.allIds = Array.from(set);
			return newState;
		default:
			return state;
	}
}
