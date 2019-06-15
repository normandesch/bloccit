const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {


      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;


        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",


          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {


          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        })
      })
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
        topicId:this.topic.id,
        userId: this.user.id
      })

      .then((newPost) => {
        expect(newPost.topicId).toBe(this.topic.id);
        newPost.setTopic(this.topic)
        .then((post) => {

          expect(post.topicId).toBe(this.topic.id);
          this.topic.getPosts()
          .then((associatedPosts) => {
            expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b"
          );
          expect(associatedPosts[1].title).toBe("NBA Review")

          done();
        });
        done();

      });
    });

  });
});
})
