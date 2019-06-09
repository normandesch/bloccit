const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
    //#1
    this.topic;
    this.post;
    sequelize.sync({
      force: true
    }).then((res) => {


      Topic.create({
             title: "World Cup",
             description: "This is a review of a soccer tournament"
        })
        .then((topic) => {
          this.topic = topic;

          Post.create({
             title: "My thoughts",
             body: "I think it was fun",
             topicId: this.topic.id
            })
            .then((post) => {
              this.post = post;
              done();
            });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });

  });
  describe("#create()", () => {
    it("should create a topic object with a title,and description", (done) => {
      Topic.create({
           title: "Pros and Cons of Brexit",
           description: "A review of the pros and cons of Brexit",

        })
        .then((topic) => {
          expect(topic.title).toBe("Pros and Cons of Brexit");
          expect(topic.description).toBe("A review of the pros and cons of Brexit");
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });
  });
  describe("#getPost()", () => {

    it("should associate a topic and a post together", (done) => {

      Post.create({
          title: "NBA Review",
          body: "This is a NBA Season review",
          topicId: this.topic.id
        })

        .then((newPost) => {
          expect(newPost.topicId).toBe(this.topic.id);
          newPost.setTopic(this.topic)
            .then((post) => {
              // #4
              expect(post.topicId).toBe(this.topic.id);
              this.topic.getPosts()
                .then((associatedPosts) => {
                  expect(associatedPosts[0].title).toBe("My thoughts")
                  expect(associatedPosts[1].title).toBe("NBA Review")

                  done();
                });
              done();

            });
        });

    });
  });
})
