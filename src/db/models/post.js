"use strict";
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("Post", {


    //#1
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },

    //#2
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {});
  Post.associate = function(models) {
    // associations can be defined here

    //#3
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments"
    });

    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });

  };

  Post.prototype.getPoints = function() {

    // #1
    if (this.votes.length === 0) return 0

    // #2
    return this.votes
      .map((v) => {
        return v.value
      })
      .reduce((prev, next) => {
        return prev + next
      });
  };

  Post.prototype.hasUpvoteFor = function(userId) {
    let hasUpvote = false;
    this.votes.find((v) => {
      if (v.userId === userId && v.value === 1) hasUpvote = true;
    });

    return hasUpvote;
  };
  Post.prototype.hasDownvoteFor = function(userId) {
    let hasDownvote = false;
    this.votes.find((v) => {
      if ((v.userId) === userId && v.value === -1) hasDownvote = true
    })

    return hasDownvote;
  };

  return Post;
};
