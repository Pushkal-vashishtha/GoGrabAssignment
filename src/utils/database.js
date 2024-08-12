import * as SQLite from 'expo-sqlite';

let db;

export const initDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('todo.db');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT
      );
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        group_id INTEGER, 
        title TEXT, 
        description TEXT, 
        status TEXT
      );
    `);
  }
};

export const addGroup = async (name) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO groups (name) VALUES (?);',
      [name]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Failed to add group:', error);
    throw error;
  }
};

export const getGroups = async () => {
  try {
    const rows = await db.getAllAsync('SELECT * FROM groups;');
    return rows;
  } catch (error) {
    console.error('Failed to load groups:', error);
    throw error;
  }
};

export const addTodo = async (groupId, title, description) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO todos (group_id, title, description, status) VALUES (?, ?, ?, ?);',
      [groupId, title, description, 'pending']
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Failed to add todo:', error);
    throw error;
  }
};

export const getTodos = async (groupId) => {
  try {
    const rows = await db.getAllAsync(
      'SELECT * FROM todos WHERE group_id = ?;',
      [groupId]
    );
    return rows;
    console.log(rows);
    
  } catch (error) {
    console.error('Failed to load todos:', error);
    throw error;
  }
};

export const updateTodoStatus = async (id, status) => {
  try {
    await db.runAsync(
      'UPDATE todos SET status = ? WHERE id = ?;',
      [status, id]
    );
  } catch (error) {
    console.error('Failed to update todo status:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await db.runAsync(
      'DELETE FROM todos WHERE id = ?;',
      [id]
    );
  } catch (error) {
    console.error('Failed to delete todo:', error);
    throw error;
  }
};

export const getTodoById = async (id) => {
  try {
    const row = await db.getFirstAsync(
      'SELECT * FROM todos WHERE id = ?;',
      [id]
    );
    return row;
  } catch (error) {
    console.error('Failed to load todo by id:', error);
    throw error;
  }
};

export const updateTodo = async (id, title, description) => {
  try {
    await db.runAsync(
      'UPDATE todos SET title = ?, description = ? WHERE id = ?;',
      [title, description, id]
    );
  } catch (error) {
    console.error('Failed to update todo:', error);
    throw error;
  }
};

export const deleteGroup = async (id) => {
  try {
    await db.runAsync(
      'DELETE FROM groups WHERE id = ?;',
      [id]
    );
    await db.runAsync(
      'DELETE FROM todos WHERE group_id = ?;',
      [id]
    );
  } catch (error) {
    console.error('Failed to delete group and related todos:', error);
    throw error;
  }
};

export const fetchAllData = async () => {
  try {
    const groups = await getGroups();
    const allTodos = await Promise.all(
      groups.map(async (group) => {
        const todos = await getTodos(group.id);
        return { ...group, todos };
      })
    );

    return {
      groups: allTodos,
    };
  } catch (error) {
    console.error('Failed to fetch all data:', error);
    throw error;
  }
};