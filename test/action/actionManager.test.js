import {ActionManager} from '../../src/action';
import {fromJS} from 'immutable';
import {
  ArrayPattern,
  ObjectPattern,
  ConnectPattern
} from '../../src/action/pattern';

const objectAction = {
  type: 'UPDATE_OBJECT',
  payload: {
    key: 'user',
    value: fromJS({
      name: 'User'
    })
  }
}

const updateArrayAction = {
  type: 'UPDATE_ARRAY',
  payload: {
    key: 'posts',
    id: 'id1',
    value: fromJS({
      title: 'POST1'
    })
  }
}

const createArrayAction = {
  type: 'CREATE_ARRAY',
  payload: {
    key: 'posts',
    id: 'id1',
    value: fromJS({
      title: 'POST2'
    })
  }
}

const deleteArrayAction = {
  type: 'DELETE_ARRAY',
  payload: {
    key: 'posts',
    id: 'id1'
  }
}

const connectAction = {
  type: 'CONNECT',
  payload: {
    key: 'posts',
    path: 'author',
    id: 'id1',
    value: fromJS({
      id: 'author1'
    })
  }
}

const disconnectAction = {
  type: 'DISCONNECT',
  payload: {
    key: 'posts',
    path: 'author',
    id: 'id1',
    value: fromJS({
      id: 'author1'
    })
  }
}

describe('add action', () => {
  let actionManager;
  beforeEach(() => {
    actionManager = new ActionManager();
  });

  it('add object action', () => {
    actionManager.addAction(objectAction);
    expect(actionManager.store.user).toBeInstanceOf(ObjectPattern);
  });

  it('add array action', () => {
    actionManager.addAction(createArrayAction);
    actionManager.addAction(updateArrayAction);
    expect(actionManager.store.posts[0].id).toEqual('id1');
    expect(actionManager.store.posts[0].array).toBeInstanceOf(ArrayPattern);
    expect(actionManager.store.posts[0].connect).toBeInstanceOf(ConnectPattern);
  });

  it('add connect action', () => {
    actionManager.addAction(connectAction);
    actionManager.addAction(disconnectAction);
    expect(actionManager.store.posts[0].id).toEqual('id1');
    expect(actionManager.store.posts[0].array).toBeInstanceOf(ArrayPattern);
    expect(actionManager.store.posts[0].connect).toBeInstanceOf(ConnectPattern);
  });

  it('get actions', () => {
    expect(actionManager.getActions('haha')).toEqual([]);
    actionManager.addAction(objectAction);
    actionManager.addAction(createArrayAction);
    expect(actionManager.getActions(objectAction.payload.key).length).toBe(1);
    const {key, id} = createArrayAction.payload;
    expect(actionManager.getActions(key, id).length).toBe(1);
    expect(actionManager.getActions(key).length).toBe(1);
  });

})
