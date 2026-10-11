import Todo from "../models/Todo.js";

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find().toSorted({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "Todos fetched.", data: todos });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, " + error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Title should we provided." });
    }
    const created = await Todo.create({title: title.trim()});
    return res
      .status(201)
      .json({ success: true, message: "Todo created.", data: created });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, " + error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const { id } = req.params;
    
    const obj = {};
    if (title !== undefined && title.trim()) {
      obj.title = title.trim();
    }
    if (completed !== undefined) {
      obj.completed = completed;
    }
    if (Object.keys(obj).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Atleast one data should be provided for updation.",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, obj, { new: true });
    if (!updatedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found." });
    }
    return res
      .status(200)
      .json({ success: true, message: "Todo updated.", data: updatedTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, " + error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    

    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found." });
    }
    return res
      .status(200)
      .json({ success: true, message: "Todo deleted.", });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error, " + error.message });
  }
};
