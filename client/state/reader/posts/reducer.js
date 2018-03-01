/** @format */
/**
 * External dependencies
 */
import { keyBy, get } from 'lodash';

/**
 * Internal dependencies
 */
import {
	READER_POSTS_RECEIVE,
	READER_POST_SEEN,
	READER_STREAMS_PAGE_RECEIVE,
} from 'state/action-types';
import { combineReducers } from 'state/utils';

/**
 * Tracks all known post objects, indexed by post ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function items( state = {}, action ) {
	switch ( action.type ) {
		case READER_POSTS_RECEIVE:
		case READER_STREAMS_PAGE_RECEIVE:
			const posts = action.posts || action.payload.posts;
			return { ...state, ...keyBy( posts, 'global_ID' ) };
	}
	return state;
}
export function seen( state = {}, action ) {
	const id = get( action, 'payload.post.global_ID' );

	if ( action.type === READER_POST_SEEN && id ) {
		return { ...state, [ id ]: true };
	}

	return state;
}
// @TODO: evaluate serialization later
// import { itemsSchema } from './schema';
// items.schema = itemsSchema;

export default combineReducers( {
	items,
	seen,
} );
