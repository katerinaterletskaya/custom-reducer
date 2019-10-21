import Immutable from 'seamless-immutable';

export const insertCreatedItem = (items, createdItem) =>
  items.concat(Immutable(createdItem));

export const insertUpdatedItem = (items, updatedItem) =>
  items.map(item =>
    item.id === updatedItem.id ? Immutable(updatedItem) : item,
  );

export const exceptRemovedItem = (items, removedItemId) =>
  items.filter(item => item.id !== removedItemId);
