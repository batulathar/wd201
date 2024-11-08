// models/todo.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
        console.log("My Todo-list\n");
      
        console.log("Overdue");
        const overdueItems = await this.overdue();
        overdueItems.forEach(item => console.log(item.displayableString()));
        console.log("\n");
      
        console.log("Due Today");
        const todayItems = await this.dueToday();
        todayItems.forEach(item => console.log(item.displayableString()));
        console.log("\n");
      
        console.log("Due Later");
        const laterItems = await this.dueLater();
        laterItems.forEach(item => console.log(item.displayableString()));
      }

    static async overdue() {
        const today = new Date().toISOString().split("T")[0];
        return await Todo.findAll({
          where: {
            dueDate: { [sequelize.Op.lt]: today },
            completed: false,
          },
        });
      }
      

      static async dueToday() {
        const today = new Date().toISOString().split("T")[0];
        return await Todo.findAll({
          where: {
            dueDate: today,
            completed: false,
          },
        });
      }

      static async dueLater() {
        const today = new Date().toISOString().split("T")[0];
        return await Todo.findAll({
          where: {
            dueDate: { [sequelize.Op.gt]: today },
            completed: false,
          },
        });
      }

      static async markAsComplete(id) {
        const todo = await Todo.findByPk(id);
        if (todo) {
          todo.completed = true;
          await todo.save();
        }
      }

      displayableString() {
        const checkbox = this.completed ? "[x]" : "[ ]";
        const formattedDate = this.dueDate ? this.dueDate : "";
        return `${this.id}. ${checkbox} ${this.title} ${formattedDate.trim()}`;
      }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};