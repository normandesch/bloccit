const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

    beforeEach((done)=> {
        this.topic;
        this.flair;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Apple Review",
                description: "A compilation of reports regards Apple"
            })
            .then((topic) => {
                this.topic = topic;

                Flair.create({
                    name: "Review",
                    color: "red",
                    topicId: this.topic.id
                })
                .then((flair)=> {
                    this.flair = flair;
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

        it("should create a flair object with a name, color and assigned topic", (done) => {
            Flair.create({
                name: "Apple",
                color: "blue",
                topicId: this.topic.id
            })
            .then((flair) => {
                expect(flair.name).toBe("Apple");
                expect(flair.color).toBe("blue");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    it("should not create a flair with a missing name,color or assigned topic", (done) => {
        Flair.create({
            name: "Orange"
        })
        .then((flair) => {

            done();
        })
        .catch((err) => {
            expect(err.message).toContain("Flair.color cannot be null");
            expect(err.message).toContain("Flair.topicId cannot be null");
            done();
        })
    });

    describe("setTopic()", () => {

        it("should associate a topic and a flair together", (done) => {

            Topic.create({
                title: "Summer 2019",
                description: "A report on tourist attractions for the summer time"
            })
            .then((newTopic) => {
                expect(this.flair.topicId).toBe(this.topic.id);

                this.flair.setTopic(newTopic)
                .then((flair) => {
                    expect(flair.topicId).toBe(newTopic.id);
                    done();
                });
            })
        });
    });

    describe("getTopic()", () => {

        it("should return the associated topic", (done) => {

            this.flair.getTopic()
            .then((associatedTopic) => {
                expect(associatedTopic.title).toBe("Apple Review");
                done();
            });
        });
    });
});
